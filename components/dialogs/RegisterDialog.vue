<template>
  <v-dialog v-model="show" max-width="600px">
    <v-card>
      <v-card-title class="headline">
        <span>Sign Up</span>
        <v-spacer></v-spacer>
        <v-btn text color="dark darken-1" rounded @click.stop.prevent="show = false">
          <v-icon>mdi-close</v-icon>
        </v-btn>
      </v-card-title>
      <v-card-text>
        <v-form v-model="valid">
          <v-container>
            <v-row>
              <v-col cols="12">
                <discord-button :label="'Register with Discord'"></discord-button>
                <divider></divider>
              </v-col>
              <v-col cols="12" v-for="(input, idx) in inputs" :key="idx">
                <v-text-field
                  :label="input.label"
                  filled
                  v-model="input.value"
                  :rules="input.rules"
                ></v-text-field>
              </v-col>
              <v-col cols="12">
                <vue-recaptcha
                  :loadRecaptchaScript="true"
                  :sitekey="siteKey"
                  :theme="'dark'"
                  @render="onRender"
                  @verify="onVerfiy"
                  @expired="resetRecaptcha"
                  @error="onError"
                ></vue-recaptcha>
              </v-col>
            </v-row>
          </v-container>
        </v-form>
      </v-card-text>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn text color="dark darken-1" :disabled="isDisabled">Submit</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
import Divider from "./Divider";
import DiscordButton from "./DiscordButton";
import VueRecaptcha from "vue-recaptcha";
import recaptcha from "~/mixins/recaptcha";
import { DIALOG } from "~/utilities/types";

const patterns = {
  email: /^([a-zA-Z0-9_\-\.]+)@([a-zA-Z0-9_\-\.]+)\.([a-zA-Z]{2,5})$/,
  username: /^([a-zA-Z0-9_])+?$/
};

export default {
  name: "RegisterDialog",
  mixins: [recaptcha],
  components: { Divider, DiscordButton, VueRecaptcha },

  data() {
    return {
      isSending: false,
      valid: false,
      inputs: [
        {
          label: "Email",
          value: "",
          rules: [
            v => !!v || "Email is required.",
            v => patterns.email.test(v) || "Email must be valid."
          ]
        },
        {
          label: "Username",
          value: "",
          rules: [
            v => !!v || "Username is required.",
            v =>
              patterns.username.test(v) ||
              "Username can only contain the following characters: a-z 0-9 _"
          ]
        },
        {
          label: "Password",
          value: "",
          rules: [
            v => !!v || "Password is required",
            v => v.length >= 8 || "Password must be longer than 8 characters.",
            v =>
              v.length <= 50 || "Password cannot be longer than 50 characters."
          ]
        },
        {
          label: "Confirm Password",
          value: "",
          rules: [
            v => !!v || "Password is required",
            v => v === this.inputs[2].value || "Passwords must match.",
            v => v.length >= 8 || "Password must be longer than 8 characters.",
            v =>
              v.length <= 50 || "Password cannot be longer than 50 characters."
          ]
        }
      ]
    };
  },
  methods: {
    toggleDialog(value) {
      this.$store.commit(DIALOG.mutations.TOGGLE, value);
    },
    reset() {
      this.inputs.forEach(input => (input.value = ""));
      this.resetRecaptcha();
    }
  },
  computed: {
    isDisabled() {
      return !this.valid || !this.gresponse;
    },
    show: {
      get() {
        return this.$store.getters[DIALOG.getters.SHOW]("register");
      },
      set(value) {
        if (!value) {
          return this.$store.commit(DIALOG.mutations.TOGGLE, "");
        }
        this.$store.commit(DIALOG.mutations.TOGGLE, value);
      }
    }
  }
};
</script>
