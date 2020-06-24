<template>
  <div class="d-flex flex-column pa-3 align-center">
    <v-avatar :size="62" :color="'accent'">
      <img :src="$auth.user.avatar" alt v-if="$auth.user && $auth.user.avatar" />
      <span class="white--text headline" v-else>{{ initials }}</span>
    </v-avatar>
    <span class="black--text headline">{{ username }}</span>
  </div>
</template>

<script>
import avatar from "~/mixins/avatar.js";
export default {
  name: "LargeAvatar",
  mixins: [avatar]
};
</script>