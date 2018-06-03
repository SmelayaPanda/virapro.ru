<template>
  <el-row type="flex" justify="center">
    <el-col :span="20">
    <h1 class="mui--text-display1">Nuxt.js Firebase Functions</h1>
    <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Qui quia suscipit voluptate. Beatae blanditiis deserunt
      facilis rem repellendus totam! Consequatur culpa ex expedita ipsa ipsam minus rerum voluptatibus? Atque,
      consectetur!</p>
    <h2 class="headline">Rendered From:<span class="render-result">{{renderSource}}</span></h2>
    <el-button @click="reloadPage">Reload Page</el-button>
    </el-col>
  </el-row>
</template>

<script>
  export default {
    asyncData() {
      return {
        renderSource: process.static ? 'static' : (process.server ? 'server' : 'client')
      }
    },
    components: {},
    methods: {
      reloadPage() {
        window.location.reload()
      }
    }
  }
</script>

<style scoped lang="scss">

</style>
