<template>
  <v-dialog v-model="open" :max-width="maxWidth">
    <template #activator="{ on }">
      <slot :on="on" />
    </template>
    <v-card>
      <v-card-title></v-card-title>
      <v-form v-model="valid" ref="userApp">
        <form-user-application></form-user-application>
      </v-form>
      <v-card-actions>
        <v-btn text>Submit</v-btn>
      </v-card-actions>
      <v-overlay absolute v-model="isSending">
        <v-progress-circular indeterminate size="64"></v-progress-circular>
      </v-overlay>
    </v-card>
  </v-dialog>
</template>

<script>
import forms from "~/utilities/ns/public/forms.js";
import FormPreview from "~/components/applications/FormPreview.vue";
export default {
  name: "UserFormDialog",

  components: { FormPreview },

  data() {
    return {
      open: false,
      valid: false,
      isSending: false,
      form: null
    };
  },

  watch: {
    categoryId(id) {
      this.$store.dispatch(forms.actions.GET_FORM, {
        key: "category_id",
        id,
        status: true
      });
    }
  },

  computed: {
    categoryId() {
      return this.$store.getters[forms.getters.CATEGORY];
    }
  }
};
</script>
