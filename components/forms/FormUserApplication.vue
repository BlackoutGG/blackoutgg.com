<template>
  <v-container>
    <v-row>
      <v-col cols="12">
        <v-select
          label="Category"
          :form="categoryList"
          :item-text="'name'"
          :item-value="'id'"
          :value="category"
        ></v-select>
      </v-col>
      <v-col cols="12">
        <v-textarea readonly :value="description" outlined label="Description"></v-textarea>
      </v-col>
    </v-row>
    <v-row v-for="(field, idx) in fields" :key="idx">
      <v-col cols="12">
        <div class="text--subtitle-1 font-weight-medium">
          <span>Question {{ idx + 1 }}</span>
        </div>
        <p class="text--white">{{ field.value }}</p>
        <template v-if="!field.options">
          <v-text-field
            v-model="textfield[`textfield_${field.id}`]"
            v-if="field.type === 'textfield'"
          ></v-text-field>
          <v-textarea v-model="textarea[`textarea_${field.id}`]" v-else></v-textarea>
        </template>
        <template v-else>
          <template v-if="field.type === 'multiple'">
            <v-radio-group v-model="multiple[`multiple_${field.id}`]">
              <template v-for="(option, i) in field.options">
                <v-radio :label="option.value" :key="i" v-if="option.value"></v-radio>
              </template>
            </v-radio-group>
          </template>
          <template v-else-if="field.type === 'checkbox'">
            <template v-for="(option, i) in field.options">
              <v-checkbox
                class="my-0 py-0"
                v-model="checkbox[`checkbox_${field.id}`]"
                :label="option.value"
                :key="i"
                v-if="option.value"
                hide-details
              ></v-checkbox>
            </template>
          </template>
          <template v-else>
            <v-select
              v-model="select[`select_${field.id}`]"
              :items="field.options"
              :item-text="'value'"
              :item-value="'value'"
            ></v-select>
          </template>
        </template>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import lists from "~/utilities/ns/public/lists.js";
import forms from "~/utilities/ns/private/forms.js";
import { createNamespacedHelpers } from "vuex";

const { mapGetters, mapMutations } = createNamespacedHelpers("forms");

export default {
  name: "FormUserApplication",

  props: {
    form: {
      type: Object
    }
  },

  data() {
    return {
      textfield: null,
      textarea: null,
      checkbox: null,
      select: null,
      multiple: null
    };
  },

  created() {
    this.form.fields.forEach(field => {
      if (!this[field.type]) this[field.type] = {};
      Object.assign(this[field.type], {
        [`${this.field.type}_${this.field.id}`]:
          this.field.type === "checkbox" ? [] : ""
      });
    });
  },

  methods: {
    /**
     * setDescription()
     * setCategory()
     */
    ...mapMutations([
      forms.mutations.SET_DESCRIPTION,
      forms.mutations.SET_CATEGORY
    ]),
    getter(getter) {
      return this.$store.getters[getter];
    }
  },

  computed: {
    /**
     * questions()
     * description()
     * category()
     */
    ...mapGetters([
      forms.getters.QUESTIONS,
      forms.getters.DESCRIPTION,
      forms.getters.CATEGORY
    ]),

    fields() {
      return this.questions;
    },

    categoryList() {
      return this.getter(lists.getters.ITEMS)("categories");
    },
    _category: {
      get() {
        return this.category;
      },
      set(value) {
        this.setCategory(value);
      }
    }
  }
};
</script>
