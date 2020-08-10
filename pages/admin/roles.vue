<template>
  <v-container fluid>
    <role-table></role-table>
  </v-container>
</template>

<script>
import RoleTable from "~/components/roles/RoleTable.vue";
import hasScope from "~/middleware/auth.hasScope.js";
import setPageTitle from "~/middleware/setPageTitle.js";
export default {
  layout: "admin",
  name: "AdminRoles",

  middleware: [
    "auth",
    hasScope("roles:view"),
    setPageTitle("View Roles"),
    "getRoles"
  ],
  components: { RoleTable }
};
</script>