<template>
  <v-menu v-model="open">
    <template #activator="{ on }">
      <v-btn
        v-on="on"
        :small="small"
        :large="large"
        :x-small="xSmall"
        :medium="medium"
        :outlined="outlined"
        :fill="fill"
      >{{innerValue}}</v-btn>
    </template>
    <v-list>
      <v-list-item v-for="(item, key) in items" :key="key" @click="onClick(item)">
        <v-list-item-icon v-if="item.icon">
          <v-icon>{{item.icon}}</v-icon>
        </v-list-item-icon>
        <v-list-item-content>
          <v-list-item-title>{{ item[itemText] }}</v-list-item-title>
        </v-list-item-content>
      </v-list-item>
    </v-list>
  </v-menu>
</template>

<script>
export default {
  name: "SelectMenu",

  props: {
    value: {
      type: String
    },
    items: {
      type: [Object, Array]
    },
    itemValue: {
      type: String,
      default: "type"
    },
    itemText: {
      type: String,
      default: "name"
    },
    xSmall: {
      type: Boolean,
      default: false
    },
    small: {
      type: Boolean,
      default: false
    },
    large: {
      type: Boolean,
      default: false
    },

    medium: {
      type: Boolean,
      default: true
    },

    outlined: {
      type: Boolean,
      default: true
    },
    fill: {
      type: Boolean,
      default: false
    }
  },

  data() {
    return {
      open: false,
      innerValue: ""
    };
  },

  created() {
    const itemText = this.itemText;
    const first = this.items[0];
    if (this.value) {
      const v = this.items.find(item => item.type === this.value);
      if (v) this.innerValue = v.name;
      this.$emit("input", this.value);
    } else {
      this.innerValue = first[itemText];
    }
  },

  methods: {
    onClick(item) {
      this.$emit("input", item[this.itemValue]);
      this.innerValue = item[this.itemText];
    }
  }
};
</script>