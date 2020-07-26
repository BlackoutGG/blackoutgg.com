<template>
  <v-list>
    <v-list-item>
      <v-list-item-content>
        <v-list-item-subtitle>Category</v-list-item-subtitle>
        <v-list-item-title>{{ event.categoryName }}</v-list-item-title>
      </v-list-item-content>
    </v-list-item>
    <v-list-item>
      <v-list-item-icon>
        <v-icon>mdi-clock</v-icon>
      </v-list-item-icon>
      <v-list-item-content>
        <v-list-item-subtitle>
          <span>Start</span>
        </v-list-item-subtitle>
        <v-list-item-title>
          <span>{{ start }}</span>
        </v-list-item-title>
      </v-list-item-content>
    </v-list-item>
    <v-list-item>
      <v-list-item-icon>
        <v-icon>mdi-clock</v-icon>
      </v-list-item-icon>
      <v-list-item-content>
        <v-list-item-subtitle>
          <span>End</span>
        </v-list-item-subtitle>
        <v-list-item-title>
          <span>{{ end }}</span>
        </v-list-item-title>
      </v-list-item-content>
    </v-list-item>
    <v-list-item>
      <v-list-item-content>
        <v-list-item-subtitle>Description</v-list-item-subtitle>
        <span>{{ event.description }}</span>
      </v-list-item-content>
    </v-list-item>
  </v-list>
</template>

<script>
export default {
  name: "EventView",

  props: {
    event: {
      type: Object,
      required: true
    }
  },

  computed: {
    start() {
      return this.$dateFns.parseISO(
        this.event.start || this.event.startDate + " " + this.event.startTime
      );
    },
    end() {
      return this.$dateFns.parseISO(
        this.event.end || this.event.endDate + " " + this.event.endTime
      );
    }
  }
};
</script>
