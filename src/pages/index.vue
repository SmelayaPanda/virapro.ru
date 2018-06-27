<template>
  <div>
    <SliderBlock/>
    <EquipmentBlock/>
    <WhyWeBlock/>
  </div>
</template>

<script>
  import SliderBlock from "../components/home/SliderBlock";
  import EquipmentBlock from "../components/home/EquipmentBlock";
  import WhyWeBlock from "../components/home/WhyWeBlock";

  export default {
    asyncData() {
      return {}
    },
    components: {WhyWeBlock, EquipmentBlock, SliderBlock},
    methods: {}
  }
</script>

<style scoped lang="scss">
</style>
