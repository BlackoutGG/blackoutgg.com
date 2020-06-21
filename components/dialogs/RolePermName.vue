<template>
  <v-list-item-title>{{title}}</v-list-item-title>
</template>

<script>
import startCase from "lodash/startCase";
import camelCase from "lodash/camelCase";
export default {
  name: "RolePermName",

  props: {
    name: {
      type: String
    }
  },

  computed: {
    title() {
      // return startCase(
      //   camelCase(
      //     this.name.substr(this.name.indexOf("can_"), this.name.length - 1)
      //   )
      // );
      return startCase(
        this.name.slice(this.name.indexOf("_") + 1, this.name.lastIndexOf("_"))
      );
    }
  }
};
</script>