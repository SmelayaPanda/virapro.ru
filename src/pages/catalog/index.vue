<template>
  <div id="wrap">
    <el-row id="catalog_wrap">
      <el-col :span="8" id="catalog_title">
        <h1><span>Каталог</span><br>сантехнического и<br>отопительного<br>оборудования</h1>
      </el-col>
      <el-col
        :span="8"
        v-for="(group, idx) in $store.getters.PRODUCT_TREE" :key="group.value"
        v-if="group.value !== 'all-products'">
        <div class="catalog_card" @click="$nuxt.$router.push(`/catalog/${group.value}`)">
          <img src="~/assets/icons/admin/attach_file.svg" alt="">
          <p>{{idx}}. {{ group.label }}</p>
        </div>
      </el-col>
    </el-row>
    <h2 id="service_title">Дополнителные услуги</h2>
    <div id="divider"></div>
    <el-row id="services_wrap">
      <el-col :span="6" v-for="i in 4" :key="i" class="service">
        <p>ФОТО {{ i }}</p>
        <h3>Некоторая услуга</h3>
        <p>
          Разнообразный и богатый опыт укрепление и развитие структуры позволяет выполнять важные задания по разработке
          системы обучения кадров, соответствует насущным потребностям.
        </p>
        <el-button class="primary_btn">Заказать</el-button>
      </el-col>
    </el-row>
  </div>
</template>

<script>
  export default {}
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
    transition: all .3s;
    margin: 10px;
    border: 1px solid $color-primary-light;
    padding: 10px 10px 10px 20px;
    border-radius: 5px;
    &:hover {
      cursor: pointer;
      background: $color-primary;
      border: $color-primary;
      color: white;
      @include secondaryShadow;
    }
    img {
      margin-right: 10px;
    }
  }

  #service_title {
    margin-top: 40px;
    color: $color-primary;
    text-align: center;
  }

  #services_wrap {
    display: flex;
    justify-content: center;
    flex-wrap: wrap;
    margin-top: 60px;
    h3 {
      color: $color-primary;
      padding: 10px;
    }
    p {
      padding: 10px;
    }
    button {
      margin-left: 50px;
    }
    .service {
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
</style>
