<template>
  <div id="about">
    <el-row id="about_title">
      <el-col :offset="2">
        <h1>О НАС И НАШИХ ВОЗМОЖНОСТЯХ</h1>
      </el-col>
    </el-row>
    <el-row id="about_content">
      <el-col :span="11" :offset="2">
        <el-row type="flex">
          <el-col style="width: 40px">
            <div class="pulsing_wrap">
              <div class="pulsing-circle"></div>
            </div>
          </el-col>
          <el-col :span="10">
            <h2>О компании</h2>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="24">
            <p>
              Компания начала свою деятельность в Туле в 1995 году, головной офис ГК Эльф и по сей день находится в
              городе
              оружейников. В десяти городах России Группа Компаний представлена филиалами — в Санкт-Петербурге,
              Ярославле,
              Самаре, Воронеже, Волгограде, Нижнем Новгороде, Омске, Екатеринбурге, Новосибирске и Красноярске. Продажи
              осуществляются нами по всей России — от Калининграда до Сахалина, а также — в Белоруссию и Казахстан.
            </p>
          </el-col>
        </el-row>
        <el-row type="flex" style="margin-top: 30px;">
          <el-col style="width: 40px">
            <div class="pulsing_wrap">
              <div class="pulsing-circle"></div>
            </div>
          </el-col>
          <el-col :span="14">
            <h2>О наших возможностях</h2>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="24">
            <p>
              Компания начала свою деятельность в Туле в 1995 году, головной офис ГК Эльф и по сей день находится в
              городе
              оружейников. В десяти городах России Группа Компаний представлена филиалами — в Санкт-Петербурге.
            </p>
          </el-col>
        </el-row>
      </el-col>
      <el-col :span="11">
        <!-- EMPTY-->
      </el-col>
    </el-row>
    <el-row type="flex" justify="start">
      <el-col :span="16" :offset="3">
        <Reviews></Reviews>
      </el-col>
    </el-row>
  </div>
</template>

<script>
  import Reviews from "@/components/about/Reviews";

  export default {
    components: {Reviews},
    async asyncData() {
      return {
        renderSource: process.static ? 'static' : (process.server ? 'server' : 'client')
      }
    },
    methods: {
      reloadPage() {
        window.location.reload()
      }
    }
  }
</script>

<style scoped lang="scss">
  #about {
    background: url("~/static/about/plumber.png") no-repeat top right;
    background-size: 100vw;
  }

  #about_title {
    display: flex;
    justify-content: start;
    align-items: center;
    height: 140px;
    color: white;
    background: url("~/static/about/pattern.png");
    background-size: cover;
    h1 {
      font-size: 22px;
      font-weight: 500;
    }
  }

  #about_content {
    display: flex;
    justify-content: start;
    align-items: center;
    margin-top: 30px;
    h2 {
      position: relative;
      color: $color-primary;
      padding-left: 64px;
    }
    p {
      font-weight: 300;
      line-height: 22px;
    }
  }

  .pulsing_wrap {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 45px;
    height: 45px;
    margin-top: 10px;
    position: relative;
    border: 1px solid $color-primary-light;
    border-radius: 50%;
    &:after {
      content: "";
      position: absolute;
      top: 20px;
      left: 45px;
      width: 50px;
      height: 2px;
      border-bottom: 1px solid $color-primary;
    }
  }

  .pulsing-circle {
    position: absolute;
    width: 15px;
    height: 15px;
    top: 15px;
    &:before {
      content: "";
      position: relative;
      display: block;
      width: 300%;
      height: 300%;
      box-sizing: border-box;
      margin-left: -100%;
      margin-top: -100%;
      border-radius: 45px;
      border: 5px solid $color-primary-light;
      animation: pulse-ring 2s cubic-bezier(0.215, 0.61, 0.355, 1) infinite;
    }
    &:after {
      content: "";
      position: absolute;
      left: 0;
      top: 0;
      display: block;
      width: 100%;
      height: 100%;
      background-color: #FFF;
      border-radius: 15px;
      box-shadow: 0px 0px 0px 4px $color-primary, 0px 0px 2px 6px #fff;
      animation: pulse-dot 2s cubic-bezier(0.455, 0.03, 0.515, 0.955) -0.4s infinite;
    }
  }

  @keyframes pulse-ring {
    0% {
      transform: scale(0.5);
    }
    80%,
    100% {
      opacity: 0;
    }
  }

  @keyframes pulse-dot {
    0% {
      transform: scale(0.8);
    }
    50% {
      transform: scale(1);
    }
    100% {
      transform: scale(0.8);
    }
  }
</style>
