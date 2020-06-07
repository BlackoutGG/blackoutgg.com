<template>
  <v-toolbar dark flat height="80px">
    <v-container>
      <v-row justify="center" align="center">
        <v-app-bar-nav-icon class="hidden-md-and-up" @click="openNavigationDrawer(true)"></v-app-bar-nav-icon>
        <v-toolbar-title class="pt-2">
          <img
            src="https://blackout-gaming.s3.amazonaws.com/Images/assets/white-transparent.webp"
            height="72px"
            alt
          />
        </v-toolbar-title>

        <v-btn
          dark
          text
          nuxt
          :to="link.to"
          class="hidden-sm-and-down"
          v-for="(link, idx) in links"
          :key="idx"
        >{{link.name}}</v-btn>

        <v-spacer></v-spacer>
        <template v-if="!$auth.loggedIn">
          <v-btn tag="a" dark text class="hidden-sm-and-down" @click="toggleDialog('login')">
            <v-icon>mdi-account-circle</v-icon>
            <span class="pl-2">Login</span>
          </v-btn>
          <v-btn tag="a" dark text class="hidden-sm-and-down" @click="toggleDialog('register')">
            <v-icon>mdi-account-plus</v-icon>
            <span class="pl-2">Sign Up</span>
          </v-btn>
        </template>
        <template v-else>
          <user-panel></user-panel>
        </template>
      </v-row>
    </v-container>
  </v-toolbar>
</template>

<script>
import VideoBanner from "@/components/frontpage/VideoBanner";
import UserPanel from "@/components/navigation/UserPanel";
import { DIALOG, PAGE } from "@/utilities/types";

export default {
  name: "NavHeader",
  components: { VideoBanner, UserPanel },

  data() {
    return {
      links: [
        {
          to: "/",
          name: "Home"
        },
        {
          to: "/history",
          name: "History"
        },
        { to: "/guides", name: "Guides" }
      ]
    };
  },

  methods: {
    toggleDialog(value) {
      this.$store.commit(DIALOG.mutations.TOGGLE, value);
    },
    openNavigationDrawer(value) {
      this.$store.commit(PAGE.mutations.SET_MOBILE, value);
    }
  }
};
</script>
