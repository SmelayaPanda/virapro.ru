<template>
  <el-row id="title">
    <el-col :offset="2">
      <h1>
        <slot name="title"></slot>
      </h1>
    </el-col>
  </el-row>
</template>
<script>
  export default {
    name: 'RouterHeader'
  }
</script>
<style scoped lang="scss">
  #title {
    display: flex;
    justify-content: start;
    align-items: center;
    height: 140px;
    color: white;
    background: url("~/static/about/pattern.png");
    background-size: cover;
    h1 {
      font-size: 22px;
      font-weight: 500;
    }
  }
</style>
