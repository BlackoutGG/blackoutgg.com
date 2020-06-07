<template>
  <v-menu absolute>
    <template v-slot:activator="{ on }">
      <v-chip small pill v-on="on">
        <v-icon small>mdi-plus</v-icon>
      </v-chip>
    </template>
    <v-list>
      <v-list-item v-for="(role, idx) in roles" :key="idx" @click="addRole(role)">
        <span>{{role.name}}</span>
      </v-list-item>
    </v-list>
  </v-menu>
</template>

<script>
import types from "~/utilities/types/users.js";
export default {
  name: "AddRoleMenu",
  // data() {
  //   return {
  //     list: ["admin", "member", "guest", "super agent"]
  //   };
  // },

  methods: {
    addRole(role) {
      this.$emit("add", role);
    }
  },

  computed: {
    roles() {
      return this.$store.getters[types.getters.ROLE_LIST];
    }
  }
};
</script>