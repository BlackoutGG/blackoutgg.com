<template>
  <v-switch v-model="computedValue"></v-switch>
</template>

<script>
export default {
  name: "EventSwitch",
  props: {
    value: {
      type: Boolean,
      default: false
    }
  },

  data() {
    return {
      innerValue: this.value
    };
  },

  watch: {
    value(v) {
      if (v !== this.innerValue) {
        this.innerValue = v;
      }
    }
  },

  computed: {
    computedValue: {
      get() {
        return this.innerValue;
      },
      set(val) {
        this.$emit("change", val);
        this.$emit("input", val);
      }
    }
  }
};
</script>