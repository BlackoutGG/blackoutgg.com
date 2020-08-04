<template>
  <v-container>
    <v-row>
      <v-col cols="12">
        <v-select
          :form="categoryList"
          :item-text="'name'"
          label="Category"
          :item-value="'id'"
          v-model="category"
        ></v-select>
      </v-col>
      <v-col cols="12">
        <v-textarea readonly v-model="description" outlined label="Description" counter></v-textarea>
      </v-col>
    </v-row>
    <v-row v-for="(question, idx) in questions" :key="idx">
      <v-col cols="12">
        <div class="text--subtitle-1 font-weight-medium">
          <span>Question {{ idx + 1 }}</span>
        </div>
        <p class="text--white">{{ question.value }}</p>
        <template v-if="!question.options.length">
          <v-text-field v-if="question.type === 'textfield'"></v-text-field>
          <v-textarea v-else></v-textarea>
        </template>
        <template v-else>
          <template v-if="question.type === 'multiple'">
            <v-radio-group v-model="radioGroup">
              <v-radio :label="option.value" v-for="(option, i) in question.options" :key="i"></v-radio>
            </v-radio-group>
          </template>
          <template v-else-if="question.type === 'checkbox'">
            <v-checkbox
              class="my-0 py-0"
              :value="option.value"
              :label="option.value"
              v-for="(option, i) in question.options"
              :key="i"
            ></v-checkbox>
          </template>
          <template v-else>
            <v-select :form="question.options" :item-text="'value'" :item-value="'value'"></v-select>
          </template>
        </template>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import { lists } from "~/utilities/ns/lists.js";
import { forms } from "~/utilities/ns/forms.js";

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
    getter(getter) {
      return this.$store.getters[getter];
    }
  },

  computed: {
    questions() {
      return this.form
        ? this.form.fields
        : this.getter(forms.getters.QUESTIONS);
    },
    description: {
      get() {
        return this.form
          ? this.form.description
          : this.getter(forms.getters.QUESTIONS);
      },
      set(value) {
        if (this.form) this.$emit("input", value);
        else this.$store.commit(forms.mutations.SET_DESCRIPTION, value);
      }
    },
    categoryList() {
      return this.getter(lists.getters.ITEMS)("categories");
    },
    category: {
      get() {
        return this.form
          ? this.form.category.id
          : this.getter(forms.getters.CATEGORY);
      },
      set(value) {
        if (this.form) this.$emit("input", value);
        else this.$store.commit(forms.mutations.SET_CATEGORY, value);
      }
    }
  }
};
</script>
