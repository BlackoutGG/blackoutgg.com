<template>
  <v-text-field
    v-model="computedValue"
    filled
    :error-messages="errorMessages"
    :label="label"
    v-if="async"
  ></v-text-field>
  <v-text-field
    v-model="computedValue"
    filled
    :rules="rules"
    :label="label"
    v-else-if="rules.length"
  ></v-text-field>
  <v-text-field
    v-else-if="type === 'password'"
    filled
    v-model="computedValue"
    @click:append="showPassword = !showPassword"
    :append-icon="showPassword ? 'mdi-eye' : 'mdi-eye-off'"
    :label="input.label"
    :type="showPassword ? 'text' : 'password'"
    :rules="rules"
  ></v-text-field>
  <v-text-field v-model="computedValue" filled :label="label" v-else></v-text-field>
</template>

<script>
import debounce from "lodash/debounce";
export default {
  name: "CreateUserDialogInput",
  props: {
    value: {
      type: [String, Number],
      default: ""
    },
    async: {
      type: Boolean,
      default: false
    },
    label: {
      type: String
    },
    rules: {
      type: Array,
      default: () => []
    },
    type: {
      type: String,
      default: "input"
    },
    delay: {
      type: Number,
      default: 500
    }
  },

  data() {
    return {
      innerValue: this.value,
      originalValue: this.value,
      inputCheck: null,
      errorMessages: [],
      showPassword: false
    };
  },

  watch: {
    innerValue(v) {
      if (this.async) {
        if (v) {
          if (v === this.originalValue) {
            this.errorMessage = [];
            return;
          }
          this.inputCheck(v);
        }
      }
    }
  },

  created() {
    this.inputCheck = debounce(async v => {
      const params = { value: v };
      try {
        const result = await this.$axios.get(
          `/api/users/validate/${this.normalizedLabel}`,
          { params }
        );
        this.errorMessages = [];
      } catch (err) {
        this.errorMessages = err.response.data[0].msg
          ? err.response.data[0].msg
          : err.response.data;
      }
    }, this.delay);
  },

  computed: {
    normalizedLabel() {
      return this.label.toLowerCase();
    },
    computedValue: {
      get() {
        return this.innerValue;
      },
      set(value) {
        this.innerValue = value;
        this.$emit("input", value);
      }
    }
  }
};
</script>