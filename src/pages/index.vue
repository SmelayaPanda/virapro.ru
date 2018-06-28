<template>
  <div>
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

