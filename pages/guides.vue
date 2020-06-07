<template>
  <v-container fill-height></v-container>
</template>

<script>
import { PAGE } from "~/utilities/types.js";
import setTitle from "~/middleware/setPageTitle.js";
export default {
  name: "Guides",
  layout: "default",
  // middleware({ store }) {
  //   store.commit(PAGE.mutations.SET_TITLE, "Guides");
  // },
  middleware: [setTitle("Guides")],
  head() {
    return { title: "Guides" };
  }
};
</script>
