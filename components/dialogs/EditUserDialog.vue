<template>
  <v-dialog id="edit" v-model="show" max-width="600px">
    <v-card>
      <v-card-title>
        <v-btn small rounded text @click="show = false">
          <v-icon>mdi-close</v-icon>
        </v-btn>
        <span class="headline">{{title}}</span>
      </v-card-title>
      <v-divider></v-divider>
      <v-card-text>
        <v-form v-model="valid" ref="form">
          <v-container>
            <v-row>
              <v-col cols="12" class="text-center">
                <v-badge avatar bordered overlap>
                  <template v-slot:badge>
                    <v-avatar size="32">
                      <v-btn text>
                        <v-icon>mdi-image-edit-outline</v-icon>
                      </v-btn>
                    </v-avatar>
                  </template>
                  <v-avatar size="80" color="primary">
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
                <role-select v-model="roles" :startingValues="startingValues"></role-select>
              </v-col>
            </v-row>
          </v-container>
        </v-form>
      </v-card-text>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn text @click="save" :disabled="!valid">Save</v-btn>
        <v-btn text @click="clear">Clear</v-btn>
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
import avatar from "~/mixins/avatar.js";

import { createNamespacedHelpers } from "vuex";
import { users as types } from "~/utilities/types/users.js";
import pick from "lodash/pick";

const { mapGetters } = createNamespacedHelpers("users");

export default {
  name: "EditDialog",
  components: { UserInput, RoleSelect },

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

      startingInputValues: {
        username: "",
        email: ""
      },

      avatar: {
        url: null,
        preview: null
      },

      roles: [],
      startingValues: [],

      valid: false,
      show: false,
      isSending: false,

      userId: null
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
          if (o.value !== this.startingInputValues[k]) obj[k] = o.value;
          return obj;
        }, {});

        const data = {
          ...inputs
        };

        if (this.markedForDeletion.length) {
          data.delete = this.markedForDeletion;
        }

        if (this.markedForSaving.length) {
          data.roles = this.markedForSaving;
        }

        await this.$store.dispatch(types.actions.EDIT_USER, {
          data,
          id: this.userId
        });

        /**
         * SET THE DEFAULT VALUES TO THE NEW VALUES WE CHANGED.
         */
        this.setEditableContent(this.userId, false);
      } finally {
        this.isSending = false;
      }
    },

    setEditableContent(userId, toggle = true) {
      let user = this.getUser(userId);

      if (!user) return;
      else user = { ...user };

      const fields = pick(user, ["username", "email"]);
      Object.keys(fields).forEach(key => {
        this.inputs[key].value = fields[key];
        this.startingInputValues[key] = fields[key];
      });

      const roles = user.roles.map(item => item.id);
      this.roles = roles;
      this.startingValues = roles;

      this.avatar.url = user.avatar;
      this.userId = userId;

      if (!toggle) return;
      this.$nextTick(() => {
        this.show = true;
      });
    },

    clear() {
      this.$refs.form.reset();
      this.$refs.form.resetValidation();
      this.roles = [];
    },

    reset() {
      this.$refs.form.reset();
      this.$refs.form.resetValidation();
      this.roles = [];
      this.startingValues = [];
      this.userId = null;
      Object.keys(this.startingInputValues).forEach(
        key => (this.startingInputValues[key] = "")
      );
    }
  },

  computed: {
    ...mapGetters(["getUser"]),
    username() {
      return this.inputs.username.value;
    },
    initials() {
      const username = this.username ? this.username.match(/\b\w/g) : null;
      const initials = username
        ? ((username.shift() || "") + (username.pop() || "")).toUpperCase()
        : "";
      return initials;
    },

    markedForSaving() {
      return this.roles.filter(item => {
        return this.startingValues.indexOf(item) === -1;
      });
    },

    markedForDeletion() {
      return this.startingValues.filter(item => {
        return this.roles.indexOf(item) === -1;
      });
    }
  }
};
</script>