<template>
  <div>
    <div id="contacts">
      <span id="phone">+777 2345 7885</span>
      <i class="work_time">7 ДНЕЙ В НЕДЕЛЮ С 10 ДО 18 ЧАСОВ</i>
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
        Главная
      </el-menu-item>
      <el-menu-item index="/shop">
        Товары
      </el-menu-item>
      <el-menu-item index="/about">
        О нас
      </el-menu-item>
      <el-menu-item index="/account">
        Аккаунт
      </el-menu-item>
      <el-menu-item index="/cart">
        Корзина
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
    },
    created () {
      this.activeIndex = this.$nuxt.$route.path
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
