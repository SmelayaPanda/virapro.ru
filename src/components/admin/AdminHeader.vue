<template>
  <el-row id="admin_header">
    <el-col style="width: 282px">
      <span id="admin_panel">Админ-панель</span>
    </el-col>
    <el-col style="width: 150px;">
      <balls-loader v-if="$store.getters.LOADING" style="margin-bottom: 38px;"/>
    </el-col>
    <el-col align="right">
      <nuxt-link to="/">
        <el-button id="to_home" size="small" type="success">На сайт</el-button>
      </nuxt-link>
    </el-col>
  </el-row>
</template>

<script>
  const BallsLoader = () => import("./BallsLoader");
  export default {
    name: "AdminHeader",
    components: {BallsLoader}
  }
</script>

<style scoped lang="scss">
  #admin_panel {
    font-size: 22px;
  }

  #admin_header {
    display: flex;
    justify-content: start;
    align-items: center;
  }
</style>
