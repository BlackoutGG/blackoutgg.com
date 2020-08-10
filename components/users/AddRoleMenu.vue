<template>
  <v-menu absolute>
    <template v-slot:activator="{ on }">
      <v-chip small pill v-on="on" @click.stop="setRoles">
        <v-icon small>mdi-plus</v-icon>
      </v-chip>
    </template>
    <v-list>
      <v-list-item v-for="(role, idx) in roles" :key="idx" @click.stop="addRole(role)">
        <span>{{role.name}}</span>
      </v-list-item>
    </v-list>
  </v-menu>
</template>

<script>
import roles from "~/utilities/ns/public/roles.js";
export default {
  name: "AddRoleMenu",

  methods: {
    addRole(role) {
      this.$emit("add", role);
    },
    setRoles() {
      if (this.roles.length) return;
      this.$store.dispatch(roles.actions.FETCH, false);
    }
  },

  computed: {
    roles() {
      return this.$store.getters[roles.getters.ROLES];
    }
  }
};
</script>