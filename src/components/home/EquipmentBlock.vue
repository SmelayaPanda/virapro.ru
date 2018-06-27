<template>
  <el-row>
    <el-col :span="12">
      <h2 id="equipment_title">Сантехническое, отопительное,<br> промышленное оборудование</h2>
      <el-row id="equipment_wrap">
        <el-col v-for="i in 16" :key="i" :span="3" :offset="2" id="equipment"></el-col>
      </el-row>
      <el-row type="flex" justify="center">
        <nuxt-link to="/catalog">
          <el-button type="primary">Перейти в каталог</el-button>
        </nuxt-link>
      </el-row>
    </el-col>
    <el-col :span="12">
      <h2 id="services_title">Предоставление услуг</h2>
      <el-row id="services_wrap">
        <el-col v-for="i in 4" :key="i" :span="7" :offset="4">
          <el-row class="services"></el-row>
          <el-row type="flex" justify="center">
            <el-button type="primary" class="get_service_btn">Заказать</el-button>
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
    font-weight: 300;
    font-size: 24px;
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
    -webkit-box-shadow: 0px 4px 12px 0px rgba(99, 185, 250, 0.4);
    -moz-box-shadow: 0px 4px 12px 0px rgba(99, 185, 250, 0.4);
    box-shadow: 0px 4px 12px 0px rgba(99, 185, 250, 0.4);
  }

  .services {
    height: 160px;
    margin-bottom: 80px;
    border-radius: 3px;
    -webkit-box-shadow: 0px 4px 12px 0px rgba(99, 185, 250, 0.4);
    -moz-box-shadow: 0px 4px 12px 0px rgba(99, 185, 250, 0.4);
    box-shadow: 0px 4px 12px 0px rgba(99, 185, 250, 0.4);
  }

  .get_service_btn {
    position: absolute;
    bottom: 0;
    margin-bottom: 20px;
  }

</style>
