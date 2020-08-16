<template>
  <v-container>
    <v-row>
      <v-col cols="12">
        <v-select
          :form="categoryList"
          :item-text="'name'"
          label="Category"
          :item-value="'id'"
          v-model="_category"
        ></v-select>
      </v-col>
      <v-col cols="12">
        <v-textarea readonly v-model="_description" outlined label="Description"></v-textarea>
      </v-col>
    </v-row>
    <v-row v-for="(field, idx) in fields" :key="idx">
      <v-col cols="12">
        <div class="text--subtitle-1 font-weight-medium">
          <span>Question {{ idx + 1 }}</span>
        </div>
        <p class="text--white">{{ field.value }}</p>
        <template v-if="!field.options">
          <v-text-field v-if="field.type === 'textfield'"></v-text-field>
          <v-textarea v-else></v-textarea>
        </template>
        <template v-else>
          <template v-if="field.type === 'multiple'">
            <v-radio-group v-model="radioGroup">
              <template v-for="(option, i) in field.options">
                <v-radio :label="option.value" :key="i" v-if="option.value"></v-radio>
              </template>
            </v-radio-group>
          </template>
          <template v-else-if="field.type === 'checkbox'">
            <template v-for="(option, i) in field.options">
              <v-checkbox
                class="my-0 py-0"
                :value="option.value"
                :label="option.value"
                :key="i"
                v-if="option.value"
              ></v-checkbox>
            </template>
          </template>
          <template v-else>
            <v-select :items="field.options" :item-text="'value'" :item-value="'value'"></v-select>
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
  name: "FormPreview",

  props: {
    form: {
      type: [Array, Object]
    }
  },

  data() {
    return {
      radioGroup: ""
    };
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
      return this.form ? this.form.fields : this.questions;
    },
    _description: {
      get() {
        return this.form ? this.form.description : this.description;
      },
      set(value) {
        if (this.form) this.$emit("input", value);
        else this.setDescription(value);
      }
    },
    categoryList() {
      return this.getter(lists.getters.ITEMS)("categories");
    },
    _category: {
      get() {
        return this.form ? this.form.category.id : this.category;
      },
      set(value) {
        if (this.form) this.$emit("input", value);
        else this.setCategory(value);
      }
    }
  }
};
</script>
