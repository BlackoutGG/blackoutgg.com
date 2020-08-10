<template>
  <v-autocomplete
    v-model="selectedRoles"
    :items="roles"
    :item-text="'name'"
    :item-value="'id'"
    :search-input.sync="search"
    multiple
    deletable-chips
    small-chips
    label="Manage Roles"
  ></v-autocomplete>
</template>

<script>
import roles from "~/utilities/ns/public/roles.js";
export default {
  name: "RoleSelect",

  props: {
    value: {
      type: Array,
      default: () => []
    },
    startingValues: {
      type: Array,
      default: () => []
    }
  },

  data() {
    return {
      search: "",
      internalItems: this.value
    };
  },

  computed: {
    selectedRoles: {
      get() {
        return this.value;
      },
      set(val) {
        this.internalItems = val;
        this.$emit("input", val);
      }
    },

    // markedForDeletion() {
    //   return this.startingValues.filter(item => {
    //     return this.value.indexOf(item) === -1;
    //   });
    // },

    roles() {
      return this.$store.getters[roles.getters.ROLES];
    }
  }
};
</script>