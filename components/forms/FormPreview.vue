<template>
  <v-container>
    <v-row>
      <v-col cols="12">
        <v-select
          :items="categoryList"
          :item-text="'name'"
          :value="category"
          :item-value="'id'"
          label="Category"
        ></v-select>
      </v-col>
      <v-col cols="12">
        <v-textarea readonly :value="description" outlined label="Description"></v-textarea>
      </v-col>
    </v-row>
    <v-row v-for="(field, idx) in fields" :key="idx">
      <v-col cols="12">
        <div class="text--subtitle-1 font-weight-medium">
          <span>Question {{ idx + 1 }}</span>
        </div>
        <p class="text--white">{{ field.value }}</p>
        <template v-if="!field.options">
          <v-text-field v-if="field.type === 'textfield'"></v-text-field>
          <v-textarea outlined v-else></v-textarea>
        </template>
        <template v-else>
          <template v-if="field.type === 'multiple'">
            <v-radio-group v-model="radioGroup">
              <template v-for="(option, i) in field.options">
                <v-radio :label="option" :key="i" v-if="option"></v-radio>
              </template>
            </v-radio-group>
          </template>
          <template v-else-if="field.type === 'checkbox'">
            <template v-for="(option, i) in field.options">
              <v-checkbox
                class="my-0 py-0"
                :value="option"
                :label="option"
                :key="i"
                v-if="option"
                hide-details
              ></v-checkbox>
            </template>
          </template>
          <template v-else>
            <v-select :items="field.options"></v-select>
          </template>
        </template>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import lists from "~/utilities/ns/public/lists.js";
import forms from "~/utilities/ns/private/forms.js";
import { createNamespacedHelpers } from "vuex";

const { mapGetters, mapMutations } = createNamespacedHelpers("forms");

export default {
  name: "FormPreview",

  data() {
    return {
      radioGroup: ""
    };
  },

  methods: {
    /**
     * setDescription()
     * setCategory()
     */
    ...mapMutations([
      forms.mutations.SET_DESCRIPTION,
      forms.mutations.SET_CATEGORY
    ])
  },

  computed: {
    /**
     * questions()
     * description()
     * category()
     */
    ...mapGetters([
      forms.getters.VALID_FIELDS,
      forms.getters.DESCRIPTION,
      forms.getters.CATEGORY
    ]),

    fields() {
      return this.validFields;
    },

    categoryList() {
      return this.$store.getters[lists.getters.ITEMS]("categories");
    }
  }
};
</script>
