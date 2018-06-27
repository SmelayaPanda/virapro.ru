<template>
  <div>
    <el-row type="flex">
      <el-col :span="12" id="left_side_wrap">
        <el-row class="flex_block">
          <el-col :span="18">
            <h1>Товары для обустройства <br>дома от А до Я</h1>
          </el-col>
          <el-col :span="18">
            <h3>Более <span>5000</span> товаров в наличае</h3>
          </el-col>
          <el-col :span="18">
            <nuxt-link to="/catalog">
              <el-button>Смотреть каталог</el-button>
            </nuxt-link>
          </el-col>
        </el-row>
      </el-col>
      <el-col :span="12" id="rightSide">
        <el-row class="flex_block">
          <el-col :span="18">
            <h1>Консультация и установка <br>оборудования</h1>
          </el-col>
          <el-col :span="18">
            <h3>Более <span>5000</span> товаров в наличае</h3>
          </el-col>
          <el-col :span="18">
            <nuxt-link to="/catalog">
              <el-button>Смотреть каталог</el-button>
            </nuxt-link>
          </el-col>
        </el-row>
      </el-col>
    </el-row>
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
  </div>
</template>

<script>
  export default {
    asyncData() {
      return {}
    },
    components: {},
    methods: {}
  }
</script>

<style scoped lang="scss">
  @mixin block {
    height: 70vh;
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    h1 {
      color: white;
      font-weight: 300;
      font-size: 28px;
    }
    h3 {
      color: white;
      font-weight: 300;
      font-size: 18px;
    }
    span {
      color: $color-success;
    }
  }

  #left_side_wrap {
    background: $color-primary-light;
    @include block;
  }

  #rightSide {
    background: $color-primary;
    @include block;
  }

  .flex_block {
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    margin-top: -20%;
  }

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
    height: 120px;
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
