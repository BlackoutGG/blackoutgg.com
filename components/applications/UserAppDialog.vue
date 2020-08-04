<template>
  <v-dialog v-model="open" :max-width="maxWidth">
    <template #activator="{ on }">
      <slot :on="on" />
    </template>
    <v-card>
      <v-card-title></v-card-title>
      <v-form v-model="valid" ref="userApp">
        <form-preview :form="form" v-model="valid"></form-preview>
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
import FormPreview from "~/components/applications/FormPreview.vue";
export default {
  name: "UserAppDialog",

  components: { FormPreview },

  data() {
    return {
      isSending: false,
      form: null,
      valid: false
    };
  },

  methods: {
    async getForm(id) {
      try {
        const {
          data: { form }
        } = await this.$axios.get(`/api/form/template/${id}`);

        const { questions, ..._form } = form;

        questions.map(question => {
          question.hasAnswer = true;
          if (question.type === "checkbox") question.answer = [];
          else question.answer = "";

          return question;
        });

        _form.questions = questions;
        this.form = _form;
      } catch (err) {}
    }
  }
};
</script>
