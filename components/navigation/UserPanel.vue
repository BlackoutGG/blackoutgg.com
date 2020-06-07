<template>
  <v-menu class="hidden-sm-and-down" v-model="menu" :close-on-content-click="false" offset-y>
    <template v-slot:activator="{ on }">
      <v-avatar :color="avatarColor" v-on="on">
        <span class="white--text headline">{{initials}}</span>
      </v-avatar>
    </template>
    <v-card>
      <v-list>
        <v-list-item>
          <v-list-item-avatar>{{initials}}</v-list-item-avatar>
          <v-list-item-content>
            <template v-if="$auth.user">
              <v-list-item-title>{{username}}</v-list-item-title>
              <v-list-item-subtitle>Member</v-list-item-subtitle>
            </template>
          </v-list-item-content>
        </v-list-item>
      </v-list>
      <v-list>
        <nav-link v-for="(l, idx) in links" :title="l.title" :icon="l.icon" :key="idx" />
        <nav-link :title="'Admin'" :icon="'mdi-shield'" :to="'/admin'" />
        <v-divider></v-divider>
        <nav-link :title="'Logout'" :icon="'mdi-logout'" :button="true" @click.native="logout" />
      </v-list>
    </v-card>
  </v-menu>
</template>

<script>
import NavLink from "./NavLink.vue";
export default {
  name: "UserPanel",
  components: { NavLink },
  data() {
    return {
      avatarColor: "#0a0a0a",
      links: [
        {
          icon: "mdi-account-box",
          title: "Profile",
          to: `/profile/${this.username}`
        }
      ],
      menu: false
    };
  },

  methods: {
    logout() {
      this.$auth.logout("local");
    }
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