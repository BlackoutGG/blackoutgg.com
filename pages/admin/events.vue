<template>
  <v-container fluid>
    <event-calendar />
  </v-container>
</template>

<script>
import EventCalendar from "~/components/events/Events.vue";
import setPageTitle from "~/middleware/setPageTitle.js";
import hasScope from "~/middleware/auth.hasScope.js";
import lists from "~/utilities/ns/public/lists.js";
export default {
  name: "Events",
  layout: "admin",

  components: { EventCalendar },
  middleware: [
    "auth",
    hasScope("events:view"),
    setPageTitle("View Events"),
    ({ store }) => {
      const categories = store.getters[lists.getters.ITEMS]("categories");
      if (!categories.length) {
        store.dispatch(lists.actions.FETCH, "categories");
      }
    }
  ]
};
</script>