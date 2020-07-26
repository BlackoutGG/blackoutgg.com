<template>
  <div class="or">
    <div class="or-line"></div>
    <div class="or-text">OR</div>
    <div class="or-line"></div>
  </div>
</template>

<script>
export default {
  name: "OrDivider",
};
</script>

<style lang="scss">
.or {
  display: flex;
  padding-top: 24px;
  align-items: center;
  .or-line {
    border: 2px solid #303030;
    height: 0px;
    width: 100%;
    flex: 1 1 0;
  }
  .or-text {
    padding: 0 0.75rem;
    background-color: transparent;
    color: #fff;
    font-weight: 700px;
  }
}
</style>
