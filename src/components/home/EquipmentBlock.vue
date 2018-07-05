<template>
  <el-row id="equipment_block">
    <el-col :xs="24" :sm="22" :md="11" :lg="11" :xl="11" :offset="1">
      <h2 id="equipment_title">Сантехническое, отопительное,<br> промышленное оборудование</h2>
      <el-row id="equipment_wrap">
        <el-col v-for="i in 16" :key="i" :xs="7" :sm="5" :md="5" :lg="5" :xl="5" :offset="1">
          <div id="equipment">{{ i }}</div>
        </el-col>
      </el-row>
      <el-row type="flex" justify="center">
        <nuxt-link to="/catalog">
          <el-button type="primary" id="into_catalog_btn" class="primary_btn">Перейти в каталог</el-button>
        </nuxt-link>
      </el-row>
    </el-col>
    <el-col :xs="24" :sm="22" :md="12" :lg="12" :xl="12">
      <h2 id="services_title">Предоставление услуг, <br> консультирование</h2>
      <el-row id="services_wrap">
        <el-col v-for="service in $store.getters.SERVICE_TYPES" :key="service.value"
                :xs="22" :sm="12" :md="12" :lg="12" :xl="12" align="center">
          <el-row class="services">
            <el-col :span="24">
              <h4 align="center">{{ service.title }}</h4>
            </el-col>
            <el-col :span="24">
              <p style="padding-left: 5px;">{{ service.description }}</p>
            </el-col>
          </el-row>
          <el-row type="flex" justify="center">
            <el-col align="center">
            <el-button class="get_service_btn primary_btn" @click="$bus.$emit('openOrderServiceDialog', service.value)">
              Заказать
            </el-button>
            </el-col>
          </el-row>
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
  }

  #services_title,
  #equipment_title {
    color: $color-primary;
    text-align: center;
    font-weight: 400;
    font-size: 22px;
    margin: 40px;
  }

  #equipment_wrap,
  #services_wrap {
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    padding-right: 20px;
  }

  #equipment {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 80px;
    width: 80px;
    margin-bottom: 30px;
    border-radius: 3px;
    @include primaryShadow;
  }

  .services {
    display: flex;
    justify-content: center;
    flex-wrap: wrap;
    padding: 10px;
    height: 165px;
    width: 200px;
    border-radius: 3px;
    @include primaryShadow;
    h4 {
      padding: 5px;
      margin: 0;
      height: 10px;
    }
    p {
      font-size: 13px;
      font-weight: 300;
    }
  }

  .get_service_btn {
    margin-bottom: 23px;
    margin-top: 19px;
  }

  #into_catalog_btn {
    margin-top: -10px;
    margin-left: -60px;
  }

  @media only screen and (max-width: $sm-screen) {
    #services_wrap {
      padding-right: 0;
    }
  }
    @media only screen and (max-width: $xs-screen) {
    #equipment {
      width: 70px;
      height: 70px;
    }
  }
</style>
