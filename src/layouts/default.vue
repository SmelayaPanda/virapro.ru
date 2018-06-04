<template>
  <div id="app-wrapper">
    <app-header></app-header>
    <div id="content-wrapper">
      <nuxt/>
    </div>
    <app-footer></app-footer>
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
    font-family: Roboto, sans-serif;
    font-weight: 400;
    color: $color-secondary;
  }

  #content-wrapper {
    display: flex;
    justify-content: center;
    align-items: center;
    margin: 0 0 80px;
  }
</style>
