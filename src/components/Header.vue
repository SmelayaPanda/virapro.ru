<template>
  <div>
    <SupHeader/>
    <el-row id="header">
      <el-col :span="1" :offset="2">
        <span id="logo">ЛОГО</span>
      </el-col>
      <el-col :span="7" :offset="1">
        <AlgoliaSearch/>
      </el-col>
      <el-col style="width: 420px" :offset="3">
        <div id="selected_route_line"
             :style="{marginLeft: activeRouteLineMargin + 'px', display: displayActiveRoute}"></div>
        <nuxt-link to="/">Главная</nuxt-link>
        <nuxt-link to="/catalog">Каталог</nuxt-link>
        <nuxt-link to="/about">О нас</nuxt-link>
        <nuxt-link to="/account">Аккаунт</nuxt-link>
      </el-col>
      <el-col :span="2" id="cart_wrap">
        <nuxt-link to="/cart">
          <img src="~/assets/icons/home/shopping-cart.svg" id="cart_icon" alt="Корзина">
          <no-ssr>
            <div id="cart_count_wrap">
              <span id="cart_count">+{{ cartProductCount }}</span>
            </div>
          </no-ssr>
        </nuxt-link>
      </el-col>
    </el-row>
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
        activeIndex: '/',
        displayActiveRoute: 'block'
      }
    },
    methods: {},
    created() {
      this.activeIndex = this.$nuxt.$route.path
    },
    computed: {
      cartProductCount() {
        if (this.$store.getters.user.cart && !Array.isArray(this.$store.getters.user.cart)) {
          return Object.keys(this.$store.getters.user.cart).length < 10 ?
            Object.keys(this.$store.getters.user.cart).length : '>'
        } else {
          return 0
        }
      },
      activeRouteLineMargin() {
        this.displayActiveRoute = 'block'
        if (this.$nuxt.$route.path === '/') {
          return 19
        } else if (this.$nuxt.$route.path.includes('/catalog')) {
          return 114
        } else if (this.$nuxt.$route.path === '/about') {
          return 202
        } else if (this.$nuxt.$route.path === '/account') {
          return 290
        } else {
          this.displayActiveRoute = 'none'
        }
      }
    }
  }
</script>

<style scoped lang="scss">
  a {
    font-size: 15px;
    font-weight: 500;
    color: $color-primary;
    padding: 19px;
    &:hover {
      background: rgba(99, 185, 250, 0.13);
    }
  }

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
    z-index: 10;
    display: flex;
    align-items: center;
    justify-content: start;
    height: 56px;
    -webkit-box-shadow: 0px 4px 12px 0px rgba(99, 185, 250, 0.4);
    -moz-box-shadow: 0px 4px 12px 0px rgba(99, 185, 250, 0.4);
    box-shadow: 0px 4px 12px 0px rgba(99, 185, 250, 0.4);
  }

  #logo {
    color: $color-primary-light;
    border: 1px solid $color-primary-light;
    padding: 5px 10px;
  }

  #selected_route_line {
    transition: all .3s;
    width: 60px;
    height: 6px;
    background: $color-success;
    border-radius: 3px;
    position: absolute;
    margin-top: -23px;
    -webkit-box-shadow: 0px 4px 12px 0px rgba(161, 181, 204, 1);
    -moz-box-shadow: 0px 4px 12px 0px rgba(161, 181, 204, 1);
    box-shadow: 0px 4px 12px 0px rgba(161, 181, 204, 1);
  }

  #cart_wrap {
    display: flex;
    justify-content: start;
    align-items: center;
    a {
      padding: 9px 28px 8px 20px;
    }
  }

  #cart_icon {
    height: 36px;
  }

  #cart_count_wrap {
    position: absolute;
    margin-top: -41px;
    margin-left: 28px;
    display: flex;
    align-items: center;
    justify-content: center;
    height: 17px;
    width: 17px;
    border-radius: 50%;
    background: $color-primary;
  }

  #cart_count {
    font-size: 10px;
    color: white;
  }
</style>
