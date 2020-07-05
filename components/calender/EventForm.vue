<template>
  <v-form v-model="isValid" ref="form">
    <v-container>
      <v-row>
        <v-col cols="6" md="12" sm="12" v-if="name">
          <v-text-field :readonly="readonly" label="Event Name" v-model="event.name"></v-text-field>
        </v-col>
        <v-col cols="6" md="6" sm="12" v-if="start">
          <event-time-date label="Start Date" v-model="event.startDate"></event-time-date>
        </v-col>
        <v-col cols="6" md="6" sm="12" v-if="start">
          <event-time-date label="Start Time" v-model="event.startTime" time :date="false"></event-time-date>
        </v-col>
        <v-col cols="6" md="6" sm="12" v-if="end">
          <event-time-date label="End Date" v-model="event.endDate"></event-time-date>
        </v-col>
        <v-col cols="6" md="6" sm="12" v-if="end">
          <event-time-date label="End Time" v-model="event.endTime" time :date="false"></event-time-date>
        </v-col>
        <v-col cols="12" v-if="description">
          <v-textarea label="Description" filled v-model="event.description"></v-textarea>
        </v-col>
      </v-row>
    </v-container>
  </v-form>
</template>

<script>
import EventTimeDate from "./EventTimeDatePicker.vue";
import EventColor from "./EventColorPicker";
export default {
  name: "EventForm",
  components: { EventTimeDate, EventColor },
  props: {
    readonly: {
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
    color: {
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
    }
  },

  data() {
    return {
      valid: false
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
    }
  }
};
</script>