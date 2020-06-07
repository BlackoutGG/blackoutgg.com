<template>
  <v-avatar color="primary">
    <img :src="item.avatar" alt v-if="item.avatar" />
    <span class="white--text headline" v-else>{{initials}}</span>
  </v-avatar>
</template>

<script>
export default {
  name: "UserTableAvatar",
  props: {
    item: {
      type: [Object, String]
    }
  },

  created() {},

  computed: {
    initials() {
      const initials = this.item.username.match(/\b\w/g) || [];

      return ((initials.shift() || "") + (initials.pop() || "")).toUpperCase();
    }
  }
};
</script>