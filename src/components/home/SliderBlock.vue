<template>
  <el-row type="flex">
    <el-col :span="hoveredProducts && !isSideChanging ? 24 : 12" id="left_side_wrap">
      <el-row>
        <el-col :span="18">
          <h1>Товары для обустройства <br>дома от А до Я</h1>
        </el-col>
        <el-col :span="18">
          <h3>Более <span>5000</span> товаров в наличае</h3>
        </el-col>
        <el-col :span="18">
          <nuxt-link to="/catalog">
            <el-button class="secondary_btn">Смотреть каталог</el-button>
          </nuxt-link>
        </el-col>
        <transition name="fade">
          <el-col v-if="hoveredProducts && !isSideChanging" :span="18">
            <p class="more_text">
              Разнообразный и богатый опыт укрепление и развитие структуры позволяет выполнять
              важные задания по разработке системы обучения кадров, соответствует насущным потребностям. Разнообразный и
              богатый опыт укрепление и развитие структуры способствует подготовки и реализации модели развития. Равным
              образом сложившаяся структура организации играет важную роль в формировании систем массового участия.
            </p>
          </el-col>
        </transition>
      </el-row>
      <div class="slide_starter" @mouseover="hoveredProducts = true" @mouseleave="mouseLeave('hoveredProducts')"></div>
    </el-col>
    <el-col :span="hoveredServices && !isSideChanging ? 24 : 12" id="rightSide">
      <el-row class="flex_block">
        <el-col :span="18">
          <h1>Консультация и установка <br>оборудования</h1>
        </el-col>
        <el-col :span="18">
          <h3>Более <span>5000</span> товаров в наличае</h3>
        </el-col>
        <el-col :span="18">
          <nuxt-link to="/catalog">
            <el-button class="secondary_btn">Смотреть каталог</el-button>
          </nuxt-link>
        </el-col>
        <transition name="fade">
          <el-col v-if="hoveredServices && !isSideChanging" :span="18">
            <p class="more_text">
              Разнообразный и богатый опыт укрепление и развитие структуры позволяет выполнять
              важные задания по разработке системы обучения кадров, соответствует насущным потребностям. Разнообразный и
              богатый опыт укрепление и развитие структуры способствует подготовки и реализации модели развития. Равным
              образом сложившаяся структура организации играет важную роль в формировании систем массового участия.
            </p>
          </el-col>
        </transition>
      </el-row>
      <div class="slide_starter" @mouseover="hoveredServices = true" @mouseleave="mouseLeave('hoveredServices')"></div>
    </el-col>
    <ChoiceRoundBtn :hoveredProducts="hoveredProducts" :hoveredServices="hoveredServices"/>
  </el-row>
</template>
<script>
  import ChoiceRoundBtn from "./ChoiceRoundBtn";

  export default {
    name: 'SliderBlock',
    components: {ChoiceRoundBtn},
    data() {
      return {
        hoveredProducts: false,
        hoveredServices: false,
        isSideChanging: false
      }
    },
    methods: {
      mouseLeave (val) {
        this.isSideChanging = true
        this[val] = false
        setTimeout(() =>  {
          this.isSideChanging = false
        }, 700)
      }
    }
  }
</script>

<style scoped lang="scss">
  @mixin block {
    padding-top: 100px;
    position: relative;
    height: 70vh;
    display: flex;
    flex-wrap: wrap;
    transition: all 1s;
    padding-left: 10%;
    h1 {
      color: white;
      font-weight: 600;
      font-size: 32px;
      margin-bottom: 5px;
    }
    h3 {
      color: white;
      font-weight: 400;
      font-size: 16px;
      margin-bottom: 27px;
    }
    span {
      color: $color-success;
    }
  }

  #left_side_wrap {
    background: linear-gradient(0deg, rgba(99, 185, 250, 0.95), rgba(99, 185, 250, 0.95)), url('~/static/home/product.png');
    background-size: cover;
    @include block;
  }

  #rightSide {
    background: linear-gradient(0deg, rgba(9, 118, 212, 0.95), rgba(9, 118, 212, 0.92)), url('~/static/home/services.png');
    background-size: cover;
    @include block;
  }

  .slide_starter {
    position: absolute;
    bottom: 0;
    left: 0;
    width: 100%;
    height: 200px;
  }

  .more_text {
    font-size: 14px;
    font-weight: 300;
    line-height: 18px;
    color: white;
    width: 600px;
  }
</style>
