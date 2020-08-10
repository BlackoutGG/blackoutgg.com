<template>
  <v-container fluid fill-height></v-container>
</template>

<script>
import page from "~/utilities/ns/public/page.js";
import setTitle from "~/middleware/setPageTitle.js";
import hasScope from "~/middleware/auth.hasScope.js";
export default {
  name: "AdminDashboard",
  layout: "admin",
  middleware: ["auth", hasScope("admin:view"), setTitle("Dashboard")]
};
</script>