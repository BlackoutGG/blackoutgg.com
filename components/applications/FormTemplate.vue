<template>
  <v-form v-model="isValid" ref="form">
    <v-container>
      <v-row>
        <v-col cols="12" md="12" sm="12">
          <v-select :items="categoryList" :item-text="'name'" label="Category" :item-value="'id'"></v-select>
        </v-col>
        <v-col cols="12" md="12" sm="12">
          <v-text-field v-model="name" label="Name"></v-text-field>
        </v-col>
        <v-col cols="12" md="12" sm="12">
          <v-textarea v-model="description" outlined label="Description" counter></v-textarea>
        </v-col>
      </v-row>
      <question
        v-for="(question, idx) in questions"
        :key="idx"
        :num="idx + 1"
        :question="question"
      />
      <v-row>
        <v-col cols="12">
          <add-question @click.native="addQuestion"></add-question>
        </v-col>
      </v-row>
    </v-container>
  </v-form>
</template>

<script>
import { lists as categories } from "~/utilities/ns/lists.js";
import { forms } from "~/utilities/ns/forms.js";
import Question from "./Question.vue";
import AddQuestion from "./AddQuestion.vue";
export default {
  name: "FormDialog",

  components: { AddQuestion, Question },

  data() {
    return {
      valid: false,
      open: false
    };
  },

  methods: {
    addQuestion() {
      this.$store.commit(forms.mutations.ADD_QUESTION);
    }
  },

  computed: {
    categoryList() {
      return this.$store.getters[categories.getters.ITEMS]("categories");
    },
    questions() {
      return this.$store.getters[forms.getters.QUESTIONS];
    },
    name: {
      get() {
        return this.$store.getters[forms.getters.NAME];
      },
      set(value) {
        this.$store.commit(forms.mutations.SET_NAME, value);
      }
    },
    description: {
      get() {
        return this.$store.getters[forms.getters.DESCRIPTION];
      },
      set(value) {
        this.$store.commit(forms.mutations.SET_DESCRIPTION, value);
      }
    },
    isValid: {
      get() {
        return this.valid;
      },
      set(value) {
        this.valid = value;
        this.$emit("input", value);
      }
    }
  }
};
</script>