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
        <v-textarea readonly v-model="description" outlined label="Description"></v-textarea>
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
              <template v-for="(option, i) in question.options">
                <v-radio :label="option.value" :key="i" v-if="option.value"></v-radio>
              </template>
            </v-radio-group>
          </template>
          <template v-else-if="question.type === 'checkbox'">
            <template v-for="(option, i) in question.options">
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
            <v-select :items="question.options" :item-text="'value'" :item-value="'value'"></v-select>
          </template>
        </template>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import lists from "~/utilities/ns/public/lists.js";
import forms from "~/utilities/ns/public/forms.js";

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

  watch: {
    category(id) {
      this.$store.dispatch(forms.actions.GET_FORM, { key: "category", id });
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
          : this.getter(forms.getters.DESCRIPTION);
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
