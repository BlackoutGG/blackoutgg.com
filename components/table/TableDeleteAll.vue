<template>
  <v-dialog v-model="open" :max-width="maxWidth">
    <template #activator="{ on }">
      <v-btn text v-on="on" :disabled="isDisabled">
        <v-icon v-text="icon"></v-icon>
        <span>Delete {{ length }}</span>
      </v-btn>
    </template>
    <v-card>
      <v-card-text>
        <p class="text-center">
          You are performing an action that is irrevesiable. Do you wish to
          proceed?
        </p>
      </v-card-text>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn depressed color="primary" @click="$emit('deleteAll')">OK</v-btn>
        <v-btn text @click="open = false">Cancel</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
export default {
  name: "TableDeleteAllButton",

  props: {
    length: {
      type: Number,
      default: 0
    }
  },

  data() {
    return {
      icon: "mdi-trash-can-outline",
      open: false,
      maxWidth: 300
    };
  },

  computed: {
    isDisabled() {
      return !this.length;
    }
  }
};
</script>
