<template>
  <div id="app-wrapper">
    <app-header/>
    <main id="content-wrapper">
      <nuxt/>
    </main>
    <app-footer/>
    <back-to-top v-if="$nuxt.$route.path.includes('/catalog')" visibleOffset="600" id="back_to_bottom">
      <el-button id="back_to_top" type="primary" size="mini" plain icon="el-icon-arrow-up"></el-button>
    </back-to-top>
  </div>
</template>

<script>
  import AppHeader from '~/components/Header'
  const AppFooter = () => import('~/components/Footer')

  export default {
    components: {AppHeader, AppFooter}
  }
</script>

<style lang="scss">
  body {
    position: relative;
    margin: 0;
    padding: 0;
    font-size: 16px;
    font-family: 'Open Sans', sans-serif;
    color: $color-secondary;
  }

  #app-wrapper {
    min-height: 100vh;
  }

  #content-wrapper {
    padding: 0 0 250px; // footer height
  }

  #back_to_top {
    width: 70px;
  }
</style>
