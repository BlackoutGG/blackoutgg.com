<template>
  <v-data-table
    id="users"
    show-select
    class="elevation-1"
    v-model="selected"
    :items="users"
    :headers="headers"
    :server-items-length="queryParams.total"
    :item-key="'id'"
    @update:page="page"
    @update:sort="sortBy"
  >
    <template v-slot:top>
      <v-toolbar>
        <v-spacer></v-spacer>
        <create-user-dialog></create-user-dialog>
      </v-toolbar>
    </template>
    <template v-slot:item.username="{ item }">
      <user-table-input
        :userId="item.id"
        :value="item.username"
        :large="true"
        @save="changeUserInfo"
      ></user-table-input>
    </template>
    <template v-slot:item.email="{ item }">
      <user-table-input
        :type="'email'"
        :userId="item.id"
        :value="item.email"
        :large="true"
        @save="changeUserInfo"
      ></user-table-input>
    </template>
    <template v-slot:item.avatar="{ item }">
      <user-table-avatar :item="item"></user-table-avatar>
    </template>
    <template v-slot:item.roles="{ item }">
      <user-table-roles :userId="item.id" :roles="item.roles"></user-table-roles>
    </template>
    <template v-slot:item.actions="{ item }">
      <table-actions :item="item"></table-actions>
    </template>
  </v-data-table>
</template>

<script>
import { createNamespacedHelpers } from "vuex";
import types from "~/utilities/types/users.js";
import UserTableAvatar from "~/components/table/UserTableAvatar.vue";
import UserTableRoles from "~/components/table/UserTableRoles2.vue";
import UserTableInput from "~/components/table/UserTableInputDialog.vue";
import TableActions from "~/components/table/TableActions.vue";
import CreateUserDialog from "~/components/dialogs/CreateUserDialog.vue";

const { mapGetters, mapMutations, mapActions } = createNamespacedHelpers(
  "users"
);

export default {
  name: "DataTable",
  components: {
    UserTableAvatar,
    UserTableRoles,
    UserTableInput,
    TableActions,
    CreateUserDialog
  },
  methods: {
    ...mapMutations(["setParam", "setSelected"]),
    ...mapActions(["changeUserInfo"])
  },
  computed: {
    ...mapGetters(["users", "queryParams"]),

    headers() {
      return [
        { text: "id", sortable: true, value: "id" },
        { text: "", sortable: false, value: "avatar" },
        { text: "username", sortable: true, value: "username" },
        { text: "email", sortable: true, value: "email" },
        { text: "roles", sortable: false, value: "roles" },
        { text: "joined_on", sortable: true, value: "joined_on" },
        { text: "", sortable: false, value: "actions", align: "end" }
      ];
    },
    selected: {
      get() {
        return this.$store.getters[types.getters.SELECTED];
      },
      set(value) {
        this.setSelected(value);
      }
    },
    page: {
      get() {
        return this.queryParams("page");
      },
      set(value) {
        this.setParam({ param: "page", value });
      }
    },
    sortBy: {
      get() {
        return this.queryParams("sortBy");
      },
      set(value) {
        this.setParam({ param: "sortBy", value });
      }
    },
    limit() {
      return this.queryParams("limit");
    }
  }
};
</script>

<style lang="scss">
#users {
  tr {
    height: 60px;
  }
  .text-end {
    text-align: right;
  }
}
</style>