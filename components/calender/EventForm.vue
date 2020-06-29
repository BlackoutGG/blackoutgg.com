<template>
  <v-form v-model="isValid" ref="form">
    <v-row>
      <v-col cols="12">
        <v-text-field label="Event Name" v-model="event.name"></v-text-field>
      </v-col>
      <v-col cols="6" md="6" sm="6">
        <calender-picker label="'Start Date'" v-model="event.startDate" :picker="'date'"></calender-picker>
      </v-col>
      <v-col cols="6" md="6" sm="6">
        <calender-picker label="'Start Date'" v-model="event.startTime" :picker="'time'"></calender-picker>
      </v-col>
      <v-col cols="6" md="6" sm="6">
        <calender-picker label="'End Date'" v-model="event.endDate"></calender-picker>
      </v-col>
      <v-col cols="6" md="6" sm="6">
        <calender-picker label="'End Time'" v-model="event.endTime"></calender-picker>
      </v-col>
      <v-col cols="12">
        <v-textarea filled v-model="event.description"></v-textarea>
      </v-col>
    </v-row>
  </v-form>
</template>

<script>
export default {
  name: "EventForm",

  props: {
    readonly: {
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