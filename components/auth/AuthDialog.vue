<template>
  <v-dialog v-model="show" :max-width="'600px'">
    <template #activator="{ on, attrs }">
      <v-btn outlined dark text class="hidden-sm-and-down" v-on="on" v-bind="attrs">
        <v-icon left>mdi-account-circle</v-icon>
        <span>Sign In</span>
      </v-btn>
    </template>
    <v-card>
      <v-toolbar>
        <v-tabs fixed-tabs v-model="tab" dark>
          <v-tab>
            <span>Sign In</span>
          </v-tab>
          <v-tab>
            <span>Sign Up</span>
            <v-btn small icon absolute top right @click.stop="show = false">
              <v-icon>mdi-close</v-icon>
            </v-btn>
          </v-tab>
        </v-tabs>
      </v-toolbar>
      <v-tabs-items v-model="tab">
        <sign-in ref="signin"></sign-in>
        <sign-up ref="signup" :success.sync="success"></sign-up>
      </v-tabs-items>
    </v-card>
  </v-dialog>
</template>

<script>
import SignIn from "./SigninForm.vue";
import SignUp from "./SignupForm.vue";
export default {
  name: "AuthDialog",

  components: { SignIn, SignUp },

  props: {
    value: {
      type: Boolean,
      default: false
    }
  },

  data() {
    return {
      tab: null,
      success: false,
      open: false
    };
  },

  watch: {
    open(v) {
      if (!v) {
        this.tab = null;
        this.$refs.signup.reset();
        this.$refs.signin.reset();
        this.show = false;
        this.success = false;
      }
    }
  },

  computed: {
    show: {
      get() {
        return this.open || this.value;
      },
      set(value) {
        this.open = value;
        this.$emit("input", value);
      }
    }
  }
};
</script>