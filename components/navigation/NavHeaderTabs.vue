<template>
  <nav>
    <v-toolbar dark flat :color="color" height="80px">
      <v-container>
        <v-row justify="center" align="center" class="flex-nowrap">
          <v-app-bar-nav-icon class="hidden-md-and-up" @click="showMobile = true"></v-app-bar-nav-icon>
          <v-spacer class="hidden-md-and-up"></v-spacer>
          <v-toolbar-title class>
            <img
              class="pt-2"
              src="https://blackout-gaming.s3.amazonaws.com/Images/assets/white-transparent.webp"
              height="72px"
              alt
            />
          </v-toolbar-title>
          <v-tabs :height="'80px'" align-with-title v-model="tabs" class="hidden-sm-and-down">
            <v-tab
              v-for="(link, idx) in links"
              :key="idx"
              nuxt
              :to="link.to"
              :class="{ 'ml-4': idx === 0 }"
            >{{link.title}}</v-tab>
          </v-tabs>
          <v-spacer></v-spacer>
          <auth-dialog v-model="showAuth" v-if="!$auth.loggedIn"></auth-dialog>
          <user-panel v-else></user-panel>
        </v-row>
      </v-container>
    </v-toolbar>
    <user-nav-mobile v-model="showMobile" @toggle="showAuth = !showAuth" :links="links"></user-nav-mobile>
  </nav>
</template>

<script>
import AuthDialog from "~/components/auth/AuthDialog.vue";
import UserPanel from "~/components/navigation/UserPanel.vue";
import UserNavMobile from "./UserNavMobile.vue";
import menu from "~/utilities/ns/public/menu.js";

export default {
  name: "NavHeader",
  components: { UserPanel, AuthDialog, UserNavMobile },

  data() {
    return {
      color: "#1E1E1E",
      showMobile: false,
      showAuth: false,
      tabs: null
      // links: [
      //   { icon: "mdi-home", title: "Home", to: "/" },
      //   { icon: "mdi-book", title: "Guides", to: "/guides" },
      //   { icon: "mdi-information", title: "History", to: "/history" },
      //   { icon: "mdi-calendar", title: "Events", to: "/events" }
      // ]
    };
  },

  computed: {
    links() {
      return this.$store.getters[menu.getters.LINKS];
    }
  }
};
</script>
