<template>
  <v-dialog v-model="open">
    <v-card>
      <v-card-title>Add An Event</v-card-title>
      <v-card-text>
        <!-- <v-form v-model="valid" ref="form">
          <v-row>
            <v-col cols="12">
              <v-text-field label="Event Name" v-model="name"></v-text-field>
            </v-col>
            <v-col cols="6" md="6" sm="6">
              <calender-picker label="'Start Date'" v-model="startDate" :picker="'date'"></calender-picker>
            </v-col>
            <v-col cols="6" md="6" sm="6">
              <calender-picker label="'Start Date'" v-model="startTime" :picker="'time'"></calender-picker>
            </v-col>
            <v-col cols="6" md="6" sm="6">
              <calender-picker label="'End Date'" v-model="endDate"></calender-picker>
            </v-col>
            <v-col cols="6" md="6" sm="6">
              <calender-picker label="'End Time'" v-model="endTime"></calender-picker>
            </v-col>
            <v-col cols="12">
              <v-textarea filled v-model="description"></v-textarea>
            </v-col>
          </v-row>
        </v-form>-->
        <event-form v-model="valid" ref="form" :event="details"></event-form>
      </v-card-text>
      <v-card-actions>
        <v-btn text @click="$refs.form.reset()">Clear</v-btn>
        <v-btn text :disabled="!valid">Save</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
import CalenderPicker from "./CalenderPicker.vue";
import EventForm from "./EventForm.vue";
export default {
  name: "EventDialog",
  components: { CalenderPicker, EventForm },

  data() {
    return {
      open: false,
      valid: false,
      details: {
        name: "",
        startDate: "",
        endDate: "",
        startTime: "",
        endTime: "",
        description: ""
      }
    };
  }
};
</script>