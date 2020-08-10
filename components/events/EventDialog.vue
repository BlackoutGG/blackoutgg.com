<template>
  <v-dialog v-model="open" id="event-dialog" max-width="600px" :min-height="height">
    <template #activator="{ on, attrs }">
      <v-tooltip bottom>
        <template #activator="tooltip">
          <v-btn icon v-bind="attrs" v-on="on">
            <v-icon v-on="tooltip.on">mdi-plus</v-icon>
          </v-btn>
        </template>
        <span>Add Event</span>
      </v-tooltip>
    </template>
    <v-card :min-height="height">
      <v-toolbar dark>
        <v-btn icon @click="close">
          <v-icon small>mdi-close</v-icon>
        </v-btn>
        <v-toolbar-title>
          <span>{{title}}</span>
        </v-toolbar-title>
        <v-spacer></v-spacer>
      </v-toolbar>
      <v-tabs fixed-tabs v-model="tab">
        <v-tab v-for="(tab, i) in tabs" :key="i">{{tab}}</v-tab>
      </v-tabs>
      <v-tabs-items v-model="tab">
        <v-tab-item>
          <v-card-text>
            <event-form v-model="valid" ref="form" :event="details"></event-form>
          </v-card-text>
        </v-tab-item>
        <v-tab-item>
          <v-card-text>
            <event-options :roles="roles" :rvsp.sync="details.rvsp"></event-options>
          </v-card-text>
        </v-tab-item>
      </v-tabs-items>

      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn text @click="reset">Clear</v-btn>
        <v-btn text :disabled="!valid" @click="save">Save</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
import events from "~/utilities/ns/public/events.js";
import EventForm from "./EventForm.vue";
import EventOptions from "./EventDialogOptions.vue";

import pickBy from "lodash/pickBy";
import cloneDeep from "lodash/cloneDeep";

export default {
  name: "EventDialog",
  components: { EventForm, EventOptions },

  data() {
    return {
      open: false,
      valid: false,
      mode: "new",
      tabs: ["Form", "Options"],
      tab: 0,

      eventId: 0,

      minHeight: 827,

      roles: [],
      startingRoles: [],

      details: {
        id: null,
        category_id: 1,
        name: "",
        color: "",
        startDate: "",
        endDate: "",
        startTime: "",
        endTime: "",
        description: "",
        rvsp: false
      },

      startingValues: null
    };
  },

  watch: {
    open(v) {
      if (!v) this.reset();
    }
  },

  methods: {
    async save() {
      if (this.mode === "edit") {
        await this.$store.dispatch(
          events.actions.EDIT_EVENT,
          Object.assign(
            {},
            { ...this.markedForChange },
            { id: this.details.id }
          )
        );
        this.setStartingValues(this.event);
      } else {
        this.$store.dispatch(
          events.actions.ADD_EVENT,
          this.createEventObject(this.details)
        );
        this.$refs.form.reset();
      }
    },
    reset() {
      if (this.mode === "edit") {
        this.startingValues = null;
      }
      this.$refs.form.reset();
      this.$nextTick(() => {
        this.mode = "new";
      });
    },
    close() {
      this.open = false;
      this.tab = 0;
      this.reset();
    },

    createEventObject(e) {
      const { category_id, ...event } = e;
      event.roles = this.rolesMarkedForChange;
      return { category_id, event };
    },

    setStartingValues(obj) {
      const picked = prop =>
        typeof prop !== "object" || typeof prop !== undefined;
      this.startingValues = Object.assign({}, pickBy(cloneDeep(obj), picked));
    },

    setEditableContent({ id }) {
      this.eventId = id;
      this.mode = "edit";
      const { event } = this;
      Object.keys(this.details).forEach(key => {
        if (typeof event[key] !== undefined || typeof event[key] !== "object") {
          this.details[key] = event[key];
        }
      });
      this.setStartingValues(this.details);

      this.open = true;
    }
  },

  computed: {
    event() {
      return (
        this.$store.getters[events.getters.GET_EVENT](this.eventId) || null
      );
    },
    markedForChange() {
      return this.startingValues
        ? Object.entries(this.details)
            .filter(([key, value]) => {
              return this.startingValues[key] !== value;
            })
            .reduce((obj, [key, value]) => {
              obj[key] = value;
              return obj;
            }, {})
        : [];
    },

    rolesMarkedForChange() {
      return this.roles.filter(role => this.startingRoles.indexOf(role) === -1);
    },

    height: {
      get() {
        return `${this.minHeight}px`;
      },
      set(val) {
        this.minHeight = val;
      }
    },
    title() {
      return this.mode === "new" ? "Add Event" : "Edit Event";
    }
  }
};
</script>