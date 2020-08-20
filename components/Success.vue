<template>
  <v-card-text>
    <div class="text-center">
      <v-icon :size="size" v-text="icon"></v-icon>
      <h1 class="text-h2">Success</h1>
      <div class="py-2"></div>
      <v-btn @click="$emit('ok')">OK</v-btn>
    </div>
  </v-card-text>
</template>

<script>
export default {
  name: "SuccessIcon",

  props: {
    message: {
      type: String,
      default: ""
    }
  },

  data() {
    return {
      icon: "mdi-check-circle-outline",
      closeIcon: "mdi-close",
      size: 120
    };
  }
};
</script>