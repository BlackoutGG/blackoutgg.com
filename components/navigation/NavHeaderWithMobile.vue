<template>
  <nav>
    <v-toolbar dark flat height="80px">
      <v-container>
        <v-row justify="center" align="center">
          <v-app-bar-nav-icon class="hidden-md-and-up" @click="showMobile = true"></v-app-bar-nav-icon>
          <v-spacer class="hidden-md-and-up"></v-spacer>
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
          >{{link.title}}</v-btn>

          <v-spacer></v-spacer>
          <auth-dialog v-model="showAuth" v-if="!$auth.loggedIn"></auth-dialog>
          <user-panel v-else></user-panel>
        </v-row>
      </v-container>
    </v-toolbar>
    <user-nav-mobile v-model="showMobile" @toggle="showAuth = !showAuth"></user-nav-mobile>
  </nav>
</template>

<script>
import VideoBanner from "~/components/frontpage/VideoBanner.vue";
import AuthDialog from "~/components/auth/AuthDialog.vue";
import UserPanel from "~/components/navigation/UserPanel.vue";
import UserNavMobile from "./UserNavMobile.vue";
import { page } from "~/utilities/ns/page.js";

export default {
  name: "NavHeader",
  components: { VideoBanner, UserPanel, AuthDialog, UserNavMobile },

  data() {
    return {
      showMobile: false,
      showAuth: false,
      links: [
        { icon: "mdi-home", title: "Home", to: "/" },
        { icon: "mdi-book", title: "Guides", to: "/guides" },
        { icon: "mdi-information", title: "History", to: "/history" }
      ]
    };
  }
};
</script>
