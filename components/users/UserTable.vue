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
        <edit-dialog ref="edit" @open="setRoles"></edit-dialog>
      </v-toolbar>
    </template>
    <template v-slot:item.username="{ item }">
      <table-input
        :endpoint="usernameEndpoint"
        :id="item.id"
        :type="'username'"
        :value="item.username"
        :large="true"
        @save="changeUserInfo"
      ></table-input>
    </template>
    <template v-slot:item.email="{ item }">
      <table-input
        :endpoint="emailEndpoint"
        :id="item.id"
        :type="'email'"
        :value="item.email"
        :large="true"
        @save="changeUserInfo"
      ></table-input>
    </template>
    <template v-slot:item.avatar="{ item }">
      <user-table-avatar :item="item"></user-table-avatar>
    </template>
    <template v-slot:item.roles="{ item }">
      <user-table-roles :userId="item.id" :roles="item.roles"></user-table-roles>
    </template>
    <template v-slot:item.actions="{ item }">
      <table-actions @edit="setEditableContent(item)" :item="item" edit reset delete disable></table-actions>
    </template>
  </v-data-table>
</template>

<script>
import { createNamespacedHelpers } from "vuex";
import { users } from "~/utilities/ns/users.js";
import { roles } from "~/utilities/ns/roles.js";
import UserTableAvatar from "./UserTableAvatar.vue";
import UserTableRoles from "./UserRoles.vue";
import TableInput from "~/components/table/TableInput.vue";
import TableActions from "~/components/table/TableActions.vue";
import CreateDialog from "./CreateUserDialog.vue";
import EditDialog from "./EditUserDialog.vue";

const { mapGetters, mapMutations, mapActions } = createNamespacedHelpers(
  "users"
);

export default {
  name: "DataTable",
  components: {
    UserTableAvatar,
    UserTableRoles,
    TableInput,
    TableActions,
    CreateDialog,
    EditDialog
  },

  data() {
    return {
      dialog: "create",
      headers: [
        { text: "", sortable: false, value: "avatar" },
        { text: "username", sortable: true, value: "username" },
        { text: "email", sortable: true, value: "email" },
        { text: "roles", sortable: false, value: "roles" },
        { text: "joined_on", sortable: true, value: "joined_on" },
        { text: "", sortable: false, value: "actions", align: "end" }
      ],

      emailEndpoint: "/api/users/validate/email",
      usernameEndpoint: "/api/users/validate/username"
    };
  },

  methods: {
    ...mapMutations(["setParam", "setSelected"]),
    ...mapActions(["changeUserInfo"]),
    setEditableContent(item) {
      this.$refs.edit.setEditableContent(item.id);
    },
    setRoles() {
      if (this.isRolesPopulated) return;
      this.$store.dispatch(roles.actions.FETCH, false);
    }
  },
  computed: {
    ...mapGetters(["users", "queryParams"]),
    isRolesPopulated() {
      return this.$store.getters[roles.getters.ROLES].length;
    },
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