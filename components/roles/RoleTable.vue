<template>
  <section id="role-table">
    <v-container fluid>
      <v-row>
        <v-col md="6" sm="12">
          <div class="d-flex align-center">
            <v-pagination v-model="page" :length="pageCount"></v-pagination>
          </div>
        </v-col>
        <v-col md="6" sm="12">
          <div class="d-flex align-center">
            <v-spacer></v-spacer>
            <v-select
              :items="perPageOptions"
              :full-width="false"
              class="mx-2"
              v-model="limit"
              hide-details
              outlined
              dense
              label="Show Per Page"
            ></v-select>
            <v-btn outlined @click="$refs.edit.setNewContent()">
              <v-icon left>mdi-plus</v-icon>
              <span>Add Role</span>
            </v-btn>
          </div>
        </v-col>
      </v-row>
      <v-row>
        <v-data-table
          id="roles"
          show-select
          class="elevation-1"
          v-model="selected"
          hide-default-footer
          :server-items-length="total"
          :items-per-page="limit"
          :items="roles"
          :headers="headers"
          :page.sync="page"
          :item-key="'id'"
        >
          <template v-slot:item.name="{ item }">
            <table-input
              :endpoint="endpoint"
              :id="item.id"
              :type="'name'"
              :value="item.name"
              :large="true"
            ></table-input>
          </template>
          <template v-slot:item.actions="{ item }">
            <table-actions
              @edit="$refs.edit.setEditableContent(item.id)"
              @disable="toggleStatus(item.id, item.is_disabled)"
              @remove="removeRole(item.id)"
              edit
              disable
              remove
              :item="item"
            ></table-actions>
          </template>
        </v-data-table>
      </v-row>
    </v-container>
    <edit-role ref="edit"></edit-role>
  </section>
</template>

<script>
import { createNamespacedHelpers } from "vuex";
import _roles from "~/utilities/ns/private/roles.js";
import roles from "~/utilities/ns/public/roles.js";
import pagination from "~/mixins/pagination.js";

import TableActions from "~/components/table/TableActions.vue";
import TableInput from "~/components/table/TableInput.vue";
import SelectMenu from "~/components/SelectMenu2.vue";
import EditRole from "./EditRoleDialog.vue";

const { mapGetters, mapActions, mapMutations } = createNamespacedHelpers(
  "roles"
);

export default {
  name: "RoleTable",

  components: { TableActions, TableInput, EditRole, SelectMenu },

  mixins: [pagination(roles)],

  data() {
    return {
      headers: [
        { text: "name", align: "start", value: "name" },
        { text: "", sortable: false, align: "end", value: "actions" }
      ],
      endpoint: "/api/roles/validate/name"
    };
  },

  methods: {
    /**
     * this.setSelected()
     */
    ...mapMutations([_roles.mutations.SET_SELECTED]),
    /**
     * this.editRole()
     */
    ...mapActions([_roles.actions.EDIT_ROLE]),

    toggleStatus(id, is_disabled) {
      this.editRole({ id, disable: is_disabled });
    }
  },

  computed: {
    /**
     * this.roles,
     * this.selected
     * */
    ...mapGetters([_roles.getters.roles, _roles.getters.selected]),

    selected: {
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
#roles {
  .transparent {
    background: transparent;
  }
  tr {
    height: 60px;
  }
  .text-end {
    text-align: right;
  }
}
</style>