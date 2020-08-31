<template>
  <v-card>
    <slot />
    <v-card-text>
      <v-list :subheader="false">
        <slot name="subheader" />
        <list-item v-for="(item, idx) in items" :key="idx" :item="item" :name="name"></list-item>
      </v-list>
    </v-card-text>
    <slot name="footer" />
  </v-card>
</template>

<script>
import ListItem from "./TableFilterOptionListItem";
export default {
  name: "TableFilterOptionList",

  components: { ListItem },

  props: {
    items: {
      type: [Array, Object],
      default: () => []
    },
    name: {
      type: String
    }
  }
};
</script>