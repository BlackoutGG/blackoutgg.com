<template>
  <role-table></role-table>
</template>

<script>
import RoleTable from "~/components/roles/RoleTable.vue";
import hasScope from "~/middleware/auth.hasScope.js";
import setPageTitle from "~/middleware/setPageTitle.js";
import roles from "~/utilities/ns/public/roles.js";
export default {
  layout: "admin",
  name: "AdminRoles",

  components: { RoleTable },

  middleware: [
    "auth",
    hasScope("roles:view"),
    setPageTitle("View Roles")
    // "getRoles"
  ],

  async fetch() {
    this.$store.dispatch(roles.actions.FETCH);
  }
};
</script>