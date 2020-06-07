<template>
  <v-navigation-drawer class="hidden-md-and-up" v-model="show" id="mobile" absolute>
    <template v-if="$auth.loggedIn">
      <user-panel-mobile />
      <v-divider></v-divider>
    </template>
    <template v-else>
      <v-list>
        <nav-link
          :title="'Sign Up'"
          :icon="'mdi-account-circle'"
          :button="true"
          @click.native="toggleDialog('login')"
        ></nav-link>
        <nav-link
          :title="'Register'"
          :icon="'mdi-account-plus'"
          :button="true"
          @click.native="toggleDialog('register')"
        ></nav-link>
      </v-list>
      <v-divider></v-divider>
    </template>
    <v-list nav>
      <nav-link
        v-for="(link, idx) in links"
        :key="idx"
        :to="link.to"
        :title="link.title"
        :icon="link.icon"
      />
    </v-list>
    <template v-if="$auth.loggedIn">
      <v-divider></v-divider>
      <v-list-item link @click="$auth.logout('local')">
        <v-list-item-icon>
          <v-icon>mdi-logout</v-icon>
        </v-list-item-icon>
        <v-list-item-content>
          <v-list-item-title>Logout</v-list-item-title>
        </v-list-item-content>
      </v-list-item>
    </template>
  </v-navigation-drawer>
</template>

<script>
import { PAGE, DIALOG } from "~/utilities/types";
import UserPanelMobile from "./UserPanelMobile.vue";
import NavLink from "./NavLink.vue";
export default {
  name: "UserNavMobile",
  components: { UserPanelMobile, NavLink },
  data() {
    return {
      links: [
        { icon: "mdi-home", title: "Home", to: "/" },
        { icon: "mdi-book", title: "Guides", to: "/guides" },
        { icon: "mdi-information", title: "History", to: "/history" }
      ]
    };
  },
  methods: {
    toggleDialog(value) {
      this.$store.commit(DIALOG.mutations.TOGGLE, value);
    }
  },
  computed: {
    show: {
      get() {
        return this.$store.getters[PAGE.getters.MOBILE];
      },
      set(value) {
        this.$store.commit(PAGE.mutations.SET_MOBILE, value);
      }
    }
  }
};
</script>