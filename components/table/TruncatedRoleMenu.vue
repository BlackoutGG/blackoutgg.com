<template>
  <v-menu>
    <template v-slot:activator="{ on }">
      <v-chip small pill v-on="on">x{{truncated.length}}</v-chip>
    </template>
    <v-sheet>
      <v-chip-group class="pl-2">
        <v-chip
          pill
          close
          small
          @click:close="$emit('remove', role)"
          v-for="(role, idx) in truncated"
          :key="idx"
        >
          <span>{{role.name}}</span>
        </v-chip>
      </v-chip-group>
    </v-sheet>
  </v-menu>
</template>

<script>
export default {
  name: "TruncatedRoleMenu",
  props: {
    truncated: {
      type: Array,
      default: () => []
    }
  }
};
</script>