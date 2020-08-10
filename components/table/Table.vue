<template>
  <v-data-table
    id="users"
    show-select
    class="elevation-1"
    v-model="selected"
    :items="items"
    :headers="headers"
    :server-items-length="queryParams('total')"
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
import lists from "~/utilities/ns/public/lists.js";

const { mapGetters, mapActions, mapMutations } = createNamespacedHelpers(
  "lists"
);

export default {
  name: "DataTable",
  methods: {
    ...mapMutations(["setParam"])
  },
  computed: {
    ...mapGetters(["getItems", "type", "queryParams"]),

    items() {
      return this.getItems(this.$route.params.type);
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
#users {
  tr {
    height: 60px;
  }
}
</style>