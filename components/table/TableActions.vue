false<template>
  <v-menu>
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
      <v-list-item link v-if="disable">
        <v-list-item-content>
          <v-list-item-title>
            <v-icon left>mdi-account-off</v-icon>
            <span>Disable</span>
          </v-list-item-title>
        </v-list-item-content>
      </v-list-item>
      <v-list-item link v-if="remove">
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
  }
};
</script>