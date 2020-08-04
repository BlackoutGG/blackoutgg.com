<template>
  <v-list-item @click="onClick">
    <v-list-item-title>
      <slot></slot>
    </v-list-item-title>
  </v-list-item>
</template>

<script>
export default {
  name: "EventListItem",
  props: {
    value: String,
    item: [String, Object, Array]
  },

  methods: {
    onClick() {
      console.log(this.text);
      this.$emit("input", this.text);
    }
  },

  computed: {
    text() {
      return this.$slots.default[0].text;
    },
    title() {
      return this.text.charAt(0).toUpperCase() + this.text.slice(1);
    }
  }
};
</script>