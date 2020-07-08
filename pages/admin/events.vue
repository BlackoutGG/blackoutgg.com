<template>
  <v-container fluid>
    <event-calender />
  </v-container>
</template>

<script>
import EventCalender from "~/components/calender/Events.vue";
import setPageTitle from "~/middleware/setPageTitle.js";
import hasScope from "~/middleware/auth.hasScope.js";
import { lists } from "~/utilities/types/lists.js";
export default {
  name: "Events",
  layout: "admin",

  components: { EventCalender },
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