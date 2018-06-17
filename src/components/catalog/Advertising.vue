<template>
  <div id="add_wrap">
    <el-card class="add_card">
      Здесь может быть ваша реклама
    </el-card>
    <el-card class="add_card">
      Здесь может быть ваша реклама
    </el-card>
  </div>
</template>

<script>
  export default {
    name: "Advertising"
  }
</script>

<style scoped lang="scss">
  #add_wrap {
    margin-top: 10px;
    flex: 0 0 300px;
  }

  .add_card {
    color: $color-info;
    display: flex;
    justify-content: center;
    align-items: center;
    height: 300px;
    margin-bottom: 10px;
  }
</style>
