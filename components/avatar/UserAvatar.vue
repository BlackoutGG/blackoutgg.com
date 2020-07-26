<template>
  <div class="d-flex flex-column pa-3 align-center">
    <v-avatar :size="size" :color="color">
      <img
        :src="$auth.user.avatar"
        alt
        v-if="$auth.user && $auth.user.avatar"
      />
      <span class="white--text headline" v-else>{{ initials }}</span>
    </v-avatar>
    <span class="black--text headline">{{ username }}</span>
  </div>
</template>

<script>
import avatar from "~/mixins/avatar.js";
export default {
  name: "LargeAvatar",
  props: {
    size: {
      type: Number,
      default: 62
    },
    color: {
      type: String,
      default: "primary"
    }
  },
  mixins: [avatar]
};
</script>
