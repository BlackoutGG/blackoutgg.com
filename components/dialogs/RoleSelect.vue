<template>
  <v-autocomplete
    v-model="selectedRoles"
    :items="roles"
    :item-text="'name'"
    :item-value="'id'"
    :error-messages="errorMessages"
    :search-input.sync="search"
    multiple
    deletable-chips
    small-chips
    label="Manage Roles"
  ></v-autocomplete>
</template>

<script>
import types from "~/utilities/types/users.js";
export default {
  name: "CreateUserDialogRoleSelect",

  props: {
    items: {
      type: Array,
      default: () => []
    }
  },

  data() {
    return {
      search: "",
      internalItems: this.items,
      errorMessages: []
    };
  },

  computed: {
    selectedRoles: {
      get() {
        return this.internalItems;
      },
      set(val) {
        this.internalItems = val;
        this.$emit("input", val);
      }
    },

    roles() {
      return this.$store.getters[types.getters.ROLE_LIST];
    },
    roleNames() {
      return this.roles.map(({ name }) => name);
    },
    userRoles() {
      return this.items.map(item =>
        this.roles.find(role => role.name === item)
      );
    }
  }
};
</script>