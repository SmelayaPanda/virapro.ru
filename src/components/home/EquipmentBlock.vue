<template>
  <el-row id="equipment_block">
    <el-col :xs="24" :sm="22" :md="11" :lg="11" :xl="11" id="equipment_wrap">
      <h2>Сантехническое, отопительное,<br> промышленное оборудование</h2>
      <el-row>
        <el-col v-for="i in 16" :key="i" :xs="8" :sm="6" :md="6" :lg="6" :xl="6" align="center">
          <div id="equipment">{{ i }}</div>
        </el-col>
      </el-row>
      <nuxt-link to="/catalog">
        <el-button class="primary_btn">Перейти в каталог</el-button>
      </nuxt-link>
    </el-col>
    <el-col :xs="24" :sm="22" :md="11" :lg="11" :xl="11" id="services_wrap">
      <h2>Предоставление услуг, <br> консультирование</h2>
      <el-row>
        <el-col v-for="service in $store.getters.SERVICE_TYPES" :key="service.value"
                :xs="22" :sm="12" :md="12" :lg="12" :xl="12" align="center">
          <div :span="24" class="services">
            <h4>{{ service.title }}</h4>
            <p style="padding-left: 5px;">{{ service.description }}</p>
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
  #equipment_block {
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

  #equipment_wrap,
  #services_wrap {
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    align-items: center;
  }

  #equipment_wrap {
    padding-right: 20px;
  }

  #services_wrap {
    button {
      margin-bottom: 25px;
      margin-top: 18px;
    }
  }

  #equipment {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 85px;
    width: 85px;
    margin-bottom: 40px;
    border-radius: 3px;
    @include primaryShadow;
  }

  .services {
    display: flex;
    justify-content: center;
    flex-wrap: wrap;
    padding: 10px;
    height: 171px;
    width: 200px;
    border-radius: 3px;
    @include primaryShadow;
    h4 {
      padding: 5px;
      margin: 0;
      height: 10px;
    }
    p {
      font-size: 14px;
      font-weight: 300;
    }
  }

  @media only screen and (max-width: $sm-screen) {
    #equipment_wrap, #services_wrap {
      padding-right: 0 !important;
    }
  }

  @media only screen and (max-width: $xs-screen) {
    #equipment {
      width: 70px;
      height: 70px;
    }
    .services {
      p {
        font-size: 16px;
      }
    }
  }
</style>
