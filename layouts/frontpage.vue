<template>
  <v-app dark>
    <user-navbar />
    <user-nav-mobile />
    <video-banner />
    <v-content>
      <nuxt />
    </v-content>
    <v-footer />
    <template v-if="!$auth.loggedIn">
      <login-dialog />
      <register-dialog />
    </template>
    <snack-bar />
  </v-app>
</template>

<script>
import UserNavbar from "~/components/navigation/Header.vue";
import UserNavMobile from "~/components/navigation/UserNavMobile.vue";
import VideoBanner from "~/components/frontpage/VideoBanner.vue";
import LoginDialog from "~/components/dialogs/LoginDialog.vue";
import RegisterDialog from "~/components/dialogs/RegisterDialog.vue";
import SnackBar from "~/components/SnackBar.vue";

export default {
  name: "FrontPage",
  components: {
    UserNavbar,
    UserNavMobile,
    VideoBanner,
    LoginDialog,
    RegisterDialog,
    SnackBar
  },
  created() {
    if (!this.$vuetify.theme.dark) {
      this.$vuetify.theme.dark = true;
    }
  }
};
</script>
