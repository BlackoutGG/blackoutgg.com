<template>
  <v-virtual-scroll :items="items" :height="height" :item-height="itemHeight">
    <template v-slot="{ item }">
      <slot :item="item" />
    </template>
    <infinite-loading @infinite="(state) => $emit('update', state)"></infinite-loading>
  </v-virtual-scroll>
</template>

<script>
import InfiniteLoading from "vue-infinite-loading";
export default {
  name: "Scroller",

  components: { InfiniteLoading },

  props: {
    height: {
      type: Number,
      default: 300
    },
    itemHeight: {
      type: Number,
      default: 50
    },
    items: {
      type: Array,
      required: true,
      default: () => []
    }
  }
};
</script>
