<template>
  <div id="app-wrapper">
    <app-header></app-header>
    <main id="content-wrapper">
      <nuxt/>
    </main>
    <!--<app-footer></app-footer>-->
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
    margin: 0;
    padding: 0;
    font-size: 16px;
    font-family: 'Open Sans', sans-serif;
    color: $color-secondary;
  }

  #content-wrapper {
    margin: 0 0 80px;
  }
</style>
