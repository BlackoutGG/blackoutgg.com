<template>
  <v-container fluid>
    <form-template-table></form-template-table>
  </v-container>
</template>

<script>
import lists from "~/utilities/ns/public/lists.js";
import forms from "~/utilities/ns/public/forms.js";
import setPageTitle from "~/middleware/setPageTitle.js";
import FormTemplateTable from "~/components/forms/FormTable.vue";
export default {
  name: "RecruitmentFormTemplates",
  layout: "admin",

  components: {
    FormTemplateTable
  },

  middleware: [
    "auth",
    setPageTitle("View Forms"),
    ({ store }) => {
      // const categories = store.getters[lists.getters.ITEMS]("categories");
      // if (!categories.length) {
      //   store.dispatch(lists.actions.FETCH, "categories");
      // }
      store.dispatch(forms.actions.FETCH);
    }
  ]
};
</script>
