<template>
  <v-list-group no-action v-model="open">
    <template v-slot:activator>
      <v-list-item-content>
        <v-list-item-title>{{capitalized}}</v-list-item-title>
      </v-list-item-content>
    </template>
    <v-list-item v-for="(item, key) in items" :key="key">
      <v-list-item-content>
        <role-perm-name :name="item.name" />
      </v-list-item-content>
      <v-list-item-action>
        <v-switch v-model="item.value"></v-switch>
      </v-list-item-action>
    </v-list-item>
  </v-list-group>
</template>

<script>
import RolePermName from "./RolePermName.vue";
export default {
  name: "RolePermList",
  components: { RolePermName },
  props: {
    items: {
      type: [Array, Object]
    },
    title: {
      type: String
    }
  },

  data() {
    return {
      open: true
    };
  },

  computed: {
    capitalized() {
      return (
        "Manage " + this.title.charAt(0).toUpperCase() + this.title.slice(1)
      );
    }
  }
};
</script>