<template>
  <div id="round">
    <div id="zero">Выбрать</div>
    <div id="one">
      <div id="two"></div>
      <div id="three"></div>
    </div>
    <div id="four"></div>
  </div>
</template>

<script>
  export default {
    name: "ChoiceRoundBtn"
  }
</script>

<style scoped lang="scss">
  #round {
    position: absolute;
    top: calc(70vh - 100px);
    left: calc(50% - 100px);
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
    width: 120px;
    height: 120px;
    border-radius: 50%;
    background: white;
  }

  #one {
    width: 200px;
    height: 200px;
    border-radius: 50%;
    background: rgba(176, 216, 248, .8);
  }

  #two {
    z-index: 3;
    position: absolute;
    top: 100px;
    left: 100px;
    width: 100px;
    height: 100px;
    border-bottom-right-radius: 100%;
    background: $color-primary;
  }

  #three {
    z-index: 3;
    position: absolute;
    top: 100px;
    width: 100px;
    height: 100px;
    border-bottom-left-radius: 100%;
    background: $color-primary-light;
  }
</style>
