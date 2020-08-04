<template>
  <v-app dark>
    <user-navbar />
    <nuxt />
    <v-footer />
    <snack-bar />
  </v-app>
</template>


<script>
import UserNavbar from "~/components/navigation/NavHeaderTabs.vue";
import VideoBanner from "~/components/frontpage/VideoBanner.vue";
import ParallaxBanner from "~/components/Parallax.vue";
import SnackBar from "~/components/SnackBar.vue";

export default {
  name: "FrontPage",
  components: {
    UserNavbar,
    ParallaxBanner,
    VideoBanner,
    SnackBar
  },
  created() {
    if (!this.$vuetify.theme.dark) {
      this.$vuetify.theme.dark = true;
    }
  },

  computed: {
    isFrontPage() {
      return this.$nuxt.$route.name === "index";
    }
  }
};
</script>
