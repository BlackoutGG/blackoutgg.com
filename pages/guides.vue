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
  name: "Guides",
  components: { ParallaxBanner },

  layout: "default",
  middleware: [setTitle("Guides")],
  head() {
    return { title: "Guides" };
  }
};
</script>
