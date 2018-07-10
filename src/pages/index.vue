<template>
  <div>
    <div id="desctop_home">
      <SliderBlock/>
      <EquipmentBlock/>
      <WhyWeBlock/>
      <RequestBlock/>
    </div>
    <div id="mobile_home">
      <el-row type="flex" justify="center">
        <el-col :span="20">
          <h1>Сантехника Новосибирск</h1>
          <EquipmentBlock/>
        </el-col>
      </el-row>
    </div>
  </div>
</template>

<script>
  import SliderBlock from "~/components/home/SliderBlock";

  const EquipmentBlock = () => import( /* webpackChunkName: "below-slider" */ "~/components/home/EquipmentBlock")
  const WhyWeBlock = () => import( /* webpackChunkName: "below-slider" */ "~/components/home/WhyWeBlock")
  const RequestBlock = () => import( /* webpackChunkName: "below-slider" */ "~/components/home/RequestBlock")

  export default {
    async fetch({store, params}) {
      await store.dispatch('USER_EVENT', 'Главная страница')
    },
    components: {RequestBlock, WhyWeBlock, EquipmentBlock, SliderBlock},
    methods: {}
  }
</script>

<style lang="scss" scoped>
  #mobile_home {
    display: none;
    h1 {
      color: $color-primary;
    }
  }

  @media only screen and (max-width: $sm-screen) {
    #desctop_home {
      display: none;
    }
  }

  @media only screen and (max-width: $sm-screen) {
    #mobile_home {
      display: block;
    }
  }
</style>

