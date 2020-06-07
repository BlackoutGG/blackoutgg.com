<template>
  <v-list>
    <v-list-group>
      <template v-slot:activator>
        <v-list-item-avatar>
          <img :src="$auth.user.avatar" alt v-if="$auth.user.avatar" />
          <span class="white--text headline" v-else>{{avatar}}</span>
        </v-list-item-avatar>
        <v-list-item-content>
          <v-list-item-title>{{username}}</v-list-item-title>
        </v-list-item-content>
      </template>
      <user-panel-link
        v-for="(link, idx) in links"
        :title="link.title"
        :icon="link.icon"
        :subGroup="true"
        :key="idx"
      />
      <user-panel-link :title="'Admin'" :icon="'mdi-shield'"></user-panel-link>
    </v-list-group>
  </v-list>
</template>

<script>
import UserPanelLink from "./UserPanelLink.vue";
export default {
  name: "UserPanelMobile",
  components: { UserPanelLink },
  data() {
    return {
      links: [{ icon: "mdi-account", title: "Profile" }]
    };
  },
  computed: {
    username() {
      return this.$auth.user ? this.$auth.user.username : null;
    },
    initials() {
      if (this.username) {
        const initials = this.username.match(/\b\w/g) || [];
        return (
          (initials.shift() || "") + (initials.pop() || "")
        ).toUpperCase();
      }
    },
    avatar() {
      return this.$auth.user.avatar ? this.$auth.user.avatar : this.initials;
    }
  }
};
</script>