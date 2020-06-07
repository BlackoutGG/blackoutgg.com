<template>
  <v-navigation-drawer app v-model="show">
    <template v-if="$auth.loggedIn">
      <large-avatar></large-avatar>
      <v-divider />
    </template>
    <v-list nav>
      <template v-for="(l, idx) in links">
        <nav-link
          v-if="l.children"
          :key="idx"
          :children="l.children"
          :button="l.button ? true : false"
          :title="l.title"
          :icon="l.icon"
        ></nav-link>
        <nav-link
          v-else
          :key="idx"
          :button="l.button ? true : false"
          :title="l.title"
          :icon="l.icon"
          :to="l.to"
        ></nav-link>
      </template>
    </v-list>
  </v-navigation-drawer>
</template>

<script>
import { PAGE } from "~/utilities/types.js";
import LargeAvatar from "~/components/LargeAvatar.vue";
import NavLink from "~/components/navigation/NavLink.vue";
export default {
  name: "AdminNavDrawer",
  components: { LargeAvatar, NavLink },
  data() {
    return {
      links: [
        {
          icon: "mdi-view-dashboard",
          title: "Dashboard",
          to: "/admin"
        },
        {
          icon: "mdi-account-group",
          title: "Users",
          children: [{ icon: "", title: "View Users", to: "/admin/users" }]
        },
        {
          icon: "mdi-account-star",
          title: "Roles",
          button: true
        },
        {
          icon: "mdi-note",
          title: "Posts",
          button: true
        },
        {
          icon: "mdi-shape",
          title: "Categories",
          button: true
        },
        {
          icon: "mdi-tag-multiple",
          title: "Tags",
          button: true
        },
        {
          icon: "mdi-note-plus",
          title: "Applications",
          button: true
        },
        {
          icon: "mdi-form-select",
          title: "Forms",
          button: true
        },
        {
          icon: "mdi-calendar-range",
          title: "Calender",
          button: true
        }
      ]
    };
  },
  computed: {
    show: {
      get() {
        return this.$store.getters[PAGE.getters.ACPANEL];
      },
      set(value) {
        this.$store.commit(PAGE.mutations.TOGGLE_ACPANEL, value);
      }
    }
  }
};
</script>