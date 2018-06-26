<template>
  <div>
    <el-row id="contacts_row">
      <el-col :span="13" :offset="2">
        <div id="work_time">
          <img src="~/assets/icons/home/calendar.svg" id="work_time_icon" alt="Рабочее время">
          <time>7 дней в неделю с 10<sup>00</sup> до 18<sup>00</sup> часов</time>
        </div>
      </el-col>
      <el-col :span="4" id="address">
        <img src="~/assets/icons/home/location.svg" id="location_icon" alt="Местоположение">
        г. {{ $store.getters.companyInfo.address.city }},
        ул. {{ $store.getters.companyInfo.address.street }},
        д. {{ $store.getters.companyInfo.address.build }}
      </el-col>
      <el-col :span="4" :offset="1" id="phone">
        <img src="~/assets/icons/home/phone.svg" id="phone_icon" alt="Телефон">
        {{ $store.getters.companyInfo.contacts.phone }}
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
      <AlgoliaSearch/>
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

  export default {
    name: 'AppHeader',
    components: {AlgoliaSearch, Breadcrumbs},
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

  .el-menu-item {
    font-size: 1em;
  }

  .item {
    position: absolute;
    margin-top: -12px;
    margin-left: 10px;
  }

  #contacts_row {
    display: flex;
    justify-content: start;
    align-items: center;
    flex-wrap: wrap;
    background: $color-primary-dark;
    height: 44px;
    border-bottom: 2px solid $color-success;
    -webkit-box-shadow: 0px 4px 16px 0px rgba(161,181,204,1);
    -moz-box-shadow: 0px 4px 16px 0px rgba(161,181,204,1);
    box-shadow: 0px 4px 16px 0px rgba(161,181,204,1);
  }

  #phone {
    color: white;
  }

  #facebook,
  #twitter,
  #instagram {
    height: 14px;
    margin: 5px 20px;
  }

  #work_time, #address, #phone {
    display: flex;
    align-items: center;
    color: white;
    font-size: 12px;
    font-weight: 300;
  }

  #work_time_icon {
    height: 20px;
    padding-right: 7px;
  }

  #location_icon {
    height: 18px;
    padding-right: 7px;
  }

  #phone {
    font-weight: 400;
    font-size: 14px;
  }

  #phone_icon {
    height: 18px;
    padding-right: 7px;
  }

  sup {
    font-size: 8px;
    margin-bottom: 5px;
  }

</style>
