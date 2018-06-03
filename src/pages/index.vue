<template>
  <div class="container">
    <h1 class="mui--text-display1">Nuxt.js Firebase Functions</h1>
    <h2 class="headline">Rendered From:<span class="render-result">{{renderSource}}</span></h2>
    <el-button @click="reloadPage">Reload Page</el-button>
  </div>
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
