<template>
  <v-menu
    v-model="open"
    ref="menu"
    :close-on-content-click="false"
    transition="scale-transition"
    offset-y
    min-width="290px"
    max-width="290px"
  >
    <template #activator="{ on, attrs }">
      <v-btn text v-on="on" v-bind="attrs">
        <small v-if="label">{{label}}:</small>
        <v-icon :color="color.hex" right>mdi-checkbox-blank-circle</v-icon>
      </v-btn>
    </template>
    <v-color-picker v-model="color" @click="$refs.menu.save(color)"></v-color-picker>
  </v-menu>
</template>

<script>
export default {
  name: "EventColorPicker",

  props: {
    value: {
      type: [String, Object]
    },
    label: {
      type: String,
      default: "Event Color"
    }
  },

  data() {
    return {
      open: false,
      innerValue: {}
    };
  },

  computed: {
    color: {
      get() {
        return this.innerValue;
      },
      set(val) {
        console.log(val);
        this.innerValue = val;
        this.$emit("input", val.hex);
      }
    }
  }
};
</script>