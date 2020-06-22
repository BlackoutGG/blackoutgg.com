<template>
  <v-dialog id="edit" v-model="show" max-width="600px">
    <v-card>
      <v-card-title>
        <v-btn small rounded text @click="show = false">
          <v-icon>mdi-close</v-icon>
        </v-btn>
        <span class="headline">Edit: {{title}}</span>
      </v-card-title>
      <v-divider></v-divider>
      <v-card-text>
        <v-list>
          <role-perms v-for="(perms, key) in role" :items="perms" :title="key" :key="key" />
        </v-list>
      </v-card-text>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn text @click="save">Save</v-btn>
        <v-btn text @click="clear">Clear</v-btn>
      </v-card-actions>
      <v-overlay absolute v-model="isSending">
        <v-progress-circular indeterminate size="64"></v-progress-circular>
      </v-overlay>
    </v-card>
  </v-dialog>
</template>

<script>
import DialogInput from "./DialogInput.vue";
import RolePerms from "./RolePermList.vue";

import { createNamespacedHelpers } from "vuex";
import { roles as types } from "~/utilities/types/users.js";
import reduce from "lodash/reduce";

const { mapGetters, mapActions } = createNamespacedHelpers("roles");

export default {
  name: "EditRoleDialog",
  components: { DialogInput, RolePerms },

  data() {
    return {
      role: null,
      title: "",
      startingTitle: "",
      startingValues: null,
      show: false,
      isSending: false,
      roleId: null
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
    ...mapActions(["fetchRolePerms"]),
    async save() {
      this.isSending = true;
      try {
        let data = {};

        if (this.title !== this.startingTitle) {
          data.title = this.title;
        }

        if (Object.keys(this.markedForSaving).length) {
          data.update = this.markedForSaving;
        }

        /**
         * SET THE DEFAULT VALUES TO THE NEW VALUES WE CHANGED.
         */
        this.setEditableContent(this.roleId, false);
      } finally {
        this.isSending = false;
      }
    },

    async setEditableContent(roleId, toggle = true) {
      await this.fetchRolePerms(roleId);

      let role = this.getRole(roleId);

      if (!role) return;
      else role = { ...role };

      const pattern = /can_\w+_/;

      this.role = Object.entries(role.permissions).reduce(
        (obj, [key, value]) => {
          if (/^can_/.test(key)) {
            const k = key.split("_")[2];
            if (!Array.isArray(obj[k])) obj[k] = [];
            if (new RegExp(pattern.source + k).test(key)) {
              obj[k].push({ name: key, value });
            }
          }
          return obj;
        },
        {}
      );

      this.startingValues = Object.entries(role.permissions).map(
        ([key, value]) => {
          return { name: key, value };
        }
      );

      this.title = role.name;
      this.startingTitle = role.name;

      this.roleId = roleId;

      if (!toggle) return;
      this.$nextTick(() => {
        this.show = true;
      });
    },

    clear() {
      this.roles = null;
    },

    reset() {
      this.role = null;
      this.startingValues = null;
      this.roleId = null;
    }
  },

  computed: {
    ...mapGetters(["getRole"]),

    markedForSaving() {
      let role = Object.values(this.role).reduce((arr, a) => {
        return arr.concat(a);
      }, []);

      return role
        .filter(r => {
          const s = this.startingValues.find(_s => r.name === _s.name);
          return s && r.value !== s.value;
        })
        .reduce((obj, r) => {
          obj[r.name] = r.value;
          return obj;
        }, {});
    }
  }
};
</script>