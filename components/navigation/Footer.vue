<template>
  <v-footer :color="color">
    <v-container>
      <v-row>
        <v-col cols="12" class="text-center">
          <img src="https://blackout-gaming.s3.amazonaws.com/Images/assets/280w_80h_sm.png" />
          <p>Blackout Gaming is a collective of like minded players that primarily play and enjoy the PvP (player vs. player) content of video games.</p>
          <p>Our objective is both to excel at whatever game we play and provide content in the form of entertainment and valuable information to the masses.</p>
        </v-col>
        <v-col cols="12" class="text-center">
          <v-btn text v-for="link in links" :key="link.title" :to="link.to">{{link.title}}</v-btn>
        </v-col>
        <v-col cols="12" class="text-center">
          <v-row>
            <v-col cols="6">Privacy Policy</v-col>
            <v-col cols="6">
              <v-btn icon v-for="(social, idx) in socials" :key="idx">
                <v-icon>{{social.icon}}</v-icon>
              </v-btn>
            </v-col>
          </v-row>
        </v-col>
      </v-row>
    </v-container>
  </v-footer>
</template>

<script>
import menu from "~/utilities/ns/public/menu";
export default {
  name: "SiteFooter",

  data() {
    return {
      color: "#1E1E1E",
      socials: [
        { icon: "mdi-twitter", to: "https://twitter.com/TeamBKO" },
        { icon: "mdi-twitch", to: "https://twitch.tv/TeamBKO" },
        { icon: "mdi-instagram", to: "https://instagram.com/TeamBKO" },
        { icon: "mdi-discord", to: "https://instagram.com/TeamBKO" }
      ]
    };
  },

  computed: {
    links() {
      return this.$store.getters[menu.getters.LINKS];
    }
  }
};
</script>

<style lang="scss">
.footer-links li {
  list-style-type: none;
  a {
    text-decoration: none;
    color: #fff;
  }
}
</style>