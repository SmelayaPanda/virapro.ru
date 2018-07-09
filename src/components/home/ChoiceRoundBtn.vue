<template>
  <div id="round" :style="roundStyles">
    <div id="zero">{{ !hoveredProducts && !hoveredServices ? 'VIRA PRO' : (hoveredProducts ? 'Товары' : 'Услуги') }}</div>
    <div id="one">
      <div id="two" :style="twoStyle"></div>
      <div id="three" :style="threeStyle"></div>
    </div>
  </div>
</template>

<script>
  export default {
    name: "ChoiceRoundBtn",
    props: {
      hoveredProducts: {type: Boolean, required: true},
      hoveredServices: {type: Boolean, required: true}
    },
    computed: {
      roundStyles() {
        if (this.hoveredProducts || this.hoveredServices) {
          return 'transform: scale(1.1)'
        }
      },
      twoStyle() {
        if (this.hoveredServices) {
          return 'border-bottom-right-radius: 4px'
        }
      },
      threeStyle() {
        if (this.hoveredProducts) {
          return 'border-bottom-left-radius: 4px'
        }
      }
    }
  }
</script>

<style scoped lang="scss">
  #round {
    transition: all .5s;
    position: absolute;
    top: 490px;
    left: calc(50% - 90px);
  }

  #zero {
    z-index: 10;
    display: flex;
    justify-content: center;
    align-items: center;
    position: absolute;
    left: 40px;
    top: 40px;
    color: $color-primary;
    width: 100px;
    height: 100px;
    border-radius: 50%;
    background: white;
  }

  #one {
    transition: all .5s;
    width: 180px;
    height: 180px;
    border-radius: 50%;
    background: rgba(176, 216, 248, .8);
  }

  #two {
    transition: all .5s;
    z-index: 3;
    position: absolute;
    top: 90px;
    left: 90px;
    width: 90px;
    height: 90px;
    border-bottom-right-radius: 100%;
    background: $color-primary;
  }

  #three {
    transition: all .5s;
    z-index: 3;
    position: absolute;
    top: 90px;
    width: 90px;
    height: 90px;
    border-bottom-left-radius: 100%;
    background: $color-primary-light;
  }
</style>
