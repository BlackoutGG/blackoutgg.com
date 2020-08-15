<template>
  <v-main>
    <parallax-banner></parallax-banner>
    <v-container fluid>
      <event-calender />
    </v-container>
  </v-main>
</template>

<script>
import EventCalender from "~/components/events/Events.vue";
import ParallaxBanner from "~/components/Parallax.vue";
import setPageTitle from "~/middleware/setPageTitle.js";
import hasScope from "~/middleware/auth.hasScope.js";
import lists from "~/utilities/ns/public/lists.js";
export default {
  name: "Events",
  layout: "default",

  components: { EventCalender, ParallaxBanner },
  middleware: [
    "auth",
    hasScope("events:view"),
    setPageTitle("Events")
    // ({ store }) => {
    //   const categories = store.getters[lists.getters.ITEMS]("categories");
    //   if (!categories.length) {
    //     store.dispatch(lists.actions.FETCH, "categories");
    //   }
    // }
  ],

  async fetch() {
    const categories = this.$store.getters[lists.getters.ITEMS]("categories");
    if (categories.length) return;

    this.$store.dispatch(lists.actions.FETCH, "categories");
  }
};
</script>