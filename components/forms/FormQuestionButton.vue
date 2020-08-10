<template>
  <div class="add-question d-flex align-center justify-center">
    <v-btn fab small depressed absolute top class="add-question-icon">
      <v-icon>mdi-plus</v-icon>
    </v-btn>
    <span class="black--text">Add another question</span>
  </div>
</template>


<script>
export default {
  name: "AddQuestionButton"
};
</script>

<style lang="scss">
.add-question {
  border-top: 1px solid #555;
  background-color: #f4f4f4;
  height: 90px;
  transition: background-color 0.25s ease;
  position: relative;
  cursor: pointer;
  &:hover {
    background-color: #eee;
    .add-question-icon {
      transition: background-color 0.25s ease;
      background-color: #eee !important;
    }
  }
}
</style>