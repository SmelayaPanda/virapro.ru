<template>
  <el-row>
    <el-col :span="12">
      <h2 id="equipment_title">Сантехническое, отопительное,<br> промышленное оборудование</h2>
      <el-row id="equipment_wrap">
        <el-col v-for="i in 16" :key="i" :span="3" :offset="2" id="equipment"></el-col>
      </el-row>
      <el-row type="flex" justify="center">
        <nuxt-link to="/catalog">
          <el-button type="primary" id="into_catalog_btn" class="primary_btn">Перейти в каталог</el-button>
        </nuxt-link>
      </el-row>
    </el-col>
    <el-col :span="12">
      <h2 id="services_title">Предоставление услуг, <br> консультирование</h2>
      <el-row id="services_wrap">
        <el-col v-for="service in $store.getters.SERVICE_TYPES" :key="service.value" :span="7" :offset="4">
          <el-row class="services"></el-row>
          <el-row type="flex" justify="center">
            <el-button class="get_service_btn primary_btn" @click="$bus.$emit('openOrderServiceDialog', service.value)">
              Заказать
            </el-button>
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
  }

  #equipment {
    height: 80px;
    margin-bottom: 30px;
    border-radius: 3px;
    @include primaryShadow
  }

  .services {
    height: 165px;
    margin-bottom: 80px;
    border-radius: 3px;
    @include primaryShadow
  }

  .get_service_btn {
    position: absolute;
    bottom: 0;
    margin-bottom: 20px;
  }

  #into_catalog_btn {
    margin-top: -10px;
    margin-left: -60px;
  }
</style>
