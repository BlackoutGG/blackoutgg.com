<template>
  <v-menu
    v-model="open"
    :close-on-content-click="false"
    offset-x
    max-width="600px"
    :activator="element"
  >
    <v-card flat>
      <v-toolbar dark>
        <v-btn icon>
          <v-icon>mdi-pencil</v-icon>
        </v-btn>
        <v-toolbar-title>{{event.name}}</v-toolbar-title>
        <v-spacer></v-spacer>
        <v-btn>
          <v-icon>mdi-dots-vertical</v-icon>
        </v-btn>
      </v-toolbar>
      <v-card-text>
        <event-form readonly :event="event"></event-form>
      </v-card-text>
      <v-card-actions>
        <v-btn text color="primary">Join In</v-btn>
        <v-btn text color="primary" @click="open = false">Close</v-btn>
      </v-card-actions>
    </v-card>
  </v-menu>
</template>

<script>
import EventForm from "./EventForm.vue";
import { events } from "~/utilities/types/events";
export default {
  name: "EventPopover",

  components: { EventForm },

  data() {
    return {
      open: false,
      element: null,
      id: null
    };
  },

  watch: {
    open(v) {
      if (!v) this.reset();
    }
  },

  methods: {
    toggle(id, element) {
      this.element = element;
      this.event = id;
      this.$nextTick(() => {
        this.open = true;
      });
    },
    reset() {
      this.open = false;
      this.event = null;
      this.element = null;
    }
  },

  computed: {
    event: {
      get() {
        return this.id
          ? this.$store.getters[events.getters.GET_EVENT](this.id)
          : {};
      },
      set(val) {
        this.id = val;
      }
    }
  }
};
</script>