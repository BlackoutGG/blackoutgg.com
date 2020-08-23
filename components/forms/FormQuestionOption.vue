<template>
  <v-col cols="8">
    <v-text-field @focus="addOption" v-model="computedValue" :placeholder="label" :label="label">
      <template #append-outer>
        <slot />
      </template>
    </v-text-field>
  </v-col>
</template>

<script>
import forms from "~/utilities/ns/public/forms.js";
export default {
  name: "QuestionOptional",

  props: {
    parentIdx: Number,
    idx: Number,
    item: {
      type: String,
      required: true
    }
  },

  methods: {
    addOption() {
      if (!this.isLast) return;
      this.$store.commit(forms.mutations.ADD_OPTION, this.parentIdx);
    }
  },

  computed: {
    label() {
      return `Option ${this.idx + 1}`;
    },
    isLast() {
      const { parentIdx } = this;
      const list = this.$store.getters[forms.getters.QUESTIONS];
      const qs = list[parentIdx];
      return this.idx === qs.options.length - 1;
    },
    computedValue: {
      get() {
        return this.item;
      },
      set(value) {
        this.$store.commit(forms.mutations.CHANGE_OPTION_VALUE, {
          question: this.parentIdx,
          option: this.idx,
          value
        });
      }
    }
  }
};
</script>