<template>
  <v-navigation-drawer class="hidden-md-and-up" v-model="show" id="mobile" absolute>
    <template v-if="$auth.loggedIn">
      <user-panel-mobile />
      <v-divider></v-divider>
    </template>
    <template v-else>
      <v-list>
        <nav-link
          :title="'Sign In'"
          :icon="'mdi-account-circle'"
          :button="true"
          @click.native="$emit('toggle')"
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
import UserPanelMobile from "./UserPanelMobile.vue";
import NavLink from "./NavLink.vue";
export default {
  name: "UserNavMobile",
  components: { UserPanelMobile, NavLink },

  props: {
    value: {
      type: Boolean,
      default: false
    },
    links: {
      type: Array,
      default: () => []
    }
  },

  computed: {
    show: {
      get() {
        return this.value;
      },
      set(val) {
        this.$emit("input", val);
      }
    }
  }
};
</script>