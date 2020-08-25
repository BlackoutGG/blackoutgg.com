<template>
  <v-tab-item eager>
    <v-card-text>
      <v-form v-model="valid" ref="form">
        <v-container>
          <v-row>
            <v-col cols="12">
              <discord-button></discord-button>
              <divider></divider>
            </v-col>
            <v-col cols="12" v-for="(input, idx) in inputs" :key="idx">
              <v-text-field
                v-if="input.type === 'password'"
                filled
                v-model="input.value"
                @click:append="showPassword = !showPassword"
                :append-icon="showPassword ? 'mdi-eye' : 'mdi-eye-off'"
                :label="input.label"
                :type="showPassword ? 'text' : input.type"
                :rules="input.rules"
              ></v-text-field>
              <v-text-field
                v-else
                filled
                v-model="input.value"
                :label="input.label"
                :type="input.type"
                :rules="input.rules"
              ></v-text-field>
            </v-col>
            <v-col cols="12" class="py-0">
              <v-checkbox v-model="rememberMe" :label="'Remember Me'"></v-checkbox>
            </v-col>
            <v-col cols="12">
              <no-ssr>
                <vue-recaptcha
                  ref="recaptcha"
                  :sitekey="siteKey"
                  :theme="'dark'"
                  @render="onRender"
                  @verify="onVerfiy"
                  @expired="resetRecaptcha"
                  @error="onError"
                ></vue-recaptcha>
              </no-ssr>
            </v-col>
          </v-row>
        </v-container>
      </v-form>
    </v-card-text>
    <v-card-actions>
      <v-spacer></v-spacer>
      <v-btn text color="dark darken-1" :disabled="isDisabled" @click.prevent="signIn">Submit</v-btn>
      <v-btn text color="dark darken-1" @click="reset">Reset</v-btn>
    </v-card-actions>
    <v-overlay absolute v-model="isSending">
      <v-progress-circular indeterminate size="64"></v-progress-circular>
    </v-overlay>
  </v-tab-item>
</template>

<script>
const pattern = /^([a-zA-Z0-9_\-\.]+)@([a-zA-Z0-9_\-\.]+)\.([a-zA-Z]{2,5})$/;

import VueRecaptcha from "vue-recaptcha";
import Divider from "./Divider.vue";
import DiscordButton from "~/components/dialogs/DiscordButton";
import recaptcha from "~/mixins/recaptcha.js";
import snackbar from "~/utilities/ns/public/snackbar.js";

export default {
  name: "SigninForm",

  mixins: [recaptcha],

  components: { Divider, DiscordButton, VueRecaptcha },

  beforeDestroy() {
    if (window && window.grecaptcha) {
      window.grecaptcha.reset(this.recaptchaId);
    }
  },

  data() {
    return {
      recaptchaId: null,

      valid: false,
      isSending: false,
      showPassword: false,
      rememberMe: false,
      inputs: [
        {
          label: "Email",
          value: "",
          type: "text",

          rules: [
            v => !!v || "Email is required.",
            v => (v && pattern.test(v)) || "Email must be valid."
          ]
        },
        {
          label: "Password",
          value: "",
          type: "password",

          rules: [
            v => !!v || "Password is required",
            v =>
              (v && v.length > 8) ||
              "Password must be longer than 8 characters.",
            v =>
              (v && v.length <= 50) ||
              "Password cannot be longer than 50 characters."
          ]
        }
      ]
    };
  },

  methods: {
    reset() {
      this.$refs.form.reset();
      this.$refs.recaptcha.reset();
      this.recaptcha = null;
    },

    onRender(id) {
      this.recaptchaId = id;
    },

    setSnackbar(text, options = null) {
      this.$store.dispatch(snackbar.actions.TOGGLE_BAR, { text, options });
    },

    onError(err, options = null) {
      let text;

      if (err) {
        if (Array.isArray(err.response.data) && err.response.data.length) {
          if (err.response.data[0].hasOwnProperty("msg")) {
            text = err.response.data[0].msg;
          }
        } else {
          text = err.response.data;
        }
      } else {
        text = "We've encountered a problem. Contact an administrator.";
      }

      this.setSnackbar(text);
    },

    async signIn() {
      if (!this.valid || !this.gresponse) return;
      this.isSending = true;

      const data = {
        email: this.inputs[0].value,
        password: this.inputs[1].value,
        gresponse: this.gresponse
      };

      try {
        await this.$auth.loginWith("local", {
          data
        });

        this.setSnackbar(`You've successfully logged in!`);
      } catch (err) {
        this.onError(err);
        this.resetRecaptcha();
      } finally {
        this.isSending = false;
        this.gresponse = null;
      }
    }
  },

  computed: {
    isDisabled() {
      return !this.valid || !this.gresponse;
    }
  }
};
</script>