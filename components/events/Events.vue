<template>
  <v-row>
    <v-col>
      <v-sheet height="64">
        <v-toolbar flat>
          <event-dialog ref="dialog" v-if="$auth.hasScope('events:add')"></event-dialog>
          <v-btn outlined class="mr-4" color="grey darken-2">Today</v-btn>
          <v-btn fab text small color="grey darken-2" @click="prev">
            <v-icon small>mdi-chevron-left</v-icon>
          </v-btn>
          <v-toolbar-title v-if="$refs.event">{{$refs.event.title}}</v-toolbar-title>
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
                v-for="(cat, idx) in categories"
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
          ref="events"
          v-model="focus"
          color="primary"
          :events="events"
          :event-colors="getEventColor"
          :type="type"
          @click:event="showEvent"
          @click:more="viewDay"
          @click:date="viewDay"
          @change="fetch"
        ></v-calendar>
        <event-popover ref="popover" @edit="setEditableContent"></event-popover>
      </v-sheet>
    </v-col>
  </v-row>
</template>

<script>
import { lists } from "~/utilities/ns/lists.js";
import EventListItem from "./EventListItem.vue";
import EventDialog from "./EventDialog.vue";
import EventPopover from "./EventPopover.vue";
import { createNamespacedHelpers } from "vuex";

const { mapGetters, mapActions } = createNamespacedHelpers("events");

const toTimestamp = str => {
  return Math.round(new Date(str).replace(/-/g, "/").getTime() / 1000);
};

export default {
  name: "EventsCalendar",
  components: { EventListItem, EventDialog, EventPopover },
  data() {
    return {
      category: "All",
      focus: "",
      types: ["day", "week", "month", "4day"],
      type: "month",
      typeToLabel: {
        month: "Month",
        week: "Week",
        day: "Day",
        "4day": "4 Days"
      }
    };
  },

  mounted() {
    this.$refs.events.checkChange();
    this.$auth.hasScope("events:add");
  },

  methods: {
    ...mapActions(["fetchEvents"]),

    getEventColor(event) {
      return event.color;
    },

    setEditableContent(event) {
      this.$refs.dialog.setEditableContent(event);
    },

    showEvent({ nativeEvent, event }) {
      this.$refs.popover.toggle(event, nativeEvent.target);
      nativeEvent.stopPropagation();
    },

    viewDay({ date }) {
      this.focus = date;
      this.type = "day";
    },

    next() {
      this.$refs.events.next();
    },

    prev() {
      this.$refs.events.prev();
    },

    fetch({ start, end }) {
      this.fetchEvents({
        start: start.date,
        end: end.date
      });
    }
  },

  computed: {
    ...mapGetters(["events", "eventColors"]),
    categories() {
      const cats = this.$store.getters[lists.getters.ITEMS]("categories");
      return [{ id: 0, name: "all" }, ...cats];
    }
  }
};
</script>