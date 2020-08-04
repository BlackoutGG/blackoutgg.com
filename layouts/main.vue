<template>
  <v-app dark>
    <user-navbar keep-alive />
    <nuxt v-if="!$slots.default" />
    <slot />
    <v-footer />
    <snack-bar />
  </v-app>
</template>

<script>
import UserNavbar from "~/components/navigation/NavHeaderTabs.vue";
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
