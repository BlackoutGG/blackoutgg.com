<template>
  <main-layout>
    <v-parallax dark :src="defaultSrc" :class="parallaxClasses" :height="height">
      <v-row align="center" justify="center">
        <v-col class="text-center" cols="12">
          <h1 class="text-h2 font-weight-bold">{{ title }}</h1>
        </v-col>
      </v-row>
    </v-parallax>
    <v-main>
      <nuxt />
    </v-main>
  </main-layout>
</template>

<script>
import MainLayout from "./main.vue";
import { page } from "~/utilities/ns/page.js";
export default {
  name: "Parallax",
  components: { MainLayout },
  data() {
    return {
      defaultSrc:
        "https://www.blackout.team/wp-content/uploads/2020/01/banner-history.png",
      elevation: 5,
      height: 300
    };
  },

  // created() {
  //   if (!this.$vuetify.theme.dark) {
  //     this.$vuetify.theme.dark = true;
  //   }
  // },

  computed: {
    parallaxClasses() {
      return [`elevation-${this.elevation}`];
    },
    pageTitle() {
      return this.$store.getters[page.getters.TITLE];
    },
    title() {
      return this.pageTitle ? this.pageTitle : "Insert Title Here";
    }
  }
};
</script>