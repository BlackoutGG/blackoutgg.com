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
    </v-card>
  </v-dialog>
</template>

<script>
import { createNamespacedHelpers } from "vuex";
import forms from "~/utilities/ns/private/forms.js";
import FormTemplate from "./FormTemplate.vue";
import FormPreview from "./FormPreview.vue";
import cloneDeep from "lodash/cloneDeep";
import pickBy from "lodash/pickBy";
import pick from "lodash/pick";
import isEqual from "lodash/isEqual";
import filter from "lodash/filter";

const { mapGetters, mapActions } = createNamespacedHelpers("forms");

export default {
  name: "FormDialog",

  components: { FormTemplate, FormPreview },

  data() {
    return {
      valid: false,
      open: false,
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
      forms.actions.CLEAR_FORM,
      forms.actions.GET_FORM
    ]),
    async save() {
      if (this.mode === "new") {
        this.addForm();
      } else {
        const data = {};

        if (this.markedFormPropsForChange) {
          data.form = this.markedFormPropsForChange;
        }

        if (this.newFields.length) {
          data.create = this.newFields.map(field => {
            delete field.isNew;
            field.options = filter(field.options, "value").map(o => ({
              value: o.value
            }));
            return field;
          });

          data.create = this.newFields;
        }

        if (this.markedFieldsForChange.length) {
          // data.patch = this.markedFieldsForChange.map(field => {
          //   field.options = filter("field.option");
          //   return field;
          // });

          data.patch = this.markedFieldsForChange;
        }

        if (this.markedFieldsForDeletion.length) {
          data.remove = this.markedFieldsForDeletion;
        }
        try {
          await this.editForm({ id: this.form.id, payload: this.altered });
          this.open = false;
        } catch (err) {
          console.log(err);
        }
      }
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
      try {
        this.form = cloneDeep(await this.getForm({ key: "id", id }));
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
      // return this.form && this.fields && this.fields.length
      //   ? this.fields.filter(field => field.isNew && field.value)
      //   : [];

      return this.form && this.fields && this.fields.length
        ? this.fields.reduce((arr, field) => {
            const idx = this.form.fields.findIndex(
              f => f.id && f.value && f.id === field.id
            );
            if (idx === -1) arr.push(field);
            return arr;
          }, [])
        : [];
    },

    markedFormPropsForChange() {
      return this.form
        ? pickBy(
            this.formProperties,
            () =>
              !isEqual(
                pick(this.form, ["name", "description", "category_id"]),
                this.formProperties
              )
          )
        : null;
    },

    markedFieldsForChange() {
      return this.form && this.fields
        ? this.form.fields.reduce((arr, f) => {
            const field = this.fields.find(fs => !fs.isNew && fs.id === f.id);

            if (field) {
              let changed = pickBy(field, (value, key) => {
                return !isEqual(f[key], value);
              });

              const { options, ...ignore } = changed;

              const validOptions =
                options && options.length ? filter(options, "value") : null;

              const numOfChanged = Object.keys(changed).length;

              if (numOfChanged) {
                arr.push({ id: field.id, ...changed, options: validOptions });
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
