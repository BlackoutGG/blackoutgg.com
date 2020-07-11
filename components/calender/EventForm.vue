<template>
  <v-form v-model="isValid" ref="form">
    <v-container>
      <v-row>
        <v-col md="12" sm="12" v-if="!dontShow('name')">
          <v-text-field
            :readonly="preview"
            :rules="nameRules"
            label="Event Name"
            v-model="event.name"
          ></v-text-field>
        </v-col>
        <v-col md="12" sm="12" v-if="!dontShow('category')">
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
        <v-col md="6" sm="12" v-if="!dontShow('start')">
          <event-time-date
            v-if="!preview"
            label="Start Date"
            :rules="startDateRules"
            v-model="event.startDate"
          ></event-time-date>
          <v-text-field
            v-else
            readonly
            prepend-icon="mdi-calendar"
            label="Start Date"
            v-model="event.startDate"
          ></v-text-field>
        </v-col>
        <v-col md="6" sm="12" v-if="!dontShow('start')">
          <event-time-date
            v-if="!preview"
            label="Start Time"
            v-model="event.startTime"
            time
            :rules="startTimeRules"
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
        <v-col md="6" sm="12" v-if="!dontShow('end')">
          <event-time-date
            v-if="!preview"
            label="End Date"
            :rules="endDateRules"
            v-model="event.endDate"
          ></event-time-date>
          <v-text-field
            v-else
            readonly
            prepend-icon="mdi-calendar"
            label="End Date"
            v-model="event.endDate"
          ></v-text-field>
        </v-col>
        <v-col md="6" sm="12" v-if="!dontShow('end')">
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
        <v-col cols="12" v-if="!dontShow('desc')">
          <v-textarea :readonly="preview" label="Description" filled v-model="event.description"></v-textarea>
        </v-col>
      </v-row>
    </v-container>
  </v-form>
</template>

<script>
import { lists } from "~/utilities/types/lists.js";
import isAlphanumeric from "~/utilities/isAlphanumeric.js";
import EventTimeDate from "./EventTimeDatePicker.vue";
import EventColor from "./EventColorPicker.vue";

export default {
  name: "EventForm",
  components: { EventTimeDate, EventColor },
  props: {
    value: {
      type: Boolean,
      default: false
    },

    hide: {
      type: Array,
      default: () => []
    },

    preview: {
      type: Boolean,
      default: false
    },

    event: {
      type: Object,
      required: true
    }
  },

  data() {
    return {
      valid: false,
      nameRules: [
        v => !!v || "Name is required.",
        v => (v && isAlphanumeric(v)) || "Name can only be alphanumeric."
      ],
      startDateRules: [
        v => !!v || "Start date is required.",
        v =>
          !this.$dateFns.isPast(this.$dateFns.parseISO(v + " " + "23:00")) ||
          "Start date cannot be in the past."
      ],
      startTimeRules: [
        v => !!v || "Start time is required.",
        v =>
          !this.$dateFns.isPast(this.parseStart) ||
          "Start time cannot be in the past."
      ],
      endDateRules: [
        v =>
          (v &&
            this.$dateFns.compareDesc(
              this.$dateFns.parseISO(v),
              this.$dateFns.parseISO(this.event.startDate)
            ) < 1) ||
          "End date cannot be in the past."
      ]
    };
  },

  methods: {
    reset() {
      this.$refs.form.reset();
    },
    dontShow(val) {
      return this.hide.indexOf(val) !== -1;
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

    start: {
      get() {
        return this.event.start || this.event.startDate
          ? this.event.startDate +
              " " +
              (this.event.startTime ? this.event.startTime : "00:00")
          : "";
      }
    },

    end: {
      get() {
        return this.event.end || this.event.endDate
          ? this.event.endDate +
              " " +
              (this.event.endTime ? this.event.endTime : "00:00")
          : this.start;
      }
    },

    parseStart() {
      return this.start ? this.$dateFns.parseISO(this.start) : undefined;
    },

    parseEnd() {
      return this.end ? this.$dateFns.parseISO(this.end) : undefined;
    },

    categories() {
      return this.$store.getters[lists.getters.ITEMS]("categories").filter(
        item => item.name !== "all"
      );
    }
  }
};
</script>
