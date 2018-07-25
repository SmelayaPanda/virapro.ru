<template>
  <div>
    <SupHeader/>
    <el-row id="header">
      <el-col id="logo_wrap" :span="1" :offset="2">
        <img src="~/assets/icons/logo/virapro.svg" alt="Vira Pro Logo" @click="$nuxt.$router.push('/')">
      </el-col>
      <el-col id="algolia_desctop" :md="8" :lg="7" :xl="7" :offset="1">
        <AlgoliaSearch/>
      </el-col>
      <el-col :offset="3" id="routers">
        <div id="selected_route_line"
             :style="{marginLeft: activeRouteLineMargin + 'px', display: displayActiveRoute}"></div>
        <nuxt-link to="/">Главная</nuxt-link>
        <nuxt-link to="/catalog">Каталог</nuxt-link>
        <nuxt-link to="/about">О нас</nuxt-link>
        <nuxt-link to="/account">Аккаунт</nuxt-link>
      </el-col>
      <el-col :xs="5" :sm="4" :md="2" :lg="2" :xl="2" id="cart_wrap">
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
          return 18
        } else if (this.$nuxt.$route.path.includes('/catalog')) {
          return 112
        } else if (this.$nuxt.$route.path === '/about') {
          return 198
        } else if (this.$nuxt.$route.path === '/account') {
          return 286
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
    font-weight: 400;
    color: $color-primary;
    padding: 19px;
    &:hover {
      background: rgba(99, 185, 250, 0.13);
    }
  }

  #logo_wrap {
    span {
      color: $color-primary-light;
      border: 1px solid $color-primary-light;
      padding: 5px 10px;
    }
    img {
      margin-left: -4px;
      margin-top: 2px;
      height: 40px;
      &:hover {
        cursor: pointer;
      }
    }
  }

  #header {
    z-index: 10;
    display: flex;
    align-items: center;
    justify-content: start;
    height: 56px;
    border-bottom: 1px solid $color-primary-light-3;
  }

  #algolia_desctop {
    padding-left: 18px;
  }

  #routers {
    width: 420px;
  }

  #selected_route_line {
    transition: all .3s;
    width: 60px;
    height: 6px;
    background: $color-success;
    border-radius: 3px;
    position: absolute;
    margin-top: -22px;
    -webkit-box-shadow: 0px 4px 12px 0px rgba(161, 181, 204, 1);
    -moz-box-shadow: 0px 4px 12px 0px rgba(161, 181, 204, 1);
    box-shadow: 0px 4px 12px 0px rgba(161, 181, 204, 1);
  }

  #cart_wrap {
    display: flex;
    justify-content: start;
    align-items: center;
    a {
      padding: 9px 28px 9px 20px;
    }
  }

  #cart_icon {
    height: 32px;
  }

  #cart_count_wrap {
    position: absolute;
    margin-top: -41px;
    margin-left: 28px;
    display: flex;
    align-items: center;
    justify-content: center;
    height: 18px;
    width: 18px;
    border-radius: 50%;
    background: $color-primary;
  }

  #cart_count {
    font-size: 10px;
    color: white;
  }

  @media only screen and (max-width: $md-screen) {
    #algolia_desctop {
      padding-left: 28px;
    }
  }

  @media only screen and (max-width: $sm-screen) {
    #algolia_desctop {
      display: none;
    }
  }

  @media only screen and (max-width: $xs-screen) {
    #logo_wrap {
      display: none;
    }
    #routers {
      width: 260px !important;
      margin-left: 10px;
    }
    a {
      padding-right: 5px;
      padding-left: 5px;
    }
    #cart_wrap {
      position: absolute;
      right: 10px;
    }
    #selected_route_line {
      visibility: hidden;
    }
  }
</style>
