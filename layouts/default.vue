<template>
  <v-app dark>
    <user-navbar />

    <v-parallax dark :src="defaultSrc" :class="parallaxClasses" :height="height">
      <v-row align="center" justify="center">
        <v-col class="text-center" cols="12">
          <h1 class="display-1 font-weight-bold">{{ title }}</h1>
        </v-col>
      </v-row>
    </v-parallax>
    <v-main>
      <nuxt />
    </v-main>
    <v-footer></v-footer>

    <snack-bar />
  </v-app>
</template>

<script>
import UserNavbar from "~/components/navigation/NavHeaderWithMobile.vue";

import SnackBar from "~/components/SnackBar.vue";

import { page } from "~/utilities/ns/page.js";

export default {
  name: "DefaultLayout",
  components: {
    UserNavbar,
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
      return this.$store.getters[page.getters.TITLE];
    },
    title() {
      return this.pageTitle ? this.pageTitle : "Insert Title Here";
    }
  }
};
</script>
