<template>
  <v-app dark>
    <user-navbar />
    <nuxt />
    <site-footer />
    <snack-bar />
  </v-app>
</template>


<script>
import UserNavbar from "~/components/navigation/NavHeaderTabs.vue";
import VideoBanner from "~/components/frontpage/VideoBanner.vue";
import ParallaxBanner from "~/components/Parallax.vue";
import SnackBar from "~/components/SnackBar.vue";
import SiteFooter from "~/components/navigation/Footer.vue";

export default {
  name: "DefaultLayout",
  components: {
    UserNavbar,
    ParallaxBanner,
    VideoBanner,
    SnackBar,
    SiteFooter
  },
  created() {
    if (!this.$vuetify.theme.dark) {
      this.$vuetify.theme.dark = true;
    }
  }
};
</script>
