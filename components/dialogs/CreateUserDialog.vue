<template>
  <v-dialog id="create" v-model="show" max-width="600px">
    <template v-slot:activator="{ on, attrs }">
      <v-btn color="primary" v-bind="attrs" v-on="on">
        <v-icon left>mdi-plus</v-icon>
        <span>Create User</span>
      </v-btn>
    </template>
    <v-card>
      <v-card-title>
        <span class="headline">{{title}}</span>
      </v-card-title>
      <v-card-text>
        <v-form v-model="valid" ref="form">
          <v-container>
            <v-row>
              <v-col cols="12" v-for="(input, idx) in inputs" :type="input.type" :key="idx">
                <user-input
                  :async="input.async"
                  v-model="input.value"
                  :type="input.type"
                  :label="input.label"
                  :rules="input.rules"
                />
              </v-col>
              <v-col cols="12">
                <role-select v-model="roles"></role-select>
              </v-col>
            </v-row>
          </v-container>
        </v-form>
      </v-card-text>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn text @click="save" :disabled="!valid">Save</v-btn>
        <v-btn text @click="reset">Clear</v-btn>
      </v-card-actions>
      <v-overlay absolute v-model="isSending">
        <v-progress-circular indeterminate size="64"></v-progress-circular>
      </v-overlay>
    </v-card>
  </v-dialog>
</template>

<script>
import UserInput from "./DialogInput.vue";
import RoleSelect from "./RoleSelect.vue";
import { users } from "~/utilities/types/users.js";
import { createNamespacedHelpers } from "vuex";

const { mapGetters } = createNamespacedHelpers("users");

export default {
  name: "CreateUserDialog",
  components: { UserInput, RoleSelect },

  props: {
    title: {
      type: String,
      default: "Create New User"
    }
  },

  data() {
    return {
      inputs: {
        username: { async: true, label: "Username", type: "text", value: "" },
        email: { async: true, label: "Email", type: "text", value: "" },
        password: {
          async: false,
          label: "Password",
          type: "text",
          value: "",
          rules: [
            v => !!v || "Password is required.",
            v => (v && v.length <= 50) || "Password is too long.",
            v =>
              (v && v.length >= 8) ||
              "Password is too short. Must be equal to or greater than 8 characters."
          ]
        }
      },

      roles: [],
      valid: false,
      show: false,
      isSending: false
    };
  },

  watch: {
    show(v) {
      if (!v) {
        this.$emit("close");
        this.reset();
      } else {
        this.$emit("open");
      }
    }
  },

  methods: {
    async save() {
      this.isSending = true;
      try {
        const data = Object.values(this.inputs).reduce((obj, o) => {
          const k = o.label.toLowerCase();
          obj[k] = o.value;
          return obj;
        }, {});

        await this.$store.dispatch(users.actions.CREATE_USER, data);

        this.reset();
      } finally {
        this.isSending = false;
      }
    },

    reset() {
      this.$refs.form.reset();
      this.$refs.form.resetValidation();
      this.roles = [];
    }
  }
};
</script>