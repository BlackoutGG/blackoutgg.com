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
        prepend-icon="event"
        readonly
        v-bind="attrs"
        v-on="on"
      ></v-text-field>
    </template>
    <v-date-picker v-model="input" no-title scrolalble v-if="picker === 'date'">
      <v-spacer></v-spacer>
      <v-btn text color="primary" @click="open = false">Cancel</v-btn>
      <v-btn text color="primary" @click="$refs.menu.save(input)">Save</v-btn>
    </v-date-picker>
    <v-time-picker
      v-model="input"
      full-width
      @click="$refs.menu.save(input)"
      v-else-if="picker === 'time'"
    ></v-time-picker>
  </v-menu>
</template>

<script>
export default {
  name: "CalenderPicker",
  props: {
    value: {
      type: String
    },
    picker: {
      type: String,
      default: "date"
    },
    label: {
      type: String
    }
  },
  data() {
    return {
      open: false,
      _input: ""
    };
  },

  computed: {
    input: {
      get() {
        return this.value;
      },
      set(val) {
        this._input = val;
        this.$emit("input", val);
      }
    }
  }
};
</script>