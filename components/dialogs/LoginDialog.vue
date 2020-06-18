<template>
  <v-dialog v-model="show" :max-width="'600px'">
    <v-card>
      <v-card-title class="headline">
        <v-btn text rounded color="dark darken-1" @click.stop.prevent="show = false">
          <v-icon>mdi-close</v-icon>
        </v-btn>
        <span>Login</span>
      </v-card-title>
      <v-card-text>
        <v-form v-model="valid">
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
                <vue-recaptcha
                  ref="recaptcha"
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
        <v-overlay absolute v-model="isSending">
          <v-progress-circular indeterminate size="64"></v-progress-circular>
        </v-overlay>
      </v-card-text>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn text color="dark darken-1" :disabled="isDisabled" @click.prevent="signIn">Submit</v-btn>
        <v-btn text color="dark darken-1" @click="reset">Reset</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
const pattern = /^([a-zA-Z0-9_\-\.]+)@([a-zA-Z0-9_\-\.]+)\.([a-zA-Z]{2,5})$/;

import VueRecaptcha from "vue-recaptcha";
import Divider from "./Divider";
import DiscordButton from "./DiscordButton";
import recaptcha from "~/mixins/recaptcha";
import { DIALOG, SNACKBAR } from "~/utilities/types";

export default {
  name: "LoginDialog",
  components: { Divider, DiscordButton, VueRecaptcha },
  mixins: [recaptcha],
  data() {
    return {
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
            v => pattern.test(v) || "Email must be valid."
          ]
        },
        {
          label: "Password",
          value: "",
          type: "password",

          rules: [
            v => !!v || "Password is required",
            v => v.length > 8 || "Password must be longer than 8 characters.",
            v =>
              v.length <= 50 || "Password cannot be longer than 50 characters."
          ]
        }
      ]
    };
  },

  beforeDestroy() {
    this.show = false;
  },

  methods: {
    setSnackbar(text, options) {
      this.$store.dispatch(SNACKBAR.actions.TOGGLE_BAR, { text, options });
    },
    reset() {
      this.inputs.forEach(input => (input.value = ""));
      this.resetRecaptcha();
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
        this.onSuccess();
      } catch (err) {
        this.setSnackbar(err.message, { color: "#000" });
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
    },
    show: {
      get() {
        return this.$store.getters[DIALOG.getters.SHOW]("login");
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
