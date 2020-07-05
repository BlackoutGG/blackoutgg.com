<template>
  <v-row>
    <v-col>
      <v-sheet height="64">
        <v-toolbar flat color="white">
          <event-dialog ref="dialog"></event-dialog>
          <v-btn outlined class="mr-4" color="grey darken-2">Today</v-btn>
          <v-btn fab text small color="grey darken-2" @click="prev">
            <v-icon small>mdi-chevron-left</v-icon>
          </v-btn>
          <v-toolbar-title>{{title}}</v-toolbar-title>
          <v-btn fab text small color="grey darken-2" @click="next">
            <v-icon small>mdi-chevron-right</v-icon>
          </v-btn>
          <v-spacer></v-spacer>
          <v-menu bottom right>
            <template #activator="{ on, attrs }">
              <v-btn outlined color="grey darken-2" class="mx-2" v-bind="attrs" v-on="on">
                <span>{{ category }}</span>
                <v-icon right>mdi-menu-down</v-icon>
              </v-btn>
            </template>
            <v-list>
              <event-list-item
                v-for="(cat, idx) in eventCategories"
                :key="idx"
                v-model="category"
                :item="cat"
              >{{cat.name}}</event-list-item>
            </v-list>
          </v-menu>
          <v-menu bottom right>
            <template #activator="{ on, attrs }">
              <v-btn outlined color="grey darken-2" v-bind="attrs" v-on="on">
                <span>{{ typeToLabel[type] }}</span>
                <v-icon right>mdi-menu-down</v-icon>
              </v-btn>
            </template>
            <v-list>
              <event-list-item v-for="(t, idx) in types" :key="idx" v-model="type">{{t}}</event-list-item>
            </v-list>
          </v-menu>
        </v-toolbar>
      </v-sheet>
      <v-sheet height="600">
        <v-calendar
          ref="event"
          v-model="focus"
          color="primary"
          :events="events"
          :type="type"
          @click:event="showEvent"
          @click:more="viewDay"
          @click:date="viewDay"
          @change="fetch"
        ></v-calendar>
        <event-popover ref="popover"></event-popover>
      </v-sheet>
    </v-col>
  </v-row>
</template>

<script>
import EventListItem from "./EventListItem.vue";
import EventDialog from "./EventDialog.vue";
import EventPopover from "./EventPopover.vue";
import { createNamespacedHelpers } from "vuex";

const { mapGetters, mapActions } = createNamespacedHelpers("events");

export default {
  name: "EventsCalendar",
  components: { EventListItem, EventDialog, EventPopover },
  data() {
    return {
      category: "All",
      focus: "",
      month: null,
      year: null,
      types: ["day", "week", "month", "4day"],
      type: "month",
      typeToLabel: {
        month: "Month",
        week: "Week",
        day: "Day",
        "4day": "4 Days"
      },
      months: [
        "January",
        "February",
        "March",
        "April",
        "May",
        "June",
        "July",
        "August",
        "September",
        "October",
        "November",
        "December"
      ],
      title: ""
    };
  },

  mounted() {
    this.$refs.event.checkChange();
  },

  methods: {
    ...mapActions(["fetchEvents"]),
    showEvent({ nativeEvent, event }) {
      this.$refs.popover.toggle(event.id, nativeEvent.target);
      nativeEvent.stopPropagation();
    },

    viewDay({ date }) {
      this.focus = date;
      this.type = "day";
    },

    next() {
      this.$refs.event.next();
    },

    prev() {
      this.$refs.event.prev();
    },

    fetch({ start, end }) {
      this.title = `${this.months[start.month - 1]} ${start.year}`;
      this.month = start.month;
      this.year = start.year;
      this.fetchEvents({
        month: start.month,
        year: start.year
      });
    }
  },

  computed: {
    ...mapGetters(["events", "eventCategories"])
  }
};
</script>