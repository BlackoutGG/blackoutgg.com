<template>
  <v-row>
    <v-col md="6" sm="12">
      <div class="d-flex align-center">
        <v-pagination v-model="page" :length="pageCount"></v-pagination>
      </div>
    </v-col>
    <v-col md="6" sm="12">
      <div class="d-flex align-center">
        <v-spacer></v-spacer>
        <table-filter-options
          :filters="filterOptions"
          :name="filterName"
          @update="onUpdate"
          @reset="resetFilters"
        />
        <table-delete-all :length="selectedItems.length" @deleteAll="removeForms(selectedItems)"></table-delete-all>
        <form-dialog ref="dialog"></form-dialog>
        <v-select
          :items="perPageOptions"
          :full-width="false"
          v-model="limit"
          hide-details
          outlined
          dense
          label="Show Per Page"
        ></v-select>
      </div>
    </v-col>
    <v-col cols="12">
      <v-data-table
        id="forms"
        show-select
        v-model="selectedItems"
        hide-default-footer
        :server-items-length="total"
        :items-per-page="limit"
        :items="forms"
        :headers="headers"
        :page.sync="page"
        :item-key="'id'"
      >
        <template #item.category="{ item }">{{ item.category.name }}</template>
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
              @remove="removeForms([item.id])"
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
import _forms from "~/utilities/ns/private/forms.js";
import form from "~/utilities/ns/public/forms.js";
import filter from "~/utilities/ns/public/filters.js";
import lists from "~/utilities/ns/public/lists.js";

import pagination from "~/mixins/pagination.js";

const { mapGetters, mapMutations, mapActions } = createNamespacedHelpers(
  "forms"
);

import FormDialog from "./FormDialog.vue";
import TableActions from "~/components/table/TableActions.vue";
import TableDeleteAll from "~/components/table/TableDeleteAll.vue";
import TableFilterOptions from "~/components/table/TableFilterOptions.vue";

export default {
  name: "FormTemplateTable",

  components: {
    FormDialog,
    TableActions,
    TableDeleteAll,
    TableFilterOptions
  },

  mixins: [pagination(form)],

  data() {
    return {
      headers: [
        { text: "name", align: "start", value: "name" },
        { text: "category", sortable: true, value: "category" },
        { text: "status", sortable: true, value: "status" },
        { text: "created_at", sortable: true, value: "created_at" },
        { text: "updated_at", sortable: true, value: "updated_at" },
        { text: "", align: "end", value: "actions" }
      ],

      filterName: "forms"
    };
  },

  methods: {
    /**
     * this.setSelected()
     */
    ...mapMutations([_forms.mutations.SET_SELECTED]),
    /**
     * this.fetchForms()
     * this.setStatus()
     */
    ...mapActions([
      _forms.actions.FETCH,
      _forms.actions.SET_STATUS,
      _forms.actions.REMOVE_FORMS
    ]),

    onUpdate() {
      this.fetchForms(false);
    },

    resetFilters() {
      this.$store.commit(filter.mutations.RESET_FILTER, "forms");
      this.fetchForms(false);
    }
  },

  computed: {
    /**
     * this.forms()
     * this.selected()
     */
    ...mapGetters([_forms.getters.FORMS, _forms.getters.SELECTED]),

    categories() {
      return;
    },

    filterOptions() {
      const categories = this.$store.getters[lists.getters.ITEMS](
        "categories"
      ).map(({ id, name }) => ({ id, name }));

      return [
        {
          name: "Categories",
          type: "category_id",
          itemProp: "id",
          multiple: true,
          children: categories
        },
        { name: "Status", type: "status" }
      ];
    },

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
