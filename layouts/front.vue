<template>
  <main-layout>
    <video-banner></video-banner>
    <v-main>
      <nuxt />
    </v-main>
  </main-layout>
</template>

<script>
import MainLayout from "./main.vue";
import VideoBanner from "~/components/frontpage/VideoBanner";
export default {
  name: "Front",
  components: { MainLayout, VideoBanner }
};
</script>