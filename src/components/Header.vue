<template>
  <div>
    <SupHeader/>
    <el-row id="header">
      <el-col :span="1" :offset="2">
        <span id="logo">ЛОГО</span>
      </el-col>
      <el-col :span="6" :offset="1">
        <AlgoliaSearch/>
      </el-col>
    </el-row>
    <el-menu
      id="app_header"
      :default-active="activeIndex"
      class="el-menu-demo"
      mode="horizontal"
      background-color="white"
      text-color="#004072"
      router
      active-text-color="#004072">
      <el-menu-item index="/">
        Главная
      </el-menu-item>
      <el-menu-item index="/catalog">
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
        <no-ssr>
          <el-badge :value="cartProductCount" class="item"></el-badge>
        </no-ssr>
      </el-menu-item>
    </el-menu>
    <Breadcrumbs v-if="$nuxt.$route.path.includes('/catalog/')"/>
  </div>
</template>

<script>
  import Breadcrumbs from "./catalog/Breadcrumbs";
  import AlgoliaSearch from "./AlgoliaSearch";
  import SupHeader from "./SupHeader";

  export default {
    name: 'AppHeader',
    components: {SupHeader, AlgoliaSearch, Breadcrumbs},
    data() {
      return {
        activeIndex: '/'
      }
    },
    methods: {},
    created() {
      this.activeIndex = this.$nuxt.$route.path
    },
    computed: {
      cartProductCount() {
        if (this.$store.getters.user.cart && !Array.isArray(this.$store.getters.user.cart)) {
          return Object.keys(this.$store.getters.user.cart).length
        } else {
          return 0
        }
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

  #header {
    display: flex;
    align-items: center;
    justify-content: start;
    height: 60px;
    border-bottom: 1px solid $color-primary-light;
  }

  #logo {
    color: $color-primary-light;
    border: 1px solid $color-primary-light;
    padding: 5px 10px;
  }
</style>
