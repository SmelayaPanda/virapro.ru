<template>
  <div id="balls_loader">
    <span></span>
    <span></span>
    <span></span>
    <span></span>
    <span></span>
  </div>
</template>

<script>
  export default {
    name: 'BallsLoader'
  }
</script>

<style scoped lang="scss">
  #balls_loader {
    width: 150px;
    height: 10px;
    border-radius: 100%;
    span {
      display: inline-block;
      width: 13px;
      height: 13px;
      border-radius: 100%;
      background-color: white;
      margin: 5px 5px;
      opacity: 0;
      &:nth-child(1) {
        animation: opacitychange 1.75s ease-in-out infinite;
      }
      &:nth-child(2) {
        animation: opacitychange 1.75s ease-in-out 0.25s infinite;
      }
      &:nth-child(3) {
        animation: opacitychange 1.75s ease-in-out 0.5s infinite;
      }
      &:nth-child(4) {
        animation: opacitychange 1.75s ease-in-out 0.75s infinite;
      }
      &:nth-child(5) {
        animation: opacitychange 1.75s ease-in-out 1s infinite;
      }
    }
  }

  @keyframes opacitychange {
    0%, 100% {
      opacity: 0;
    }
    60% {
      opacity: 1;
    }
  }
</style>
