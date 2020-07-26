<template>
  <v-container>
    <v-row>
      <v-col cols="12" md="12" sm="12">
        <v-select :items="categoryList" :item-text="'name'" label="Category" :item-value="'id'"></v-select>
      </v-col>
      <v-col cols="12" md="12" sm="12">
        <v-textarea readonly v-model="questions.description" outlined label="Description" counter></v-textarea>
      </v-col>
    </v-row>
    <v-row v-for="(question, idx) in questions" :key="idx">
      <v-col md="12" sm="12">
        <div class="text--subtitle-1 font-weight-medium">
          <span>Question {{idx+1}}</span>
        </div>
        <p class="text--white">{{question.value}}</p>
        <template v-if="!question.options.length">
          <field :type="question.type" />
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
            <v-select :items="question.options" :item-text="'value'" :item-value="'value'"></v-select>
          </template>
        </template>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import Field from "./Field.vue";
import { forms } from "~/utilities/ns/forms.js";
import { lists as categories } from "~/utilities/ns/lists.js";
export default {
  name: "FormPreview",

  components: { Field },

  data() {
    return {
      radioGroup: ""
    };
  },

  computed: {
    questions() {
      return this.$store.getters[forms.getters.QUESTIONS];
    },
    description() {
      return this.$store.getters[forms.getters.DESCRIPTION];
    },
    categoryList() {
      return this.$store.getters[categories.getters.ITEMS]("categories");
    }
  }
};
</script>