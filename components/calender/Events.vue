<template>
  <v-row>
    <v-col>
      <v-sheet height="64">
        <v-toolbar flat color="white">
          <v-btn outlined class="mr-4" color="grey darken-2">Today</v-btn>
          <v-btn fab text small color="grey darken-2">
            <v-icon small>mdi-chevron-left</v-icon>
          </v-btn>
          <v-btn fab text small color="grey darken-2">
            <v-icon small>mdi-chevron-right</v-icon>
          </v-btn>
          <v-toolbar-title v-if="$refs.calendar.title">{{$refs.calendar.title}}</v-toolbar-title>
          <v-spacer></v-spacer>
          <v-menu bottom right>
            <template v-slot:activator="{ on, attrs }">
              <v-btn outlined color="grey darken-2" v-bind="attrs" v-on="on">
                <span>{{ typeToLabel[type] }}</span>
                <v-icon right>mdi-menu-down</v-icon>
              </v-btn>
            </template>
            <v-list>
              <event-type v-for="t in types" :key="t" :type.sync="type" :item="t"></event-type>
            </v-list>
          </v-menu>
          <v-tooltip bottom>
            <template #activator="{ on, attrs }">
              <v-btn outlined icon v-bind="attrs" v-on="on">
                <v-icon>mdi-plus</v-icon>
              </v-btn>
            </template>
            <span>Add Event</span>
          </v-tooltip>
        </v-toolbar>
      </v-sheet>
      <v-sheet height="600">
        <v-calendar
          ref="calendar"
          v-model="focus"
          color="primary"
          :events="events"
          :type="type"
          @click:event="showEvent"
          @click:more="viewDay"
          @click:date="viewDay"
          @change="updateRange"
        ></v-calendar>
        <event-popover :selectedEvent="selectedEvent" :selectedElement="selectedElement"></event-popover>
      </v-sheet>
    </v-col>
  </v-row>
</template>

<script>
import EventType from "./EventType.vue";
import EventPopover from "./EventPopover.vue";
export default {
  name: "EventsCalendar",
  components: { EventType, EventPopover },
  data() {
    return {
      focus: "",
      types: ["day", "week", "month", "4day"],
      type: "day",
      typeToLabel: {
        month: "Month",
        week: "Week",
        day: "Day",
        "4day": "4 Days"
      },
      selectedEvent: {},
      selectedElement: null
    };
  },

  created() {
    console.log(this.$refs);
  },

  methods: {
    showEvent() {},
    viewDay() {},
    updateRange() {}
  },

  computed: {
    events() {
      return [];
    }
  }
};
</script>