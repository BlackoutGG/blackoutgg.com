<template>
  <v-menu model="open" :close-on-content-click="false" :activator="selectedElement" offset-x>
    <v-card min-width="350px" flat>
      <v-toolbar :color="selectedEvent.color" dark>
        <v-btn icon>
          <v-icon>mdi-pencil</v-icon>
        </v-btn>
        <v-toolbar-title>{{selectedEvent.name}}</v-toolbar-title>
        <v-spacer></v-spacer>
        <v-btn>
          <v-icon>mdi-dots-vertical</v-icon>
        </v-btn>
      </v-toolbar>
      <v-card-text>
        <event-form readonly :event="selectedEvent"></event-form>
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
export default {
  name: "EventPopover",

  components: { EventForm },

  props: {
    selectedEvent: {
      type: Object,
      default: () => {}
    },
    selectedElement: {
      type: Object,
      default: null
    }
  }
};
</script>