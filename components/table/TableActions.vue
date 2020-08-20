<template>
  <v-menu v-model="open">
    <template v-slot:activator="{ on }">
      <v-icon v-on="on">mdi-dots-vertical</v-icon>
    </template>
    <v-list dense nav flat>
      <v-list-item link @click.stop="$emit('edit')" v-if="edit">
        <v-list-item-content>
          <v-list-item-title>
            <v-icon left>mdi-account-edit</v-icon>
            <span>Edit</span>
          </v-list-item-title>
        </v-list-item-content>
      </v-list-item>
      <v-list-item link v-if="reset">
        <v-tooltip left>
          <template v-slot:activator="{ on, attrs }">
            <v-list-item-content v-bind="attrs" v-on="on">
              <v-list-item-title>
                <v-icon left>mdi-lock-reset</v-icon>
                <span>Reset</span>
              </v-list-item-title>
            </v-list-item-content>
          </template>
          <span>Reset Password</span>
        </v-tooltip>
      </v-list-item>
      <v-list-item link v-if="disable" @click="$emit('disable')">
        <v-list-item-content>
          <v-list-item-title>
            <v-icon left>{{disabledIcon}}</v-icon>
            <span>{{disabledText}}</span>
          </v-list-item-title>
        </v-list-item-content>
      </v-list-item>
      <v-list-item link v-if="remove" @click="$emit('remove')">
        <v-list-item-content>
          <v-list-item-title>
            <v-icon left>mdi-account-remove</v-icon>
            <span>Remove</span>
          </v-list-item-title>
        </v-list-item-content>
      </v-list-item>
    </v-list>
  </v-menu>
</template>

<script>
export default {
  name: "TableActions",
  props: {
    item: Object,
    edit: {
      type: Boolean,
      default: false
    },
    disable: {
      type: Boolean,
      default: false
    },
    reset: {
      type: Boolean,
      default: false
    },
    remove: {
      type: Boolean,
      default: false
    }
  },

  data() {
    return {
      open: false
    };
  },

  computed: {
    isDisabled() {
      return this.item.is_disabled;
    },
    disabledIcon() {
      return this.isDisabled ? "mdi-account-on" : "mdi-account-off";
    },
    disabledText() {
      return this.isDisabled ? "Enable" : "Disable";
    }
  }
};
</script>