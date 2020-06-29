<template>
  <v-container fluid>
    <event-calender />
  </v-container>
</template>

<script>
import EventCalender from "~/components/calender/Events.vue";
import { events } from "~/utilities/types/events.js";
import setPageTitle from "~/middleware/setPageTitle.js";
import hasScope from "~/middleware/auth.hasScope.js";
export default {
  name: "Events",
  layout: "admin",

  components: { EventCalender },
  middleware: [
    "auth",
    hasScope("events:view"),
    setPageTitle("View Events"),
    ({ store }) => {
      store.dispatch(events.actions.FETCH_EVENTS);
    }
  ]
};
</script>