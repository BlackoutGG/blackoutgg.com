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
        <v-btn>
          <v-icon left>mdi-refresh</v-icon>
          <span>Refresh</span>
        </v-btn>
        <create-dialog @open="setRoles"></create-dialog>
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
      <table-actions @edit="$refs.dialog.setEditableContent(item)" :item="item"></table-actions>
    </template>
    <edit-dialog ref="dialog" @open="setRoles"></edit-dialog>
  </v-data-table>
</template>

<script>
import { createNamespacedHelpers } from "vuex";
import { users } from "~/utilities/types/users.js";
import { roles } from "~/utilities/types/roles.js";
import UserTableAvatar from "~/components/table/UserTableAvatar.vue";
import UserTableRoles from "~/components/table/UserRoles.vue";
import UserTableInput from "~/components/table/UserTableInputDialog.vue";
import TableActions from "~/components/table/TableActions.vue";
import CreateDialog from "~/components/dialogs/CreateUserDialog.vue";
import EditDialog from "~/components/dialogs/EditUserDialog.vue";

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
    CreateDialog,
    EditDialog
  },

  data() {
    return {
      dialog: "create",
      headers: [
        { text: "id", sortable: true, value: "id" },
        { text: "", sortable: false, value: "avatar" },
        { text: "username", sortable: true, value: "username" },
        { text: "email", sortable: true, value: "email" },
        { text: "roles", sortable: false, value: "roles" },
        { text: "joined_on", sortable: true, value: "joined_on" },
        { text: "", sortable: false, value: "actions", align: "end" }
      ]
    };
  },

  methods: {
    ...mapMutations(["setParam", "setSelected"]),
    ...mapActions(["changeUserInfo"]),
    setRoles() {
      const roles = this.$store.getters(roles.getters.ROLES);
      if (roles.length) return;
      this.$store.dispatch(roles.actions.FETCH, false);
    }
  },
  computed: {
    ...mapGetters(["users", "queryParams"]),

    selected: {
      get() {
        return this.$store.getters[users.getters.SELECTED];
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