<template>
  <v-virtual-scroll :items="items" height="300" :item-height="50">
    <template v-slot="{ item }">
      <v-list-item>
        <v-list-item-avatar>
          <list-avatar :item="item" :size="56"></list-avatar>
        </v-list-item-avatar>
        <v-list-item-content>
          <v-list-item-title>{{ item.username }}</v-list-item-title>
        </v-list-item-content>
      </v-list-item>
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
    }
  },

  data() {
    return {
      start: 1,
      limit: 50,
      items: []
    };
  },

  async fetch() {
    this.items = this.fetchItems();
  },

  methods: {
    async update($state) {
      this.start++;
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
      const { start, limit } = this;
      try {
        const {
          data: { participants }
        } = await this.$axios.get(this.endpoint, { params: { start, limit } });

        return participants;
      } catch (err) {
        console.log(err);
      }
    }
  }
};
</script>
