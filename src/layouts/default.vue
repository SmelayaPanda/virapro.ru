<template>
  <div id="app-wrapper">
    <app-header/>
    <main id="content-wrapper">
      <nuxt/>
    </main>
    <app-footer/>
  </div>
</template>

<script>
  import AppFooter from '../components/Footer'
  import AppHeader from '../components/Header'

  export default {
    components: { AppHeader, AppFooter }
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
</style>
