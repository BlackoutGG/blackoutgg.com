<template>
  <section id="event-options">
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
      <v-list-item>
        <v-list-item-content>
          <v-list-item-title>
            <span>Event Visibility</span>
          </v-list-item-title>
          <v-list-item-subtitle>
            <span>Enable to choose which roles can see this event. Defaults to member if disabled.</span>
          </v-list-item-subtitle>
        </v-list-item-content>
        <v-list-item-action>
          <!-- <v-switch v-model="_rvsp"></v-switch> -->
          <event-switch v-model="showRoles"></event-switch>
        </v-list-item-action>
      </v-list-item>
    </v-list>
    <event-scroller :endpoint="'/api/roles'" v-if="showRoles">
      <template #default="{ item }">
        <v-list-item>
          <v-list-item-content>
            <v-list-item-title>{{ item.name }}</v-list-item-title>
          </v-list-item-content>
          <v-list-item-action>
            <v-checkbox multiple v-model="roles" :true-value="item.id" :value="item.id"></v-checkbox>
          </v-list-item-action>
        </v-list-item>
      </template>
    </event-scroller>
  </section>
</template>

<script>
import EventSwitch from "./EventSwitch.vue";
import EventScroller from "./EventScroller.vue";
export default {
  name: "EventDialogOptions",
  components: { EventSwitch, EventScroller },
  props: {
    rvsp: {
      type: Boolean,
      default: false
    }
  },

  data() {
    // return {
    //   innerValue: this.rvsp
    // };
    return {
      showRoles: false,
      roles: [3]
    };
  },

  // watch: {
  //   rvsp(v) {
  //     if (v !== this.innerValue) {
  //       this.innerValue = v;
  //     }
  //   }
  // },

  computed: {
    _rvsp: {
      get() {
        return this.rvsp;
      },
      set(val) {
        this.$emit("update:rvsp", val);
      }
    }
  }
};
</script>