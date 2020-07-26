<template>
  <v-data-table
    id="users"
    show-select
    class="elevation-1"
    v-model="selected"
    :items="items"
    :headers="headers"
    :server-items-length="queryParams.total"
    :item-key="'id'"
    @update:page="page"
    @update:sort="sortBy"
  >
    <template v-slot:item.avatar="{ item }">
      <v-avatar color="primary">
        <img :src="item.avatar" alt v-if="item.avatar" />
        <span class="white--text">
          <v-icon>mdi-account</v-icon>
        </span>
      </v-avatar>
    </template>
  </v-data-table>
</template>

<script>
import { createNamespacedHelpers } from "vuex";
import { lists } from "~/utilities/ns/lists.js";

const { mapGetters, mapActions } = createNamespacedHelpers("lists");

export default {
  name: "DataTable",
  computed: {
    ...mapGetters(["getItems", "type", "queryParams"]),

    isUserList() {
      return this.$route.params.type === "users";
    },

    items() {
      return this.isUserList
        ? this.getItems("users").map(
            ({ id, avatar, roles, username, created_at, updated_at }) => {
              roles = roles.map(role => role.name);
              return { id, avatar, username, roles, created_at, updated_at };
            }
          )
        : this.getItems(this.$route.params.type);
    },

    headers() {
      return this.items && this.items.length
        ? Object.keys(this.items[0]).map(key => ({
            text: key,
            sortable: true,
            value: key
          }))
        : [];
    },
    selected: {
      get() {
        return this.$store.getters[LISTS.getters.SELECTED];
      },
      set(value) {
        this.$store.commit(LISTS.mutations.SET_SELECTED, value);
      }
    },
    page: {
      get() {
        return this.queryParams("page");
      },
      set(value) {
        this.$store.commit(LISTS.mutations.SET_PAGE, value);
      }
    },
    sortBy: {
      get() {
        return this.queryParams("sortBy");
      },
      set(value) {
        return this.$store.commit(LISTS.mutations.SORT, value);
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