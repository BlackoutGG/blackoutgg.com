<template>
  <v-container fluid>
    <role-table :perms="perms"></role-table>
  </v-container>
</template>

<script>
import RoleTable from "~/components/table/RoleTable.vue";
import hasScope from "~/middleware/auth.hasScope.js";
import setPageTitle from "~/middleware/setPageTitle.js";
export default {
  layout: "admin",
  name: "AdminRoles",

  middleware: [
    "auth",
    hasScope("roles:view"),
    setPageTitle("View Roles"),
    "admin.roles.getList"
  ],
  components: { RoleTable }

  // async asyncData({ $axios }) {
  //   const {
  //     data: { perms }
  //   } = await $axios.get("/api/admin/role/perms");
  //   return { perms };
  // }
};
</script>