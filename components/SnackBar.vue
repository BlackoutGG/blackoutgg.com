<template>
  <v-snackbar
    v-model="showBar"
    :top="options.top"
    :bottom="options.bottom"
    :left="options.left"
    :right="options.right"
    :color="options.color"
    :multi-line="options.multiLine"
    :vertical="options.vertical"
  >
    <span>{{ text }}</span>
    <v-btn text dark @click="showBar = false">CLOSE</v-btn>
  </v-snackbar>
</template>

<script>
import snackbar from "~/utilities/ns/public/snackbar.js";
export default {
  name: "snackbar",
  computed: {
    showBar: {
      get() {
        return this.$store.getters[snackbar.getters.DISPLAY];
      },
      set(value) {
        this.$store.dispatch(snackbar.actions.TOGGLE_BAR, value);
      }
    },
    text() {
      return this.$store.getters[snackbar.getters.TEXT];
    },
    options() {
      const _options = this.$store.getters[snackbar.getters.OPTIONS];
      return {
        color: _options.color ? _options.color : "#000",
        multiLine: _options.mode === "multi-line",
        vertical: _options.mode === "vertical",
        left: _options.x === "left",
        right: _options.x === "right",
        top: _options.y === "top",
        bottom: _options.y === "bottom",
        timeout: _options.timeout
      };
    }
  }
};
</script>
