<template>
  <div class="d-flex justify-center">
    <v-btn :color="color" large @click="oauth2">
      <v-icon>mdi-discord</v-icon>
      <span class="pl-2">{{label}}</span>
    </v-btn>
  </div>
</template>

<script>
import reduce from "lodash/reduce";
export default {
  name: "DiscordButton",

  props: {
    label: {
      type: String,
      default: "Login with Discord"
    }
  },

  data() {
    return {
      name: "authorize",
      color: "#7289da",
      specs: {
        width: "600px",
        directories: false,
        menubar: false,
        resizable: false
      }
    };
  },

  methods: {
    async authorize() {
      try {
        const { data } = await this.$http.get("/auth/discord/state");

        const uri = process.env.VUE_APP_DISCORD_URI + `&state=${data}`;

        const specs = reduce(
          this.specs,
          (str, value, key) => {
            value = typeof value === "boolean" ? (value ? "yes" : "no") : value;
            str = str.concat(`${key}=${value},`);
            return str;
          },
          ""
        );

        const popup = window.open(uri, this.name, specs);

        if (window.focus) popup.focus();
      } catch (err) {
        console.log(err);
      }
    },

    async oauth2() {
      try {
        const { data } = await this.$http.get("/auth/discord/state");

        this.$auth.oauth2("discord", {
          params: {
            state: {
              key: data
            }
          }
        });
      } catch (err) {}
    }
  }
};
</script>
