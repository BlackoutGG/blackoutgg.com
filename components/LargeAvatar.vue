<template>
  <div class="d-flex flex-column pa-3 align-center">
    <v-avatar :size="62" :color="'accent'">
      <img :src="$auth.user.avatar" alt v-if="$auth.user && $auth.user.avatar" />
      <span class="white--text headline">{{ avatar }}</span>
    </v-avatar>
    <span class="black--text headline">{{ username }}</span>
  </div>
</template>

<script>
export default {
  name: "LargeAvatar",
  computed: {
    username() {
      return this.$auth.user ? this.$auth.user.username : null;
    },
    initials() {
      if (this.username) {
        const initials = this.username.match(/\b\w/g) || [];
        return (
          (initials.shift() || "") + (initials.pop() || "")
        ).toUpperCase();
      }
    },
    avatar() {
      return this.$auth.user.avatar ? this.$auth.user.avatar : this.initials;
    }
  }
};
</script>