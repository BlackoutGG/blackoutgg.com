<template>
  <v-list-item @click="$emit('update:type', item)">
    <v-list-item-title>{{title}}</v-list-item-title>
  </v-list-item>
</template>

<script>
export default {
  name: "CategoryTypeItem",
  props: {
    value: String,
    item: String
  },

  computed: {
    title() {
      return this.item.charAt(0).toUpperCase() + this.item.slice(1);
    }
  }
};
</script>