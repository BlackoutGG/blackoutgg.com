<template>
  <v-menu transition="slide-y-transition" offset-y>
    <template v-slot:activator="{ on }">
      <v-btn icon v-on="on">
        <v-icon>mdi-account-circle</v-icon>
      </v-btn>
    </template>
    <v-list>
      <nav-link
        v-for="(_link, idx) in links"
        :button="_link.button"
        :to="_link.to"
        :key="idx"
        :title="_link.title"
        :icon="_link.icon"
      ></nav-link>
      <v-divider></v-divider>
      <nav-link :button="true" :title="'Logout'" :icon="'mdi-logout'"></nav-link>
    </v-list>
  </v-menu>
</template>

<script>
import NavLink from "~/components/navigation/NavLink.vue";
export default {
  name: "AdminUserMenu",
  components: { NavLink },
  data() {
    return {
      links: [{ icon: "mdi-home", title: "Home", to: "/", button: false }]
    };
  },
  methods: {
    logout() {
      console.log("Logging out...");
    }
  }
};
</script>