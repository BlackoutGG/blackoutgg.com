<template>
  <v-app dark>
    <user-navbar />

    <video-banner />
    <v-main>
      <nuxt />
    </v-main>
    <v-footer />
    <snack-bar />
  </v-app>
</template>

<script>
import UserNavbar from "~/components/navigation/NavHeaderWithMobile.vue";
import VideoBanner from "~/components/frontpage/VideoBanner.vue";
import SnackBar from "~/components/SnackBar.vue";

export default {
  name: "FrontPage",
  components: {
    UserNavbar,

    VideoBanner,
    SnackBar
  },
  created() {
    if (!this.$vuetify.theme.dark) {
      this.$vuetify.theme.dark = true;
    }
  }
};
</script>
