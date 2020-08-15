<template>
  <v-data-table
    id="forms"
    show-select
    v-model="selected"
    :items="forms"
    :headers="headers"
    :server-item-length="queryParams('total')"
    :item-key="'id'"
  >
    <template #top>
      <v-toolbar>
        <v-spacer></v-spacer>
        <form-dialog ref="dialog"></form-dialog>
      </v-toolbar>
    </template>
    <template #item.category="{ item }">{{item.category.name}}</template>
    <template #item.status="{ item }">
      <v-btn icon @click.native="setStatus(item)">
        <v-icon v-if="item.status">mdi-check-bold</v-icon>
        <v-icon v-else>mdi-close-thick</v-icon>
      </v-btn>
    </template>
    <template v-slot:item.actions="{ item }">
      <table-actions @edit="$refs.dialog.setEditableContent(item.id)" :item="item" edit delete></table-actions>
    </template>
  </v-data-table>
</template>

<script>
import { createNamespacedHelpers } from "vuex";
import forms from "~/utilities/ns/private/forms.js";

const { mapGetters, mapMutations, mapActions } = createNamespacedHelpers(
  "forms"
);

import FormDialog from "./FormDialog.vue";
import TableActions from "~/components/table/TableActions.vue";
export default {
  name: "FormTemplateTable",

  components: { FormDialog, TableActions },

  data() {
    return {
      headers: [
        { text: "name", align: "start", value: "name" },
        { text: "category", sortable: true, value: "category" },
        { text: "status", sortable: true, value: "status" },
        { text: "created_at", sortable: true, value: "created_at" },
        { text: "updated_at", sortable: true, value: "updated_at" },
        { text: "", align: "end", value: "actions" }
      ]
    };
  },

  methods: {
    /**
     * this.setParam()
     */
    ...mapMutations([forms.mutations.SET_PARAM]),
    /**
     * this.fetchForms()
     * this.setStatus()
     */
    ...mapActions([forms.actions.FETCH, forms.actions.SET_STATUS])
  },

  computed: {
    /**
     * this.queryParams()
     * this.forms()
     * this.selected()
     */
    ...mapGetters([
      forms.getters.QUERY_PARAMS,
      forms.getters.FORMS,
      forms.getters.SELECTED
    ])
  }
};
</script>