<template>
  <v-list>
    <v-list-item>
      <v-list-item-content>
        <v-list-item-title>
          <span>RVSP</span>
        </v-list-item-title>
        <v-list-item-subtitle>
          <span>Enable participants to sign up for an event.</span>
        </v-list-item-subtitle>
      </v-list-item-content>
      <v-list-item-action>
        <v-switch v-model="_rvsp"></v-switch>
      </v-list-item-action>
    </v-list-item>
  </v-list>
</template>

<script>
export default {
  name: "EventDialogOptions",

  props: {
    rvsp: {
      type: Boolean,
      default: false
    }
  },

  data() {
    return {
      innerValue: this.rvsp
    };
  },

  watch: {
    rvsp(v) {
      if (v !== this.innerValue) {
        this.innerValue = v;
      }
    }
  },

  computed: {
    _rvsp: {
      get() {
        return this.innerValue;
      },
      set(val) {
        this.$emit("update:rvsp", val);
      }
    }
  }
};
</script>