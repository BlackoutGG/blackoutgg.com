<template>
  <v-app dark>
    <user-navbar />
    <user-nav-mobile />
    <v-parallax dark :src="defaultSrc" :class="parallaxClasses" :height="height">
      <v-row align="center" justify="center">
        <v-col class="text-center" cols="12">
          <h1 class="display-1 font-weight-bold">{{ title }}</h1>
        </v-col>
      </v-row>
    </v-parallax>
    <v-content>
      <nuxt />
    </v-content>
    <v-footer></v-footer>
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
import LoginDialog from "~/components/dialogs/LoginDialog.vue";
import RegisterDialog from "~/components/dialogs/RegisterDialog.vue";
import SnackBar from "~/components/SnackBar.vue";

import { PAGE } from "~/utilities/types";

export default {
  name: "DefaultLayout",
  components: {
    UserNavbar,
    UserNavMobile,
    LoginDialog,
    RegisterDialog,
    SnackBar
  },
  data() {
    return {
      defaultSrc:
        "https://www.blackout.team/wp-content/uploads/2020/01/banner-history.png",
      elevation: 5,
      height: 300
    };
  },

  created() {
    if (!this.$vuetify.theme.dark) {
      this.$vuetify.theme.dark = true;
    }
  },

  computed: {
    parallaxClasses() {
      return [`elevation-${this.elevation}`];
    },
    pageTitle() {
      return this.$store.getters[PAGE.getters.TITLE];
    },
    title() {
      return this.pageTitle ? this.pageTitle : "Insert Title Here";
    }
  }
};
</script>
