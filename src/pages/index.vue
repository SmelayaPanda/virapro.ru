<!-- NOTE:
For render vuetify elements in first loading set delay after which its will be showed
( as loading flag in creation hook )
nuxt: DOMException: Failed to execute 'appendChild' on 'Node'-->
<template>
  <div class="container">
      <logo/>
      <h1 class="mui--text-display1">Nuxt.js Firebase Functions</h1>
      <el-button type="success">Hello</el-button>
      <h2 class="headline">Rendered From:<span class="render-result">{{renderSource}}</span></h2>
      <button
        id="reload-btn"
        class="mui-btn mui-btn--primary"
        @click="reloadPage">
        Reload Page
      </button>
  </div>
</template>

<script>
import Logo from '~/components/Logo.vue'

export default {
  asyncData () {
    return {
      renderSource: process.static ? 'static' : (process.server ? 'server' : 'client')
    }
  },
  components: {
    Logo
  },
  methods: {
    reloadPage () {
      window.location.reload()
    }
  }
}
</script>

<style scoped lang="scss">

</style>
