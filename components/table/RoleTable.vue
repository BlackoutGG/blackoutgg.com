<template>
  <v-data-table
    id="roles"
    show-select
    class="elevation-1"
    v-model="selected"
    :items="roles"
    :headers="headers"
    :server-items-length="queryParams('total')"
    :item-key="'id'"
    @update:page="page"
    @update:sort="sortBy"
  >
    <template v-slot:top>
      <v-toolbar>
        <v-spacer></v-spacer>
        <v-btn color="primary" @click="$refs.edit.setNewContent()">
          <v-icon left>mdi-plus</v-icon>
          <span>Add Role</span>
        </v-btn>
        <edit-role ref="edit"></edit-role>
      </v-toolbar>
    </template>
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
</template>

<script>
import { createNamespacedHelpers } from "vuex";
import { roles } from "~/utilities/types/roles.js";

const { mapGetters, mapActions, mapMutations } = createNamespacedHelpers(
  "roles"
);

import TableActions from "./TableActions.vue";
import TableInput from "./TableInput.vue";
import EditRole from "~/components/dialogs/EditRoleDialog.vue";

export default {
  name: "RoleTable",

  components: { TableActions, TableInput, EditRole },

  // props: {
  //   perms: {
  //     type: Array,
  //     default: () => []
  //   }
  // },

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
    ...mapMutations(["setParam", "setSelected"]),
    ...mapActions(["editRole"]),
    toggleStatus(id, is_disabled) {
      this.editRole({ id, disable: is_disabled });
    }
  },

  computed: {
    /** this.roles, this.queryParams, this.selected */
    ...mapGetters(["roles", "queryParams"]),

    selected: {
      get() {
        return this.$store.getters[roles.getters.SELECTED];
        // this.selected();
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
    limit: {
      get() {
        return this.queryParams("limit");
      },
      set(value) {
        this.setParam({ param: "limit", value });
      }
    }
  }
};
</script>

<style lang="scss">
#roles {
  tr {
    height: 60px;
  }
  .text-end {
    text-align: right;
  }
}
</style>