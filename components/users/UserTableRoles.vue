<template>
  <v-chip-group>
    <v-chip
      small
      pill
      close
      @click:close="remove(role)"
      v-for="(role, idx) in displayedRoles"
      :key="idx"
    >
      <span>{{role.name}}</span>
    </v-chip>
    <truncated-role-menu :truncated="truncated" v-if="truncated.length" @remove="remove" />
    <add-role-menu @add="add"></add-role-menu>
  </v-chip-group>
</template>

<script>
import AddRoleMenu from "./AddRoleMenu.vue";
import TruncatedRoleMenu from "./TruncatedRoleMenu.vue";
export default {
  name: "RoleChipGroup",
  components: { AddRoleMenu, TruncatedRoleMenu },
  props: {
    roles: {
      type: Array
    },
    userId: {
      type: [String, Number]
    },
    display: {
      type: Number,
      default: 3
    }
  },

  data() {
    return {
      // items: [...this.roles, "curator", "agent", "member"]
      items: [
        { id: 1, name: "admin" },
        { id: 2, name: "curator" },
        { id: 3, name: "agent" }
      ]
    };
  },

  methods: {
    remove(item) {
      this.items.splice(this.items.indexOf(item), 1);
    },
    add(item) {
      const idx = this.items.findIndex(i => i.name === item.name);
      if (idx === -1) this.items.push(item);
    }
  },

  computed: {
    end() {
      return this.display > this.items.length
        ? this.items.length
        : this.display;
    },
    displayedRoles() {
      return this.items.length > 1 ? this.items.slice(0, this.end) : this.items;
    },
    truncated() {
      return this.items.slice(this.end, this.items.length);
    }
  }
};
</script>