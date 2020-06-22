<template>
  <v-list-item-title>{{title}}</v-list-item-title>
</template>

<script>
import startCase from "lodash/startCase";
export default {
  name: "RolePermName",

  props: {
    name: {
      type: String
    }
  },

  computed: {
    title() {
      return startCase(
        this.name.slice(this.name.indexOf("_") + 1, this.name.lastIndexOf("_"))
      );
    }
  }
};
</script>