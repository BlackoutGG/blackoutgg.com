<template>
  <v-card>
    <v-card-text>
      <div class="text-center">
        <v-icon :size="120" :v-text="largeIcon"></v-icon>
        <v-btn icon absolute top right>
          <v-icon :v-text="closeIcon"></v-icon>
        </v-btn>
      </div>
    </v-card-text>
  </v-card>
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
      largeIcon: "mdi-check-circle-outline",
      closeIcon: "mdi-close"
    };
  }
};
</script>