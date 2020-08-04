<template>
  <v-main>
    <video-banner />
    <v-container dark id="home" class="pa-0" fluid>
      <div v-for="(block, idx) in blocks" :key="idx + 1">
        <div class="py-12"></div>
        <info-block :idx="idx" :data="block" />
        <div class="py-12" v-if="idx === blocks.length - 1"></div>
      </div>
    </v-container>
  </v-main>
</template>

<script>
import InfoBlock from "~/components/frontpage/InfoBlock.vue";
import VideoBanner from "~/components/frontpage/VideoBanner.vue";
export default {
  name: "Home",
  layout: "default",

  components: { InfoBlock, VideoBanner },
  data() {
    return {
      blocks: [
        {
          title: "ABOUT US",
          text: `We are a group of hardcore PvPers that were at one point all enemies but have come together as one efficient and disciplined group.
            howsOur goal is to let our skill and coordination show through our victories on the battlefield.`,
          image: {
            src:
              "https://blackout-gaming.s3.amazonaws.com/Images/webx/bko-black.webp",
            widthInPx: 700,
            heightInPx: 363
          }
        },
        {
          title: "GAMES WE PLAY",
          text: `Our primary focus is to be one of the top PvP Companies in Amazon Game Studio’s New World, 
          but we can also be found playing other PvP games such as Sea of Thieves, Ark, Rust, and Squad.`,
          image: {
            src:
              "https://blackout-gaming.s3.amazonaws.com/Images/webx/bko-black.webp",
            widthInPx: 700,
            heightInPx: 363
          }
        },
        {
          title: "OUR CONTENT",
          text: `We are in the process of building up our Twitch and Youtube channels to bring you videos and tutorials. Stay tuned for more information!`,
          image: {
            src:
              "https://blackout-gaming.s3.amazonaws.com/Images/webx/bko-black.webp",
            widthInPx: 700,
            heightInPx: 363
          }
        }
      ]
    };
  }
};
</script>
