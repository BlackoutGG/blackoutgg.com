<template>
  <v-data-table
    id="forms"
    show-select
    class="elevaton-1"
    v-model="selected"
    :items="forms"
    :headers="headers"
    :server-item-length="queryParams('total')"
    :item-key="'id'"
  >
    <template #top>
      <v-toolbar>
        <v-toolbar-title>
          <span>Form Templates</span>
        </v-toolbar-title>
        <v-spacer></v-spacer>
        <form-dialog ref="formDialog"></form-dialog>
      </v-toolbar>
    </template>
  </v-data-table>
</template>

<script>
import { createNamespacedHelpers } from "vuex";

const { mapGetters, mapActions } = createNamespacedHelpers("lists");

import FormDialog from "./FormDialog.vue";
export default {
  name: "FormTemplateTable",

  components: { FormDialog },

  data() {
    return {
      headers: [],
      selected: []
    };
  },

  methods: {
    ...mapActions(["setParam"])
  },

  computed: {
    ...mapGetters(["queryParams", "items"]),
    forms() {
      return this.items("forms");
    },
    categoryList() {
      return this.items("categories");
    }
  }
};
</script>