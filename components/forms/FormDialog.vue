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

const { mapGetters, mapActions } = createNamespacedHelpers("forms");

const objectsAreSame = (x, y) => {
  const same = true;
  for (const propName of x) {
    if (propName !== "isNew") {
      if (x[propName] !== y[propName]) {
        same = false;
        break;
      }
    }
  }
  return same;
};

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
        const payload = {};

        if (Object.keys(this.markedFormPropsForChange).length) {
          payload.form = this.markedFormPropsForChange;
        }

        if (this.newFields.length) {
          payload.created = this.newFields;
        }

        if (this.markedFieldsForChange.length) {
          payload.patch = this.markedFieldsForChange;
        }

        if (this.markedFieldsForDeletion.length) {
          payload.delete = this.markedFieldsForDeletion;
        }

        try {
          await this.editForm(payload);
          this.open = false;
        } catch (err) {
          console.log(err);
        }
      }
    },
    reset() {
      this.form = null;
      this.tab = null;
      this.clearForm();
    },

    async setEditableContent(id) {
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
    fields() {
      return this.$store.getters["forms/questions"];
    },

    baseFormProperties() {
      return {
        name: this.$store.getters[form.getters.NAME],
        description: this.$store.getters[form.getters.description],
        category_id: this.$store.getters[form.getters.CATEGORY]
      };
    },

    isDisabled() {
      return this.tab > 0 || !this.valid;
    },

    newFields() {
      return this.form && this.fields && this.fields.length
        ? this.fields.filter(field => field.isNew && field.value)
        : [];
    },

    markedFormPropsForChange() {
      return this.form
        ? pickBy(
            this.baseFormProperties,
            () =>
              !isEqual(
                pick(this.form, ["name", "description", "category_id"]),
                this.baseFormProperties
              )
          )
        : null;
    },

    markedFieldsForChange() {
      return this.form && this.fields
        ? this.form.fields.reduce((arr, f) => {
            const field = this.fields.find(fs => !fs.isNew && fs.id === f.id);

            if (field) {
              const changed = pickBy(field, (value, key) => {
                // return f[key] !== value;
                return !isEqual(f[key], value);
              });

              const numOfChanged = Object.keys(changed).length;

              if (numOfChanged) {
                arr.push({ id: field.id, ...changed });
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
