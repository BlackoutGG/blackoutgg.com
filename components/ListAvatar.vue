<template>
  <v-avatar :size="size" :color="color">
    <v-img :src="item.avatar" v-if="item.avatar"></v-img>
    <span class="white--text" v-else>
      {{ initials }}
    </span>
  </v-avatar>
</template>

<script>
export default {
  name: "ListAvatar",

  props: {
    item: {
      type: Object,
      required: true
    }
  },
  computed: {
    initials() {
      if (this.item.username) {
        const username = this.item.username;
        const initials = username.match(/\b\w/g) || [];
        return (
          (initials.shift() || "") + (initials.pop() || "")
        ).toUpperCase();
      }
    }
  }
};
</script>
