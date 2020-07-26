<template>
  <v-tab-item eager>
    <v-card-text>
      <v-form v-model="valid" ref="signUpForm">
        <v-container>
          <v-row>
            <v-col cols="12">
              <discord-button :label="'Register with Discord'"></discord-button>
              <divider></divider>
            </v-col>
            <v-col cols="12" v-for="(input, key) in inputs" :key="key">
              <v-text-field
                v-if="input.type === 'password'"
                filled
                v-model="input.value"
                @click:append="input.show = !input.show"
                :append-icon="input.show ? 'mdi-eye' : 'mdi-eye-off'"
                :label="input.label"
                :type="input.show ? 'text' : input.type"
                :rules="input.rules"
              ></v-text-field>
              <v-text-field
                v-else
                :label="input.label"
                filled
                v-model="input.value"
                :type="input.type"
                :rules="input.rules"
              ></v-text-field>
            </v-col>
            <v-col cols="12">
              <vue-recaptcha
                :loadRecaptchaScript="true"
                :sitekey="siteKey"
                :theme="'dark'"
                ref="recaptcha"
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
  </v-tab-item>
</template>

<script>
const pattern = /^([a-zA-Z0-9_\-\.]+)@([a-zA-Z0-9_\-\.]+)\.([a-zA-Z]{2,5})$/;

import Divider from "./Divider.vue";
import isAlphanumeric from "~/utilities/isAlphanumeric.js";
import DiscordButton from "~/components/dialogs/DiscordButton.vue";
import VueRecaptcha from "vue-recaptcha";
import recaptcha from "~/mixins/recaptcha.js";
import { snackbar } from "~/utilities/ns/snackbar.js";
export default {
  name: "SignUpForm",
  components: { Divider, DiscordButton, VueRecaptcha },

  mixins: [recaptcha],

  mounted() {
    console.log(this.$refs);
  },

  data() {
    return {
      isSending: false,
      valid: false,

      inputs: {
        email: {
          label: "Email",
          value: "",
          type: "text",
          rules: [
            v => !!v || "Email is required.",
            v => (v && pattern.test(v)) || "Email must be valid."
          ]
        },
        username: {
          label: "Username",
          value: "",
          type: "text",
          rules: [
            v => !!v || "Username is required.",
            v =>
              (v && isAlphanumeric(v)) ||
              "Username can only contain the following characters: a-z 0-9 _"
          ]
        },
        password: {
          label: "Password",
          type: "password",
          show: false,
          value: "",
          rules: [
            v => !!v || "Password is required",
            v =>
              (v && v.length >= 8) ||
              "Password must be longer than 8 characters.",
            v =>
              (v && v.length <= 50) ||
              "Password cannot be longer than 50 characters."
          ]
        },
        confirm: {
          label: "Confirm Password",
          type: "password",
          show: false,
          value: "",
          rules: [
            v => !!v || "Password is required",
            v =>
              (v && v === this.inputs.password.value) ||
              "Passwords must match.",
            v =>
              (v && v.length >= 8) ||
              "Password must be longer than 8 characters.",
            v =>
              (v && v.length <= 50) ||
              "Password cannot be longer than 50 characters."
          ]
        }
      }
    };
  },

  methods: {
    reset() {
      this.$refs.signUpForm.resetValidation();
      this.$refs.signUpForm.reset();
      this.$refs.recaptcha.reset();
      this.recaptcha = null;
    },

    async signUp() {
      const { confirm, ...data } = Object.entries(this.inputs).reduce(
        (obj, [key, item]) => {
          obj[key] = item.value;
          return obj;
        },
        {}
      );
      try {
        const {
          data: { user }
        } = await this.$axios.post("/users", data);

        this.reset();

        const text = `Thank you, ${user.username} an email has been dispatched to ${user.email}.`;

        this.$store.dispatch(snackbar.actions.TOGGLE_BAR, { text });
      } catch (err) {}
    }
  },

  computed: {
    isDisabled() {
      return !this.valid || !this.gresponse;
    }
  }
};
</script>