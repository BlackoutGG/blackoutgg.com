<template>
  <v-container fluid class="px-5">
    <data-table></data-table>
  </v-container>
</template>
<script>
const types = /posts|applications|forms/;

import DataTable from "~/components/table/Table.vue";
import capitalize from "lodash/capitalize";
import { LISTS, PAGE } from "~/utilities/types.js";

export default {
  name: "Manage",
  layout: "admin",
  components: { DataTable },
  validate({ params }) {
    return types.test(params.type);
  },
  // middleware({ store, params }) {
  //   store.dispatch(LISTS.actions.FETCH, params.type);
  //   store.commit(PAGE.mutations.SET_TITLE, `View ${capitalize(params.type)}`);
  // }
  middleware: [
    "auth",
    ({ $auth, params }) => $auth.hasScope(`${params.type}:view`),
    ({ store, params }) =>
      store.commit(PAGE.mutations.SET_TITLE, `View ${capitalize(params.type)}`),
    "admin._types.getList"
  ]
};
</script>