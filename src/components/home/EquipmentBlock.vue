<template>
  <el-row class="equipment_block">
    <el-col :xs="24" :sm="22" :md="11" :lg="11" :xl="11" class="equipment_wrap">
      <h2>Сантехническое, отопительное,<br> промышленное оборудование</h2>
      <el-row>
        <el-col
          v-if="group.value !== 'all-products'"
          v-for="(group, idx) in $store.getters.PRODUCT_TREE" :key="group.value"
          :xs="8" :sm="6" :md="6" :lg="6" :xl="6" align="center">
          <div class="tooltip equipment" @click="$nuxt.$router.push(`/catalog/${group.value}/`)">
            <img :src="`catalog/${group.value}.svg`" :alt="group.label">
            <span class="tooltiptext">{{ group.label }}</span>
          </div>
        </el-col>
      </el-row>
      <nuxt-link to="/catalog">
        <el-button class="primary_btn">Перейти в каталог</el-button>
      </nuxt-link>
    </el-col>
    <el-col :xs="24" :sm="22" :md="11" :lg="11" :xl="11" class="services_wrap">
      <h2>Предоставление услуг, <br> консультирование</h2>
      <el-row>
        <el-col v-for="service in $store.getters.SERVICE_TYPES" :key="service.value"
                :xs="22" :sm="12" :md="12" :lg="12" :xl="12" align="center">
          <div :span="24" class="services">
            <h4>{{ service.title }}</h4>
            <img :src="`services/${service.value}.svg`" :alt="service.title">
            <p>{{ service.description }}</p>
          </div>
          <div align="center">
            <el-button class="primary_btn" @click="$bus.$emit('openOrderServiceDialog', service.value)">
              Заказать
            </el-button>
          </div>
        </el-col>
      </el-row>
    </el-col>
  </el-row>
</template>
<script>
  export default {
    name: 'EquipmentBlock'
  }
</script>
<style scoped lang="scss">
  .tooltip {
    position: relative;
  }

  .tooltip .tooltiptext {
    transition: all .5s;
    font-size: 16px;
    font-weight: 300;
    opacity: 0;
    width: 150px;
    background-color: $color-secondary-light;
    color: white;
    border: 1px solid $color-success-dark;
    text-align: center;
    border-radius: 30px;
    padding: 10px;

    /* Position the tooltip */
    position: absolute;
    left: -36px;
    top: 76px;
    z-index: 1;
  }

  .tooltip:hover .tooltiptext {
    transition: all .5s;
    opacity: 1;
  }

  .equipment_block {
    display: flex;
    justify-content: center;
    flex-wrap: wrap;
    h2 {
      color: $color-primary;
      text-align: center;
      font-weight: 400;
      font-size: 22px;
      margin: 40px;
    }
  }

  .equipment_wrap,
  .services_wrap {
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    align-items: center;
  }

  .equipment_wrap {
    padding-right: 20px;
  }

  .services_wrap {
    padding-top: 10px;
    button {
      margin-bottom: 28px;
      margin-top: 20px;
    }
  }

  .equipment {
    transition: all .5s;
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100px;
    width: 100px;
    margin-bottom: 40px;
    border-radius: 3px;
    @include primaryShadow;
    img {
      height: 90px;
    }
    &:hover {
      cursor: pointer;
      background: $color-primary-light-3;
    }
  }

  .services {
    transition: all .5s;
    display: flex;
    justify-content: center;
    flex-wrap: wrap;
    padding: 10px;
    height: 198px;
    width: 198px;
    border-radius: 3px;
    @include primaryShadow;
    h4 {
      padding: 5px;
      margin: 0;
      height: 10px;
    }
    p {
      display: none;
      font-size: 16px;
      font-weight: 300;
    }
    img {
      height: 120px;
    }
    &:hover {
      transition: all .5s;
      img {
        display: none;
      }
      p {
        display: flex;
      }
    }
  }

  @media only screen and (max-width: $sm-screen) {
    .equipment_wrap, .services_wrap {
      padding-right: 0 !important;
    }
  }

  @media only screen and (max-width: $xs-screen) {
    .equipment {
      width: 74px;
      height: 74px;
    }
    .services {
      p {
        font-size: 16px;
      }
    }
  }
</style>
