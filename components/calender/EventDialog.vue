<template>
  <v-dialog v-model="open" max-width="600px">
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
    <v-card>
      <v-card-title>
        <v-btn icon @click="close">
          <v-icon small>mdi-close</v-icon>
        </v-btn>
        <span>Add An Event</span>
        <v-spacer></v-spacer>
        <event-color v-model="details.color"></event-color>
      </v-card-title>
      <v-card-text>
        <event-form v-model="valid" ref="form" :event="details"></event-form>
      </v-card-text>

      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn text @click="reset">Clear</v-btn>
        <v-btn text :disabled="!valid" @click="save">Save</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
import { events } from "~/utilities/types/events.js";
import EventForm from "./EventForm.vue";
import EventColor from "./EventColorPicker.vue";
import CalendarEvent from "./Event.js";
export default {
  name: "EventDialog",
  components: { EventForm, EventColor },

  data() {
    return {
      open: false,
      valid: false,

      details: {
        name: "",
        color: "",
        startDate: "",
        endDate: "",
        startTime: "",
        endTime: "",
        description: ""
      }
    };
  },

  methods: {
    save() {
      this.$store.dispatch(
        events.actions.ADD_EVENT,
        new CalendarEvent(this.details)
      );
    },
    reset() {
      this.$refs.form.reset();
    },
    close() {
      this.open = false;
      this.reset();
    }
  },

  watch: {
    open(v) {
      if (!v) this.reset();
    }
  }
};
</script>