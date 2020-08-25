<template>
  <v-dialog v-model="open" :max-width="maxWidth">
    <template #activator="{ on }">
      <v-btn outlined text v-on="on">
        <v-icon left>mdi-plus</v-icon>
        <span>Add Form</span>
      </v-btn>
    </template>

    <v-card>
      <template v-if="!success">
        <v-toolbar dark>
          <v-toolbar-title>
            <span>Create A Form</span>
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
          <v-btn text :disabled="isDisabled" @click="save">
            <span>Save</span>
          </v-btn>
          <v-btn text :disabled="isDisabled">
            <span>Reset</span>
          </v-btn>
        </v-card-actions>
      </template>
      <template v-else>
        <success-card @ok="ok" />
      </template>
    </v-card>
  </v-dialog>
</template>

<script>
import { createNamespacedHelpers } from "vuex";
import forms from "~/utilities/ns/private/forms.js";

import FormTemplate from "./FormTemplateWithDnD.vue";
import FormPreview from "./FormPreview.vue";
import SuccessCard from "~/components/Success.vue";

import cloneDeep from "lodash/cloneDeep";
import pickBy from "lodash/pickBy";
import pick from "lodash/pick";
import isEqual from "lodash/isEqual";

const { mapGetters, mapActions } = createNamespacedHelpers("forms");

export default {
  name: "FormDialog",

  components: { FormTemplate, FormPreview, SuccessCard },

  data() {
    return {
      valid: false,
      open: false,
      success: false,
      tab: null,
      maxWidth: "800px",

      form: null,

      mode: "new"
    };
  },

  watch: {
    open(v) {
      if (!v) {
        this.reset();
      }
    }
  },

  methods: {
    /**
     * addForm()
     * clearForm()
     * getFormFields()
     */
    ...mapActions([
      forms.actions.ADD_FORM,
      forms.actions.EDIT_FORM,
      forms.actions.CLEAR_FORM,
      forms.actions.GET_FORM
    ]),
    async save() {
      if (this.mode === "new") {
        this.addForm();
      } else {
        const payload = {};

        if (
          this.markedFormPropsForChange &&
          Object.keys(this.markedFormPropsForChange)
        ) {
          payload.form = this.markedFormPropsForChange;
        }

        if (this.newFields.length) {
          payload.create = this.newFields;
        }

        if (this.markedFieldsForChange.length) {
          payload.patch = this.markedFieldsForChange;
        }

        if (this.markedFieldsForDeletion.length) {
          payload.remove = this.markedFieldsForDeletion;
        }
        try {
          await this.editForm({ id: this.form.id, payload });
          this.success = true;
        } catch (err) {
          console.log(err);
        }
      }
    },

    ok() {
      this.open = false;
      this.$nextTick(() => setTimeout(() => (this.success = false)), 10);
    },

    reset() {
      this.form = null;
      this.tab = null;
      this.mode = "new";
      this.clearForm();
    },

    async setEditableContent(id) {
      this.mode = "edit";
      this.open = true;
      this.isSending = true;

      const params = { key: "id", id };
      const editable = true;

      try {
        this.form = cloneDeep(await this.getForm({ params, editable }));
      } catch (err) {
        console.log(err);
      } finally {
        this.isSending = false;
      }
    }
  },

  computed: {
    ...mapGetters([
      forms.getters.QUESTIONS,
      forms.getters.NAME,
      forms.getters.DESCRIPTION,
      forms.getters.CATEGORY
    ]),

    fields() {
      return this.questions;
    },

    formProperties() {
      return {
        name: this.name,
        description: this.description,
        category_id: this.category
      };
    },

    isDisabled() {
      return this.tab > 0 || !this.valid;
    },

    newFields() {
      return this.form && this.fields && this.fields.length
        ? this.fields.reduce((arr, field) => {
            const idx = this.form.fields.findIndex(f => f.id === field.id);
            if (idx === -1 && field.value.length) {
              const { options, cache, ...content } = field;

              const validOptions =
                options && options.length ? options.filter(o => !!o) : options;

              arr.push({ ...content, options: validOptions });
            }
            return arr;
          }, [])
        : [];
    },

    markedFormPropsForChange() {
      const form = pick(this.form, ["name", "description", "category_id"]);
      const diff = pickBy(
        this.formProperties,
        (value, key) => !isEqual(form[key], value)
      );
      return Object.keys(diff).length ? diff : null;
    },

    markedFieldsForChange() {
      return this.form && this.fields
        ? this.form.fields.reduce((arr, f) => {
            const field = pick(
              this.fields.find(fs => fs.hasOwnProperty("id") && fs.id === f.id),
              ["id", "value", "optional", "options", "type", "order"]
            );

            if (field) {
              const result = { id: field.id };

              let changed = pickBy(
                field,
                (value, key) => !isEqual(f[key], value)
              );

              const { options, ...content } = changed;

              const validOptions =
                options && options.length ? options.filter(o => !!o) : null;

              const numOfChanged = Object.keys(changed).length;

              if (numOfChanged) {
                // arr.push({ id: field.id, ...content });
                Object.assign(result, content);

                if (validOptions && validOptions.length) {
                  Object.assign(result, { options: validOptions });
                }

                arr.push(result);
              }
            }

            return arr;
          }, [])
        : [];
    },

    markedFieldsForDeletion() {
      return this.form && this.fields
        ? this.form.fields.reduce((arr, f) => {
            const idx = this.fields.findIndex(
              field => field.id && field.id === f.id
            );
            if (idx === -1) arr.push(f.id);
            return arr;
          }, [])
        : [];
    }
  }
};
</script>
