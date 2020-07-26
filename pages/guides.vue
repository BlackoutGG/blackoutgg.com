<template>
  <v-container fill-height></v-container>
</template>

<script>
import setTitle from "~/middleware/setPageTitle.js";
export default {
  name: "Guides",
  layout: "default",
  middleware: [setTitle("Guides")],
  head() {
    return { title: "Guides" };
  }
};
</script>
