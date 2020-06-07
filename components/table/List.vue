<template>
  <v-sheet>
    <v-row id="headers">
      <v-col v-for="(header, idx) in headers" :key="idx">
        <span class="black--text">{{header}}</span>
      </v-col>
    </v-row>
    <v-row :data-id="`item_${idx}`" align="center" v-for="(item, idx) in items" :key="idx">
      <v-col v-for="(value, key) in item" :key="key">
        <span class="black--text">{{value}}</span>
      </v-col>
      <v-col>
        <v-btn text>
          <v-icon>mdi-dot-vertical</v-icon>
        </v-btn>
      </v-col>
    </v-row>
  </v-sheet>
</template>