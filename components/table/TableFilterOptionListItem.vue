<template>
  <v-list-item v-if="!item.children">
    <v-list-item-content>
      <v-list-item-title>{{ itemName }}</v-list-item-title>
    </v-list-item-content>
    <v-list-item-action>
      <v-switch v-model="computedValue" :multiple="isMultiple" :value="inputValue"></v-switch>
    </v-list-item-action>
  </v-list-item>
  <v-list-group v-model="open" v-else>
    <template v-slot:activator>
      <v-list-item-content>
        <v-list-item-title>{{ itemName }}</v-list-item-title>
      </v-list-item-content>
    </template>
    <table-filter-item
      v-for="(child, idx) in item.children"
      :parent="item"
      :item="child"
      :is-child="true"
      :name="name"
      :key="idx"
    />
  </v-list-group>
</template>

<script>
import filter from "~/utilities/ns/public/filters.js";
import isObject from "lodash/isObject";
export default {
  name: "TableFilterItem",

  props: {
    name: {
      type: String
    },
    item: {
      type: [Object, Array, String, Number, Boolean]
    },
    parent: {
      type: Object
    },
    isChild: {
      type: Boolean,
      default: false
    }
  },

  data() {
    return {
      innerValue: null,
      open: true
    };
  },

  computed: {
    type() {
      return this.isChild ? this.parent.type : this.item.type;
    },
    itemProp() {
      return this.isChild ? this.parent.itemProp : this.item.itemProp;
    },
    itemName() {
      return !this.isChild
        ? this.item.name
        : isObject(this.item)
        ? this.item.name
        : this.item;
    },
    isMultiple() {
      return this.isChild
        ? this.parent.multiple
        : this.item.multiple
        ? this.item.multiple
        : false;
    },
    inputValue() {
      return isObject(this.item) ? this.item[this.itemProp] : this.item;
    },

    computedValue: {
      get() {
        const store = this.$store.getters[filter.getters.GET_FILTER](this.name);
        return store[this.type];
      },
      set(value) {
        this.$store.commit(filter.mutations.SET_FILTER, {
          name: this.name,
          type: this.type,
          value
        });
      }
    }
  }
};
</script>
