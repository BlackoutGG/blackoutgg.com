<template>
  <v-container fluid class="px-5">
    <v-row>
      <v-col cols="12">
        <user-table />
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import UserTable from "~/components/table/UserTable.vue";
import hasScope from "~/middleware/auth.hasScope.js";
import setPageTitle from "~/middleware/setPageTitle.js";
import { LISTS, PAGE } from "~/utilities/types.js";

export default {
  layout: "admin",
  name: "Users",
  components: { UserTable },
  middleware: [
    "auth",
    hasScope("users:view"),
    setPageTitle("View Users"),
    "admin.users.getList"
  ]
};
</script>