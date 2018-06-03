<template>
  <el-menu
    id="app_header"
    :default-active="activeIndex"
    class="el-menu-demo"
    mode="horizontal"
    background-color="#409EFF"
    text-color="#fff"
    router
    active-text-color="#fff">
    <el-menu-item index="/">
      Home
    </el-menu-item>
    <el-menu-item index="/products">
      Products
    </el-menu-item>
    <el-menu-item index="/about">
      About
    </el-menu-item>
    <el-menu-item index="/account">
      Account
    </el-menu-item>
  </el-menu>
</template>

<script>
  export default {
    name: 'AppHeader',
    data() {
      return {
        activeIndex: '/home'
      }
    }
  }
</script>

<style scoped lang="scss">
  #app_header {
    display: flex;
    flex-flow: row wrap;
    width: 100%;
    margin-left: auto;
    margin-right: auto;
    align-items: center;
    justify-content: center;
  }

  .el-menu-item {
    font-size: 1.25em;
  }
</style>
