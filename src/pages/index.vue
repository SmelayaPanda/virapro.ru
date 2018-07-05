<template>
  <div id="desctop_home">
    <SliderBlock/>
    <EquipmentBlock/>
    <WhyWeBlock/>
    <RequestBlock/>
  </div>
</template>

<script>
  import SliderBlock from "../components/home/SliderBlock";
  import EquipmentBlock from "../components/home/EquipmentBlock";
  import WhyWeBlock from "../components/home/WhyWeBlock";
  import RequestBlock from "../components/home/RequestBlock";

  export default {
    asyncData() {
      return {}
    },
    components: {RequestBlock, WhyWeBlock, EquipmentBlock, SliderBlock},
    methods: {}
  }
</script>

<style lang="scss" scoped>
  @media only screen and (max-width: $sm-screen) {
    #desctop_home {
      display: none;
    }
  }
</style>

