<template>
  <v-dialog v-model="show" max-width="600px">
    <v-card>
      <v-card-title>
        <v-btn flat>
          <v-icon left>mdi-close</v-icon>
        </v-btn>
        <span class="headline">{{title}}</span>
        <v-divider></v-divider>
      </v-card-title>
      <v-card-text>
        <v-form v-model="valid" ref="form">
          <v-container>
            <v-row align="center" justify="center">
              <v-col cols="12">
                <v-badge avatar bordered overlap>
                  <template v-slot:badge>
                    <v-avatar>
                      <v-btn flat>
                        <v-icon>mdi-image-edit-outline</v-icon>
                      </v-btn>
                    </v-avatar>
                  </template>
                  <v-avatar size="62">
                    <img :src="avatar.url" alt v-if="avatar.url" />
                    <span class="white--text headline" v-else>{{initials}}</span>
                  </v-avatar>
                </v-badge>
              </v-col>
            </v-row>
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
import UserInput from "./CreateUserDialogInput.vue";
import RoleSelect from "./RoleSelect.vue";
import { USERS as types } from "~/utilities/types/users.js";
import avatar from "~/mixins/avatar.js";

import { createNamespacedHelpers } from "vuex";

const { mapGetters } = createNamespacedHelpers("users");

export default {
  name: "CreateUserDialog",
  components: { UserInput, RoleSelect },

  mixins: [avatar],

  props: {
    title: {
      type: String,
      default: "Edit User"
    }
  },

  data() {
    return {
      inputs: {
        username: { async: true, label: "Username", type: "text", value: "" },
        email: { async: true, label: "Email", type: "text", value: "" }
      },

      avatar: {
        url: null,
        preview: null
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
        const inputs = Object.values(this.inputs).reduce((obj, o) => {
          const k = o.label.toLowerCase();
          obj[k] = o.value;
          return obj;
        }, {});

        // await this.$store.dispatch(types.actions.EDIT_USER, {
        //   inputs,
        //   roles: this.roles
        // });
      } finally {
        this.isSending = false;
      }
    },

    setEditableContent(content) {
      const c = { ...content };
      Object.keys(c.inputs).forEach(key => (this.input[key] = c.inputs[key]));
      this.roles = [...c.roles];
      this.avatar.url = c.avatar;
      this.show = true;
    },

    reset() {
      this.$refs.form.reset();
      this.$refs.form.resetValidation();
      this.roles = [];
    }
  }
};
</script>