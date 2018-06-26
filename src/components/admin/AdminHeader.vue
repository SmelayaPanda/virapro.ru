<template>
  <el-row type="flex">
    <el-col>
      <span id="admin_panel">Админ-панель</span>
    </el-col>
    <el-col align="right">
      <nuxt-link to="/">
        <el-button id="to_home" size="small" type="success">На сайт</el-button>
      </nuxt-link>
    </el-col>
  </el-row>
</template>

<script>
  export default {
    name: "AdminHeader"
  }
</script>

<style scoped lang="scss">
  #admin_panel {
    font-size: 22px;
  }
</style>
