<template>
  <v-container fluid fill-height></v-container>
</template>

<script>
import { PAGE } from "~/utilities/types.js";
import setTitle from "~/middleware/setPageTitle.js";
import hasScope from "~/middleware/auth.hasScope.js";
export default {
  name: "AdminDashboard",
  layout: "admin",
  middleware: ["auth", hasScope("admin:access"), setTitle("Dashboard")]
};
</script>