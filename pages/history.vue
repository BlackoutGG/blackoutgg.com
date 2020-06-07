<template>
  <v-container fill-height></v-container>
</template>

<script>
import { PAGE } from "~/utilities/types";
import setTitle from "~/middleware/setPageTitle.js";
export default {
  name: "History",
  layout: "default",
  middleware: [setTitle("History")],
  head() {
    return { title: "History" };
  }
};
</script>
