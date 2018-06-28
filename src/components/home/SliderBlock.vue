<template>
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
</template>
<script>
  export default {
    name: 'SliderBlock'
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
      font-weight: 600;
      font-size: 28px;
    }
    h3 {
      color: white;
      font-weight: 400;
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

</style>
