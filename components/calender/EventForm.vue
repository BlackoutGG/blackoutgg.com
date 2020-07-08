<template>
  <v-form v-model="isValid" ref="form">
    <v-container>
      <v-row>
        <v-col md="12" sm="12" v-if="name">
          <v-text-field :readonly="preview" label="Event Name" v-model="event.name"></v-text-field>
        </v-col>
        <v-col md="12" sm="12" v-if="category">
          <v-select
            v-if="!preview"
            :items="categories"
            :item-text="'name'"
            :item-value="'id'"
            v-model="event.category_id"
            label="Category"
          ></v-select>
          <v-text-field v-else readonly label="Category" v-model="event.categoryName"></v-text-field>
        </v-col>
        <v-col md="6" sm="12" v-if="start">
          <event-time-date v-if="!preview" label="Start Date" v-model="event.startDate"></event-time-date>
          <v-text-field
            v-else
            readonly
            prepend-icon="mdi-calendar"
            label="Start Date"
            v-model="event.startDate"
          ></v-text-field>
        </v-col>
        <v-col md="6" sm="12" v-if="start">
          <event-time-date
            v-if="!preview"
            label="Start Time"
            v-model="event.startTime"
            time
            :date="false"
          ></event-time-date>
          <v-text-field
            v-else
            readonly
            prepend-icon="mdi-calendar-clock"
            label="Start Time"
            v-model="event.startTime"
          ></v-text-field>
        </v-col>
        <v-col md="6" sm="12" v-if="end">
          <event-time-date v-if="!preview" label="End Date" v-model="event.endDate"></event-time-date>
          <v-text-field
            v-else
            readonly
            prepend-icon="mdi-calendar"
            label="End Date"
            v-model="event.endDate"
          ></v-text-field>
        </v-col>
        <v-col md="6" sm="12" v-if="end">
          <event-time-date
            v-if="!preview"
            :date="false"
            label="End Time"
            v-model="event.endTime"
            time
          ></event-time-date>
          <v-text-field
            v-else
            readonly
            prepend-icon="mdi-calendar-clock"
            label="End Time"
            v-model="event.endTime"
          ></v-text-field>
        </v-col>
        <v-col cols="12" v-if="description">
          <v-textarea :readonly="preview" label="Description" filled v-model="event.description"></v-textarea>
        </v-col>
      </v-row>
    </v-container>
  </v-form>
</template>

<script>
import { lists } from "~/utilities/types/lists.js";
import EventTimeDate from "./EventTimeDatePicker.vue";
import EventColor from "./EventColorPicker.vue";

const isRequired = v =>
  (v && v.length >= 3) ||
  "Field is required and must be equal or longer than 3 characters.";
const isAlphanumeric = v =>
  /[A-Za-z0-9]/.test(v) || "Field must be alphanumeric only";

export default {
  name: "EventForm",
  components: { EventTimeDate, EventColor },
  props: {
    value: {
      type: Boolean,
      default: false
    },
    preview: {
      type: Boolean,
      default: false
    },
    event: {
      type: Object,
      required: true
    },
    name: {
      type: Boolean,
      default: true
    },
    category: {
      type: Boolean,
      default: true
    },
    start: {
      type: Boolean,
      default: true
    },
    end: {
      type: Boolean,
      default: true
    },
    description: {
      type: Boolean,
      default: true
    },
    rvsp: {
      type: Boolean,
      default: false
    },
    categoryId: {
      type: Number
    }
  },

  data() {
    return {
      valid: false,
      rules: {
        isRequired,
        isAlphanumeric
      }
    };
  },

  methods: {
    reset() {
      this.$refs.form.reset();
    }
  },

  computed: {
    isValid: {
      get() {
        return this.value;
      },
      set(val) {
        this.valid = val;
        this.$emit("input", val);
      }
    },

    categories() {
      return this.$store.getters[lists.getters.ITEMS]("categories").filter(
        item => item.name !== "all"
      );
    }
  }
};
</script>