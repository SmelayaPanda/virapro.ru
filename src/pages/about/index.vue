<template>
  <div id="about">
    <RouterHeader>
      <div slot="title">О НАС И НАШИХ ВОЗМОЖНОСТЯХ</div>
    </RouterHeader>
    <el-row id="about_content">
      <el-col :xs="24" :sm="16" :md="13" :lg="11" :xl="10" :offset="2">
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
      <el-col :xs="1" :sm="1" :md="9" :lg="11" :xl="11">
        <!-- EMPTY-->
      </el-col>
    </el-row>
    <el-row type="flex" justify="start">
      <el-col :xs="24" :sm="20" :md="18" :lg="16" :xl="15" :offset="3">
        <Reviews id="reviews"></Reviews>
      </el-col>
    </el-row>
  </div>
</template>

<script>
  import Reviews from "@/components/about/Reviews";
  import RouterHeader from "@/components/RouterHeader";

  export default {
    components: {RouterHeader, Reviews},
    async fetch({store, params}) {
      await store.dispatch('ANCHOR', params.ANCHOR)
      await store.dispatch('USER_EVENT', 'Страница: О нас')
    },
    methods: {
      reloadPage() {
        window.location.reload()
      }
    },
    mounted() {
      if (this.$store.getters.ANCHOR === '#reviews') { // stupid solution for scrolling to services
        this.$scrollTo('#reviews')
        this.$store.dispatch('ANCHOR', '')
      }
    }
  }
</script>

<style scoped lang="scss">
  #about {
    background: url("~/static/about/plumber.png") no-repeat top right;
    background-size: 100vw;
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

  @media only screen and (max-width: $sm-screen) {
    #reviews {
      display: none;
    }
    #about {
      background: none;
    }
  }
</style>
