<template>
  <v-navigation-drawer app v-model="show">
    <template v-if="$auth.loggedIn">
      <user-avatar></user-avatar>
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
import page from "~/utilities/ns/public/page.js";
import UserAvatar from "~/components/avatar/UserAvatar.vue";
import NavLink from "~/components/navigation/NavLink.vue";
export default {
  name: "AdminNavDrawer",
  components: { UserAvatar, NavLink },
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
          to: "/admin/users"
        },
        {
          icon: "mdi-account-star",
          title: "Roles",
          to: "/admin/roles"
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
          title: "Recruitment",
          children: [
            {
              title: "Templates",
              to: "/admin/forms/templates"
            },
            {
              title: "Applications",
              to: "/admin/forms/applications"
            }
          ]
        },
        {
          icon: "mdi-calendar-range",
          title: "Events",
          to: "/admin/events"
        }
      ]
    };
  },
  computed: {
    show: {
      get() {
        return this.$store.getters[page.getters.ACPANEL];
      },
      set(value) {
        this.$store.commit(page.mutations.TOGGLE_ACPANEL, value);
      }
    }
  }
};
</script>