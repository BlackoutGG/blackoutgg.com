<template>
  <v-dialog v-model="open" :max-width="maxWidth">
    <template #activator="{ on }">
      <v-btn outlined text v-on="on">
        <v-icon left>mdi-plus</v-icon>
        <span>Add Form</span>
      </v-btn>
    </template>

    <v-card :max-width="maxWidth">
      <v-toolbar dark>
        <v-toolbar-title>
          <span>Form Template</span>
        </v-toolbar-title>
        <v-spacer></v-spacer>
        <v-btn icon @click="open = false">
          <v-icon>mdi-close</v-icon>
        </v-btn>
      </v-toolbar>
      <v-tabs fixed-tabs v-model="tab">
        <v-tab>
          <span>Form</span>
        </v-tab>
        <v-tab>
          <span>Preview</span>
        </v-tab>
      </v-tabs>
      <v-tabs-items v-model="tab">
        <v-tab-item>
          <v-card-text>
            <form-template v-model="valid"></form-template>
          </v-card-text>
        </v-tab-item>
        <v-tab-item>
          <v-card-text>
            <form-preview></form-preview>
          </v-card-text>
        </v-tab-item>
      </v-tabs-items>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn text :disabled="isDisabled">
          <span>Save</span>
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
import FormTemplate from "./FormTemplate.vue";
import FormPreview from "./FormPreview.vue";
export default {
  name: "FormDialog",

  components: { FormTemplate, FormPreview },

  data() {
    return {
      valid: false,
      open: false,
      tab: null,
      maxWidth: "800px"
    };
  },

  computed: {
    isDisabled() {
      return !this.tab || !this.valid;
    }
  }
};
</script>