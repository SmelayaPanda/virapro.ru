<template>
  <div>
    <div id="contacts">
      <span id="phone">+777 2345 7885</span>
      <i class="work_time">7 DAYS A WEEK FROM 10 AM TO 6 PM</i>
      <div>
        <img id="facebook" src="~/assets/icons/social/facebook-logo.svg" alt="Facebook">
        <img id="twitter" src="~/assets/icons/social/twitter-logo.svg" alt="Twitter">
        <img id="instagram" src="~/assets/icons/social/instagram-logo.svg" alt="Instagram">
      </div>
    </div>
    <el-menu
      id="app_header"
      :default-active="activeIndex"
      class="el-menu-demo"
      mode="horizontal"
      background-color="#1976d2"
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
  </div>
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

  #contacts {
    display: flex;
    justify-content: space-evenly;
    align-items: center;
    flex-wrap: wrap;
    background: $color-secondary;
    padding: 5px;
  }

  #phone {
    color: white;
    margin: 5px;
  }

  #facebook,
  #twitter,
  #instagram {
    height: 14px;
    margin: 5px 20px;
  }

  .work_time {
    color: white;
  }
</style>
