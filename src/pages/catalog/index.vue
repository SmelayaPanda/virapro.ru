<template>
  <div id="wrap">
    <el-row id="catalog_wrap">
      <el-col :xs="24" :sm="12" :md="12" :lg="8" :xl="8" id="catalog_title">
        <h1 v-scroll-to="'#service_title'"><span>Каталог</span><br>сантехнического и<br>отопительного<br>оборудования
        </h1>
      </el-col>
      <el-col
        :xs="24" :sm="12" :md="12" :lg="8" :xl="8"
        v-for="(group, idx) in $store.getters.PRODUCT_TREE" :key="group.value"
        v-if="group.value !== 'all-products'">
        <div class="catalog_card" @click="$nuxt.$router.push(`/catalog/${group.value}`)">
          <div class="group_img_wrap">
            <img :src="`catalog/${group.value}.svg`" :alt="group.title">
          </div>
          <p>{{ group.label }}</p>
        </div>
      </el-col>
    </el-row>
    <h2 id="service_title">Дополнителные услуги</h2>
    <div id="divider"></div>
    <el-row id="services_wrap">
      <el-col :xs="24" :sm="12" :md="12" :lg="6" :xl="6" align="center"
              v-for="service in $store.getters.SERVICE_TYPES" :key="service.value">
        <img :src="`services/${service.value}.svg`" :alt="service.title" height="100px">
        <div class="service_title">
          <h3>{{ service.title }}</h3>
        </div>
        <div class="service_descr">
          <p>{{ service.description }}</p>
        </div>
        <el-button class="primary_btn" @click="$bus.$emit('openOrderServiceDialog', service.value)">Заказать</el-button>
      </el-col>
    </el-row>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        params: ''
      }
    },
    async fetch({store, params}) {
      await store.dispatch('ANCHOR', params.ANCHOR)
      await store.dispatch('USER_EVENT', 'Страница: Каталог')
    },
    mounted() {
      if (this.$store.getters.ANCHOR === '#service_title') { // stupid solution for scrolling to services
        this.$scrollTo('#service_title')
        this.$store.dispatch('ANCHOR', '')
      }
    }
  }
</script>

<style scoped lang="scss">
  #wrap {
    margin-right: 100px;
    margin-left: 100px;
  }

  #catalog_wrap {
    display: flex;
    justify-content: center;
    flex-wrap: wrap;
    margin-top: 120px;
    a {
      color: $color-secondary;
    }
  }

  #catalog_title {
    margin-top: -90px;
    height: 170px;
    background: url("~/static/catalog/tap.svg") no-repeat;
    background-size: contain;
    letter-spacing: 2px;
    padding-left: 58px;
    margin-bottom: 10px;
    h1 {
      font-size: 24px;
      font-weight: 900;
      color: $color-secondary;
    }
    span {
      font-size: 30px;
      font-weight: 900;
      color: $color-primary;
    }
  }

  .catalog_card {
    display: flex;
    justify-content: start;
    align-items: center;
    height: 60%;
    transition: all .3s;
    margin: 10px;
    border: 1px solid $color-primary-light;
    padding: 10px 10px 10px 20px;
    border-radius: 5px;
    &:hover {
      cursor: pointer;
      background: $color-primary;
      border: 1px solid $color-primary;
      color: white;
      @include secondaryShadow;
      img {
        display: none;
      }
    }
    .group_img_wrap {
      display: flex;
      justify-content: center;
      align-items: center;
      width: 74px;
      img {
        height: 70px;
        margin-right: 10px;
      }
    }
  }

  #service_title {
    margin-top: 40px;
    color: $color-primary;
    text-align: center;
  }

  #services_wrap {
    position: relative;
    display: flex;
    justify-content: center;
    flex-wrap: wrap;
    margin-top: 40px;
    .service_title {
      h3 {
        color: $color-primary;
        padding: 10px;
      }
    }
    .service_descr {
      padding-bottom: 10px;
      height: 25%;
      p {
        text-align: left;
        font-size: 14px;
        padding: 10px 10px 10px 30px;
      }
    }
    button {
      margin-top: 10px;
      margin-bottom: 30px;
    }
  }

  #divider {
    overflow: hidden;
    position: relative;
    text-align: center;
    padding: 10px;
    margin: 0 20px 20px;
    &:after {
      content: "";
      position: absolute;
      border-bottom: 9px dashed $color-primary-light-2;
      top: -6px;
      bottom: -6px;
      left: -6px;
      right: -6px;
    }
  }

  @media only screen and (max-width: $xs-screen) {
    #wrap {
      margin-right: 20px;
      margin-left: 20px;
    }
    .service_descr {
      p {
        font-size: 16px !important;
      }
    }
  }
</style>
