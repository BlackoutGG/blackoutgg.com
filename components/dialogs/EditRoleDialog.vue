<template>
  <v-dialog id="edit" v-model="show" max-width="600px">
    <v-card>
      <v-card-title>
        <v-btn small icon @click="show = false">
          <v-icon>mdi-close</v-icon>
        </v-btn>
        <v-spacer></v-spacer>
        <div id="edit-input" v-if="!editName">
          <span>Name: {{title}}</span>
          <v-btn icon text @click="toggleNameInput">
            <v-icon>mdi-pencil</v-icon>
          </v-btn>
        </div>
        <div id="edit-input" v-else>
          <dialog-input
            :async="true"
            :prefix="'Name:'"
            :filled="false"
            :endpoint="endpoint"
            v-model="title"
          ></dialog-input>
          <v-btn icon @click="toggleNameInput">
            <v-icon>mdi-check</v-icon>
          </v-btn>
          <v-btn icon @click="resetNameInput">
            <v-icon>mdi-close</v-icon>
          </v-btn>
        </div>
        <v-spacer></v-spacer>
        <v-switch v-model="all"></v-switch>
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
import { roles as types } from "~/utilities/types/roles.js";

const { mapGetters, mapActions } = createNamespacedHelpers("roles");

// const perms = [
//   "can_access_admin",
//   "can_view_posts",
//   "can_view_maps",
//   "can_view_events",
//   "can_view_pins",
//   "can_view_users",
//   "can_view_roles",
//   "can_edit_posts",
//   "can_edit_maps",
//   "can_edit_events",
//   "can_edit_pins",
//   "can_edit_users",
//   "can_edit_roles",
//   "can_add_posts",
//   "can_add_maps",
//   "can_add_events",
//   "can_add_pins",
//   "can_add_users",
//   "can_add_roles",
//   "can_remove_posts",
//   "can_remove_maps",
//   "can_remove_events",
//   "can_remove_pins",
//   "can_remove_users",
//   "can_remove_roles",
//   "can_disable_posts",
//   "can_disable_maps",
//   "can_disable_events",
//   "can_disable_pins",
//   "can_disable_users",
//   "can_disable_roles",
//   "can_upload_maps",
//   "can_upload_pins",
//   "can_upload_media"
// ];

const pattern = /can_\w+_/;

export default {
  name: "EditRoleDialog",
  components: { DialogInput, RolePerms },

  props: {
    perms: {
      type: Array,
      default: () => []
    }
  },

  data() {
    return {
      role: null,
      title: "",
      startingTitle: "",
      startingValues: null,
      show: false,
      isSending: false,
      roleId: null,
      all: false,
      editName: false,
      mode: "new",
      endpoint: "/api/roles/validate/name"
    };
  },

  watch: {
    all(v) {
      this.toggleSwitches(v);
    },
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
    ...mapActions(["fetchRolePerms", "editRole"]),

    toggleNameInput() {
      this.editName = !this.editName;
    },

    resetNameInput() {
      this.title = this.startingTitle;
      this.toggleNameInput();
    },

    toggleSwitches(v) {
      let role = Object.values(this.role).reduce((arr, a) => {
        return arr.concat(a);
      }, []);

      role.forEach(role => (role.value = v));
    },

    async save() {
      this.isSending = true;
      try {
        let data = {};

        if (this.title !== this.startingTitle) {
          data.name = this.title;
        }

        if (Object.keys(this.markedForSaving).length) {
          data.permissions = this.markedForSaving;
        }

        if (this.mode === "edit") {
          await this.$store.dispatch(types.actions.EDIT_ROLE, {
            id: this.roleId,
            payload: data
          });

          this.startingValues = this.setStartingValues(this._role.permissions);
          this.startingTitle = this._role.name;
        } else {
          this.$store.dispatch(types.actions.ADD_ROLE, data);

          this.title = "";
          this.startingTitle = "";
          this.toggleSwitches(false);
        }
      } finally {
        this.isSending = false;
      }
    },

    setContent(val) {
      const v = Array.isArray(val) ? val : Object.entries(val);

      return v.reduce((obj, elm) => {
        const [key, value] = Array.isArray(elm)
          ? elm
          : [elm.name || elm, elm.value || false];

        const k = key.split("_")[2];

        if (!Array.isArray(obj[k])) obj[k] = [];
        if (new RegExp(pattern.source + k).test(key)) {
          obj[k].push({ name: key, value });
        }

        return obj;
      }, {});
    },

    setStartingValues(val) {
      const v = Array.isArray(val) ? val : Object.entries(val);

      return v.map(elm => {
        const [name, value] = Array.isArray(elm)
          ? elm
          : [elm.name || elm, elm.value || false];

        return { name, value };
      });
    },

    setNewContent() {
      this.mode = "new";
      this.role = this.setContent(this.perms);
      this.startingValues = this.setStartingValues(this.perms);
      this.startingTitle = "Enter Role Name";
      this.title = "Enter Role Name";
      this.show = true;
    },

    async setEditableContent(roleId, toggle = true, fetch = true) {
      this.mode = "edit";
      this.roleId = roleId;
      let role;

      if (this._role && !this._role.hasOwnProperty("permissions") && fetch) {
        await this.fetchRolePerms(roleId);
      }

      if (!this._role) return;
      else role = { ...this._role };

      this.role = this.setContent(role.permissions);
      this.startingValues = this.setStartingValues(role.permissions);
      this.title = role.name;
      this.startingTitle = role.name;

      if (!toggle) return;
      this.show = true;
    },

    clear() {
      this.role = null;
      this.title = "";
    },

    reset() {
      this.role = null;
      this.title = "";
      this.startingTitle = "";
      this.startingValues = null;
      this.roleId = null;
    }
  },

  computed: {
    ...mapGetters(["getRole", "perms"]),

    _role() {
      return this.getRole(this.roleId) || null;
    },

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

<style lang="scss">
#edit-input {
  display: flex;
  align-items: center;
}
</style>