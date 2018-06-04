<template>
  <el-menu
    id="app_header"
    :default-active="activeIndex"
    class="el-menu-demo"
    mode="horizontal"
    background-color="#015ba2"
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
    <el-menu-item index="/cart">
      Cart
      <el-badge :value="2" class="item"></el-badge>
    </el-menu-item>
  </el-menu>
</template>

<script>
  export default {
    name: 'AppHeader',
    data() {
      return {
        activeIndex: '/'
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
    font-size: 1em;
  }

  .item {
    position: absolute;
    margin-top: -12px;
    margin-left: 10px;
  }
</style>
