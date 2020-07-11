<template>
  <v-virtual-scroll :items="items" :height="height" :item-height="itemHeight">
    <template v-slot="{ item }">
      <slot :item="item" />
    </template>
    <infinite-loading @infinite="update"></infinite-loading>
  </v-virtual-scroll>
</template>

<script>
import InfiniteLoading from "vue-infinite-loading";
import ListAvatar from "~/components/ListAvatar.vue";
export default {
  name: "Scroller",

  components: { InfiniteLoading, ListAvatar },

  props: {
    endpoint: {
      type: String,
      default: "/api/events/participants"
    },
    height: {
      type: Number,
      default: 300
    },
    itemHeight: {
      type: Number,
      default: 50
    }
  },

  data() {
    return {
      page: 1,
      limit: 50,
      items: []
    };
  },

  async fetch() {
    const { results } = await this.fetchItems();
    this.items = results;
  },

  methods: {
    async update($state) {
      this.page++;
      try {
        const items = this.fetchItems();
        if (items && items.length) {
          this.items.push(...items);
          $state.loaded();
        } else {
          $state.completed();
        }
      } catch (err) {}
    },

    async fetchItems() {
      const { page, limit } = this;
      try {
        const {
          data: { roles }
        } = await this.$axios.get(this.endpoint, { params: { page, limit } });

        return roles;
      } catch (err) {
        console.log(err);
      }
    }
  }
};
</script>
