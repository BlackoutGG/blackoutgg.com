<template>
  <v-menu>
    <template v-slot:activator="{ on }">
      <v-icon v-on="on">mdi-dots-vertical</v-icon>
    </template>
    <v-list dense flat>
      <v-list-item>
        <v-list-item-icon>
          <v-icon right>mdi-account-edit</v-icon>
        </v-list-item-icon>
        <v-list-item-content>
          <v-list-item-title>Edit</v-list-item-title>
        </v-list-item-content>
      </v-list-item>
      <v-list-item>
        <v-list-item-icon>
          <v-icon right>mdi-account-edit</v-icon>
        </v-list-item-icon>
        <v-list-item-content>
          <v-list-item-title>Edit</v-list-item-title>
        </v-list-item-content>
      </v-list-item>
      <v-list-item>
        <v-list-item-icon>
          <v-icon right>mdi-account-edit</v-icon>
        </v-list-item-icon>
        <v-list-item-content>
          <v-list-item-title>Edit</v-list-item-title>
        </v-list-item-content>
      </v-list-item>
    </v-list>
  </v-menu>
</template>

<script>
export default {
  name: "TableActions",
  props: {
    item: Object
  }
};
</script>