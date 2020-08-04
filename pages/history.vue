<template>
  <v-main>
    <parallax-banner></parallax-banner>
    <v-container fill-height></v-container>
  </v-main>
</template>

<script>
import setTitle from "~/middleware/setPageTitle.js";
import ParallaxBanner from "~/components/Parallax.vue";
export default {
  name: "History",

  components: { ParallaxBanner },

  middleware: [setTitle("History")],
  head() {
    return { title: "History" };
  }
};
</script>
