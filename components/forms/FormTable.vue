<template>
  <v-row>
    <v-col md="6" sm="12">
      <div class="d-flex align-center">
        <v-pagination v-model="page" :length="pageCount"></v-pagination>
      </div>
    </v-col>
    <v-col md="6" sm="12">
      <!-- <select-menu
        :items="optionsPerPage"
        v-model="limit"
        class="mx-2"
        outlined
        label="Show Per Page:"
      />-->

      <div class="d-flex align-center">
        <v-spacer></v-spacer>
        <v-select
          :items="optionsPerPage"
          :full-width="false"
          class="mx-2"
          v-model="limit"
          hide-details
          outlined
          dense
          label="Show Per Page"
        ></v-select>
        <form-dialog ref="dialog"></form-dialog>
      </div>
    </v-col>
    <v-col cols="12">
      <v-data-table
        id="forms"
        show-select
        v-model="selected"
        hide-default-footer
        :server-item-length="queryParams('total')"
        :items-per-page="limit"
        :items="forms"
        :headers="headers"
        :page.sync="page"
        :item-key="'id'"
      >
        <!-- <template #top>
      <v-toolbar>
        <v-spacer></v-spacer>
        <form-dialog ref="dialog"></form-dialog>
      </v-toolbar>
        </template>-->
        <template #item.category="{ item }">{{item.category.name}}</template>
        <template #item.status="{ item }">
          <v-btn icon @click.native="setStatus(item)">
            <v-icon v-if="item.status">mdi-check-bold</v-icon>
            <v-icon v-else>mdi-close-thick</v-icon>
          </v-btn>
        </template>
        <template v-slot:item.actions="{ item }">
          <div class="text-right">
            <table-actions
              @edit="$refs.dialog.setEditableContent(item.id)"
              @remove="removeForm(item.id)"
              :item="item"
              edit
              remove
            ></table-actions>
          </div>
        </template>
      </v-data-table>
    </v-col>
  </v-row>
</template>

<script>
import { createNamespacedHelpers } from "vuex";
import forms from "~/utilities/ns/private/forms.js";
import formNS from "~/utilities/ns/public/forms.js";

import pagination from "~/mixins/pagination.js";

const { mapGetters, mapMutations, mapActions } = createNamespacedHelpers(
  "forms"
);

import FormDialog from "./FormDialog.vue";
import TableActions from "~/components/table/TableActions.vue";
import SelectMenu from "~/components/SelectMenu2.vue";
export default {
  name: "FormTemplateTable",

  components: { FormDialog, TableActions, SelectMenu },

  mixins: [pagination(formNS)],

  data() {
    return {
      // pageCount: 0,
      optionsPerPage: [25, 50, 75, 100],
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
    ...mapMutations([forms.mutations.SET_PARAM, forms.mutations.SET_SELECTED]),
    /**
     * this.fetchForms()
     * this.setStatus()
     */
    ...mapActions([
      forms.actions.FETCH,
      forms.actions.SET_STATUS,
      forms.actions.REMOVE_FORM
    ])
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
    ]),

    // page: {
    //   get() {
    //     return this.queryParams("page");
    //   },
    //   set(value) {
    //     this.setParam({ param: "page", value });
    //     this.fetchForms(false);
    //   }
    // },
    // limit: {
    //   get() {
    //     return this.queryParams("limit");
    //   },
    //   set(value) {
    //     this.setParam({ param: "limit", value });
    //     this.fetchForms(false);
    //   }
    // },
    selectedItems: {
      get() {
        return this.selected;
      },
      set(value) {
        return this.setSelected(value);
      }
    }
  }
};
</script>