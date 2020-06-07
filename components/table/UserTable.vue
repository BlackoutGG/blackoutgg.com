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
    <template v-slot:item.avatar="{ item }">
      <user-table-avatar :item="item"></user-table-avatar>
    </template>
    <template v-slot:item.roles="{ item }">
      <user-table-roles :roles="item.roles"></user-table-roles>
    </template>
  </v-data-table>
</template>

<script>
import { createNamespacedHelpers } from "vuex";
import types from "~/utilities/types/users.js";
import UserTableAvatar from "~/components/table/UserTableAvatar.vue";
import UserTableRoles from "~/components/table/UserTableRoles.vue";

const { mapGetters, mapMutations } = createNamespacedHelpers("users");

export default {
  name: "DataTable",
  components: { UserTableAvatar, UserTableRoles },
  methods: {
    ...mapMutations(["setParam", "setSelected"])
  },
  computed: {
    ...mapGetters(["users", "queryParams"]),

    headers() {
      return [
        { text: "id", sortable: true, value: "id" },
        { text: "", sortable: false, value: "avatar" },
        { text: "username", sortable: true, value: "username" },
        { text: "roles", sortable: false, value: "roles" },
        { text: "joined_on", sortable: true, value: "joined_on" }
      ];
    },
    selected: {
      get() {
        return this.$store.getters[types.getters.SELECTED];
      },
      set(value) {
        // this.$store.commit(types.mutations.SET_SELECTED, value);
        this.setSelected(value);
      }
    },
    page: {
      get() {
        return this.queryParams("page");
      },
      set(value) {
        // this.$store.commit(types.mutations.SET_PARAM, { param: "page", value });
        this.setParam({ param: "page", value });
      }
    },
    sortBy: {
      get() {
        return this.queryParams("sortBy");
      },
      set(value) {
        // this.$store.commit(types.mutations.SET_PARAM, {
        //   param: "sortBy",
        //   value
        // });
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
}
</style>