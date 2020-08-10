<template>
  <v-app dark>
    <v-container fill-height>
      <v-row align="center" justify="center">
        <v-sheet class="px-5 text-center elevation-1" rounded>
          <template v-if="error.statusCode === 404">
            <v-icon :size="size" v-text="icon"></v-icon>
            <h1>{{ pageNotFound }}</h1>
            <p>The requested page could not be found.</p>
          </template>
          <template v-else>
            <v-icon :size="size" v-text="icon"></v-icon>
            <h1>{{ otherError }}</h1>
          </template>
        </v-sheet>
      </v-row>
    </v-container>
  </v-app>
</template>

<script>
export default {
  layout: "empty",
  props: {
    error: {
      type: Object,
      default: null
    }
  },
  data() {
    return {
      size: 200,
      pageNotFound: "404 Not Found",
      otherError: "An error occurred"
    };
  },
  head() {
    const title =
      this.error.statusCode === 404 ? this.pageNotFound : this.otherError;
    return {
      title
    };
  },
  computed: {
    icon() {
      return this.error.statusCode === 404
        ? "mdi-help-circle-outline"
        : "mdi-alert-circle-outline";
    }
  }
};
</script>

<style scoped>
h1 {
  font-size: 20px;
}
</style>
