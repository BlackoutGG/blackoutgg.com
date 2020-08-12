<template>
  <v-navigation-drawer app v-model="open">
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

  props: {
    value: {
      type: Boolean,
      default: false
    },
    links: {
      type: [Object, Array],
      default: () => []
    },
    title: {
      type: String
    }
  },

  computed: {
    open: {
      get() {
        return this.value;
      },
      set(value) {
        this.$emit("input", value);
      }
    }
  }
};
</script>