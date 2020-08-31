<template>
  <v-dialog v-model="open" :max-width="modalMaxWidth" v-if="isModal">
    <template #activator="{ on }">
      <v-btn text v-on="on">
        <v-icon left v-text="icon"></v-icon>
        <span>Filters</span>
      </v-btn>
    </template>
    <filter-list :items="filters" :name="name">
      <template #default>
        <v-toolbar>
          <v-toolbar-title>
            <span>Filters</span>
          </v-toolbar-title>
          <v-spacer></v-spacer>
          <v-btn icon>
            <v-icon v-text="icon"></v-icon>
          </v-btn>
        </v-toolbar>
      </template>
      <template #footer>
        <v-card-actions>
          <v-btn depressed color="primary" @click.native="$emit('update')">Save</v-btn>
          <v-spacer></v-spacer>
          <v-btn text @click.native="$emit('reset')">Reset</v-btn>
        </v-card-actions>
      </template>
    </filter-list>
  </v-dialog>
  <v-menu v-model="open" v-else :close-on-content-click="closeOnContentClick" :offset-y="offsetY">
    <template #activator="{ on }">
      <v-btn text v-on="on">
        <v-icon left v-text="icon"></v-icon>
        <span>Filters</span>
      </v-btn>
    </template>
    <filter-list :items="filters" :name="name">
      <template #subheader>
        <v-subheader>FILTERS</v-subheader>
      </template>
      <template #footer>
        <v-card-actions>
          <v-btn depressed color="primary" @click.native="$emit('update')">Save</v-btn>
          <v-spacer></v-spacer>
          <v-btn text @click.native="$emit('reset')">Reset</v-btn>
        </v-card-actions>
      </template>
    </filter-list>
  </v-menu>
</template>

<script>
import FilterList from "./TableFilterOptionList.vue";
export default {
  name: "TableFilterOptions",

  components: {
    FilterList
  },

  props: {
    name: {
      type: String
    },
    filters: {
      type: [Array, Object],
      default: () => []
    },
    modal: {
      type: Boolean,
      default: false
    },
    modalMaxWidth: {
      type: Number,
      default: 500
    },
    cardMaxWidth: {
      type: Number,
      default: 500
    }
  },

  data() {
    return {
      icon: "mdi-filter-variant",
      closeOnContentClick: false,
      maxWidth: 500,
      open: false,
      offsetY: true
    };
  },

  watch: {
    "$vuetify.breakpoint.smAndDown"(newVal, oldVal) {
      if (!newVal && this.open) {
        this.open = false;
        setTimeout(() => (this.open = true), 10);
      }
    }
  },

  computed: {
    isModal() {
      return this.modal || this.$vuetify.breakpoint.smAndDown;
    }
  }
};
</script>