<template>
  <section id="user-table">
    <v-container fluid>
      <v-row>
        <v-col md="6" sm="12">
          <div class="d-flex align-center">
            <v-pagination v-model="page" :length="pageCount"></v-pagination>
          </div>
        </v-col>
        <v-col md="6" sm="12">
          <div class="d-flex align-center">
            <table-filter-options
              :filters="filters"
              :name="name"
              @update="onUpdate"
              @reset="resetFilters"
            ></table-filter-options>
            <table-delete-all
              :length="selectedItems.length"
              @deleteAll="removeUsers(selectedItems)"
            ></table-delete-all>
            <create-dialog @open="setRoles"></create-dialog>
            <v-select
              :items="perPageOptions"
              v-model="limit"
              class="mx-2"
              hide-details
              outlined
              dense
              label="Show Per Page"
            ></v-select>
          </div>
        </v-col>
      </v-row>
      <v-row>
        <v-col cols="12">
          <v-data-table
            id="users"
            show-select
            class="elevation-1"
            v-model="selectedItems"
            hide-default-footer
            :server-items-length="total"
            :items-per-page="limit"
            :items="users"
            :headers="headers"
            :page.sync="page"
            :item-key="'id'"
          >
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
              <table-actions
                @edit="$refs.edit.setEditableContent(item.id)"
                @remove="removeUser(item.id)"
                :item="item"
                edit
                reset
                delete
                disable
              ></table-actions>
            </template>
          </v-data-table>
        </v-col>
      </v-row>
    </v-container>
    <edit-dialog ref="edit" @open="setRoles"></edit-dialog>
  </section>
</template>

<script>
import { createNamespacedHelpers } from "vuex";
import users from "~/utilities/ns/public/users.js";
import _users from "~/utilities/ns/private/users.js";
import roles from "~/utilities/ns/public/roles.js";
import pagination from "~/mixins/pagination.js";

import UserTableAvatar from "./UserTableAvatar.vue";
import UserTableRoles from "./UserRoles.vue";
import TableInput from "~/components/table/TableInput.vue";
import TableActions from "~/components/table/TableActions.vue";
import TableFilterOptions from "~/components/table/TableFilterOptions.vue";
import TableDeleteAll from "~/components/table/TableDeleteAll.vue";
import CreateDialog from "./CreateUserDialog.vue";
import EditDialog from "./EditUserDialog.vue";

const { mapGetters, mapMutations, mapActions } = createNamespacedHelpers(
  "users"
);

export default {
  name: "UserTable",
  components: {
    UserTableAvatar,
    UserTableRoles,
    TableFilterOptions,
    TableInput,
    TableActions,
    TableDeleteAll,
    CreateDialog,
    EditDialog
  },

  mixins: [pagination(users)],

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

      name: "users",

      emailEndpoint: "/api/users/validate/email",
      usernameEndpoint: "/api/users/validate/username"
    };
  },

  methods: {
    /**
     * setSelected()
     */
    ...mapMutations([_users.mutations.SET_SELECTED]),
    /**
     * changeUserInfo()
     * removeUser()
     */
    ...mapActions([
      _users.actions.CHANGE_USER_INFO,
      _users.actions.REMOVE_USER
    ]),

    setRoles() {
      if (this.isRolesPopulated) return;
      this.$store.dispatch(roles.actions.FETCH, false);
    },

    onUpdate() {
      this.fetch(false);
    },

    resetFilters() {
      this.$store.commit(filter.mutations.RESET_FILTER, "forms");
      this.fetch(false);
    }
  },
  computed: {
    /**
     * this.users,
     * this.selected
     */
    ...mapGetters([_users.getters.USERS, _users.getters.SELECTED]),

    isRolesPopulated() {
      return this.$store.getters[roles.getters.ROLES].length;
    },

    filters() {
      const list = this.$store.getters[
        roles.getters.ROLES
      ].map(({ name, id }) => ({ id, name }));

      return [
        {
          name: "Roles",
          type: "roles.id",
          multiple: true,
          itemProp: "id",
          children: list
        }
      ];
    },

    selectedItems: {
      get() {
        return this.selected;
      },
      set(value) {
        this.setSelected(value);
      }
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