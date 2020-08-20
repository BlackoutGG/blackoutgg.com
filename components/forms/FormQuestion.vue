<template>
  <v-row class="pb-4">
    <v-col md="12" sm="12">
      <div class="text--subtitle-1">
        <span>Question {{num}}</span>
      </div>
      <div class="d-flex align-center">
        <div class="flex-grow-1 pr-5">
          <v-text-field v-model="computedValue" :label="label" :placeholder="label">
            <template #prepend>
              <v-icon class="draggable" small>{{icon}}</v-icon>
            </template>
          </v-text-field>
        </div>
        <select-menu small outlined :medium="false" v-model="type" :items="types"></select-menu>
        <v-btn icon @click="removeQuestion(index)">
          <v-icon>mdi-close</v-icon>
        </v-btn>
      </div>
      <v-switch label="Optional" v-model="optional"></v-switch>
      <v-row class="pl-12" v-if="question.options && question.options.length">
        <question-option
          v-for="(option, i) in question.options"
          :item="option"
          :idx="i"
          :key="i"
          :parentIdx="index"
        >
          <template #default>
            <v-btn
              icon
              x-small
              @click.native.stop="_removeOption(i)"
              v-if="question.options.length > 1"
            >
              <v-icon>mdi-close</v-icon>
            </v-btn>
          </template>
        </question-option>
      </v-row>
    </v-col>
  </v-row>
</template>

<script>
import { createNamespacedHelpers } from "vuex";

import SelectMenu from "./SelectMenu.vue";
import QuestionOption from "./FormQuestionOption.vue";
import forms from "~/utilities/ns/private/forms.js";
import isAlphanumeric from "~/utilities/isAlphanumeric.js";
import isEqual from "lodash/isEqual";

const { mapGetters, mapMutations } = createNamespacedHelpers("forms");

export default {
  name: "Question",

  components: {
    SelectMenu,
    QuestionOption
  },

  props: {
    question: {
      type: Object,
      required: true
    },
    num: {
      type: Number
    }
  },

  data() {
    return {
      icon: "mdi-menu",
      optionCache: [],
      isRequired: v => (v.length && isAlphanumeric(v)) || "Field is required.",
      types: [
        { icon: "mdi-form-textbox", type: "textfield", name: "Short answer" },
        { icon: "mdi-form-textarea", type: "textarea", name: "Long answer" },
        {
          icon: "mdi-radiobox-marked",
          type: "multiple",
          options: true,
          name: "Multiple choice"
        },
        {
          icon: "mdi-form-select",
          type: "select",
          options: true,
          name: "Select one"
        },
        {
          icon: "mdi-checkbox-marked",
          type: "checkbox",
          options: true,
          name: "Checkboxes"
        }
      ]
    };
  },

  watch: {
    options(newValue, oldValue) {
      if (
        !Array.isArray(newValue) &&
        Array.isArray(oldValue) &&
        oldValue.length
      ) {
        this.optionCache = oldValue;
      }
    },
    type(v) {
      if (this.hasOptions) {
        if (!this.question.options || !this.question.options.length) {
          if (!this.optionCache.length) {
            this.setOptions({ idx: this.index, value: [] });
            this.addOption(this.index);
          } else {
            this.setOptions({ idx: this.index, value: this.optionCache });
          }
        }
      } else {
        this.setOptions({ idx: this.index, value: null });
      }
    }
  },

  methods: {
    /**
     * addOption()
     * clearOptions()
     * changeQuestionType()
     * changeQuestionValue()
     * toggleOptional()
     * removeQuestion()
     * removeOption()
     */
    ...mapMutations([
      forms.mutations.ADD_OPTION,
      forms.mutations.SET_OPTIONS,
      forms.mutations.CLEAR_OPTIONS,
      forms.mutations.CHANGE_QUESTION_TYPE,
      forms.mutations.CHANGE_QUESTION_VALUE,
      forms.mutations.TOGGLE_OPTIONAL,
      forms.mutations.REMOVE_QUESTION,
      forms.mutations.REMOVE_OPTION
    ]),

    _removeOption(i) {
      this.removeOption({ question: this.index, option: i });
    }
  },

  computed: {
    label() {
      return `Question ${this.num}`;
    },
    index() {
      return this.num - 1;
    },
    hasOptions() {
      return this.types.some(item => item.type === this.type && item.options);
    },
    options() {
      return this.question.options;
    },
    type: {
      get() {
        return this.question.type;
      },
      set(value) {
        this.changeQuestionType({
          idx: this.index,
          type: value
        });
      }
    },
    computedValue: {
      get() {
        return this.question.value;
      },
      set(value) {
        this.changeQuestionValue({
          idx: this.index,
          value
        });
      }
    },
    optional: {
      get() {
        return this.question.optional;
      },
      set(bool) {
        this.toggleOptional({
          idx: this.index,
          bool
        });
      }
    }
  }
};
</script>