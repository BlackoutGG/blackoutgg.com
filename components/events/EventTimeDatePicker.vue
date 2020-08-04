<template>
  <v-menu
    v-model="open"
    ref="menu"
    :close-on-content-click="false"
    :return-value.sync="input"
    transition="scale-transition"
    offset-y
    min-width="290px"
    max-width="290px"
  >
    <template v-slot:activator="{ on, attrs }">
      <v-text-field
        v-model="input"
        :label="label"
        :prepend-icon="icon"
        :rules="rules"
        :error-messages="errorMessages"
        readonly
        v-bind="attrs"
        v-on="on"
      ></v-text-field>
    </template>
    <v-date-picker v-model="input" no-title scrolalble v-if="date && !time">
      <v-spacer></v-spacer>
      <v-btn text color="primary" @click="open = false">Cancel</v-btn>
      <v-btn text color="primary" @click="$refs.menu.save(input)">Save</v-btn>
    </v-date-picker>
    <v-time-picker v-model="input" full-width v-else-if="time && !date">
      <v-spacer></v-spacer>
      <v-btn text color="primary" @click="open = false">Cancel</v-btn>
      <v-btn text color="primary" @click="$refs.menu.save(input)">Save</v-btn>
    </v-time-picker>
  </v-menu>
</template>

<script>
export default {
  name: "EventDateAndTime",
  props: {
    value: {
      type: String,
      default: ""
    },
    date: {
      type: Boolean,
      default: true
    },
    time: {
      type: Boolean,
      default: false
    },
    label: {
      type: String
    },
    modifier: {
      type: String
    },

    rules: {
      type: [Function, Object, Array, String]
    }
  },
  data() {
    return {
      open: false,
      innerValue: this.value,
      errorMessages: ""
    };
  },

  watch: {
    modifier(v) {
      const parts = v.split(" ");

      if (parts.length > 1) {
        console.log(parts);
        if (this.date) this.input = parts[0];
        else this.input = parts[1];
      } else {
        this.input = parts[0];
      }
    },
    parsed(v) {
      if (this.$dateFns.isPast(v)) {
        this.errorMessages = `${this.label} cannot be in the past.`;
      } else {
        this.errorMessages = "";
      }
    }
  },

  computed: {
    input: {
      get() {
        return this.value;
      },
      set(val) {
        this.innerValue = val;
        this.$emit("input", val);
      }
    },
    icon() {
      return this.time && !this.date
        ? "mdi-calendar-clock"
        : this.date && !this.time
        ? "mdi-calendar"
        : "mdi-calendar-clock";
    },

    parsed() {
      return this.$dateFns.parseISO(this.modifier);
    }
  }
};
</script>