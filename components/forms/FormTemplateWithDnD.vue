<template>
  <v-form v-model="isValid" ref="form">
    <v-container>
      <v-row>
        <v-col cols="12" md="12" sm="12">
          <v-select
            :items="categoryList"
            :item-text="'name'"
            label="Category"
            :item-value="'id'"
            v-model="category"
          ></v-select>
        </v-col>
        <v-col cols="12" md="12" sm="12">
          <v-text-field v-model="name" label="Name"></v-text-field>
        </v-col>
        <v-col cols="12" md="12" sm="12">
          <v-textarea v-model="description" outlined label="Description" counter></v-textarea>
        </v-col>
      </v-row>
      <draggable
        v-model="questions"
        handle=".handle"
        group="fields"
        @start="drag = true"
        @end="onDragEnd"
      >
        <question
          v-for="(question, idx) in questions"
          :key="idx"
          :num="idx + 1"
          :question="question"
          :isDrag="drag"
        />
      </draggable>
      <v-row>
        <v-col cols="12">
          <add-question @click.native="addQuestion"></add-question>
        </v-col>
      </v-row>
    </v-container>
  </v-form>
</template>

<script>
import lists from "~/utilities/ns/public/lists.js";
import forms from "~/utilities/ns/public/forms.js";
import Question from "./FormQuestion.vue";
import AddQuestion from "./FormQuestionButton.vue";
import draggable from "vuedraggable";
export default {
  name: "FormTemplate",

  components: { AddQuestion, Question, draggable },

  data() {
    return {
      valid: false,
      open: false,
      drag: false
    };
  },

  methods: {
    addQuestion() {
      this.$store.commit(forms.mutations.ADD_QUESTION);
    },
    onDragEnd() {
      this.$nextTick(() => setTimeout(() => (this.drag = false)), 10);
    }
  },

  computed: {
    categoryList() {
      return this.$store.getters[lists.getters.ITEMS]("categories");
    },

    questions: {
      get() {
        return this.$store.getters[forms.getters.QUESTIONS];
      },
      set(value) {
        this.$store.commit(forms.mutations.SET_FIELDS, value);
      }
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

    category: {
      get() {
        return this.$store.getters[forms.getters.CATEGORY];
      },
      set(value) {
        this.$store.commit(forms.mutations.SET_CATEGORY, value);
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