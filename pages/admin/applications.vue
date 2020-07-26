<template>
  <v-container fluid>
    <form-template-table></form-template-table>
  </v-container>
</template>

<script>
import { lists as categories } from "~/utilities/ns/lists.js";
import setPageTitle from "~/middleware/setPageTitle.js";
import FormTemplateTable from "~/components/applications/FormTemplateTable.vue";
export default {
  name: "FormGenerator",
  layout: "admin",

  components: {
    FormTemplateTable
  },

  middlware: [
    "auth",
    setPageTitle("View Applications"),
    ({ store }) => {
      store.dispatch(categories.actions.FETCH, "categories");
    }
  ]
};
</script>
