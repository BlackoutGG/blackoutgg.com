<template>
  <user-table />
</template>

<script>
import UserTable from "~/components/users/UserTable.vue";
import hasScope from "~/middleware/auth.hasScope.js";
import setPageTitle from "~/middleware/setPageTitle.js";
import users from "~/utilities/ns/public/users.js";

export default {
  layout: "admin",
  name: "Users",
  components: { UserTable },
  middleware: [
    "auth",
    hasScope("users:view"),
    setPageTitle("View Users")
    // "getUsers"
  ],

  async fetch() {
    this.$store.dispatch(users.actions.FETCH);
  }
};
</script>