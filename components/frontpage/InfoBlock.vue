<template>
  <section class="info-block">
    <v-container>
      <v-row :align="alignItems" :justify="justifyContent" :class="rowClasses">
        <v-col md="6" sm="12">
          <div :class="contentClasses">
            <p class="title">{{data.title}}</p>
            <p class="regular">{{data.text}}</p>
          </div>
        </v-col>

        <v-col md="6" sm="12" class="hidden-sm-and-down">
          <div :class="imageClasses">
            <img :src="data.image.src" alt />
          </div>
        </v-col>
      </v-row>
    </v-container>
  </section>
</template>

<script>
export default {
  name: "InfoBlock",
  props: {
    data: {
      type: [Object, Array]
    },
    idx: Number
  },
  data() {
    return {
      alignItems: "center",
      justifyContent: "center"
    };
  },
  computed: {
    row() {
      return this.idx + 1;
    },
    isEven() {
      return this.row % 2 === 0;
    },
    columnClasses() {
      return [];
    },
    contentClasses() {
      return [
        "d-flex flex-column",
        "pt-sm-12 pt-md-0",
        !this.isEven ? "text-left" : "text-right",
        !this.isEven ? "pl-12" : "pr-12"
      ];
    },
    imageClasses() {
      return [
        "d-flex",
        !this.isEven ? "justify-end" : "justify-start",
        "align-center",
        !this.isEven ? "text-left" : "text-right"
      ];
    },
    rowClasses() {
      return [
        "info-row",
        "flex-nowrap",
        {
          "flex-md-row-reverse": this.isEven
        }
      ];
    }
  }
};
</script>

<style lang="scss">
.info-block {
  background: url(https://blackout-gaming.s3.amazonaws.com/Images/webx/black-brush-stroke.webp);
  height: 290px;
  width: 100%;
  // margin-bottom: 8rem;
  // &:first-child {
  //   margin-top: 8rem;
  // }
  .info-row {
    max-height: 250px;
    overflow: visible;
  }
}
</style>