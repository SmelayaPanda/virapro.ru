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
    components: { AppHeader, AppFooter },
    methods: {
      reloadPage () {
        window.location.reload()
      }
    }
  }
</script>

<style lang="scss">
  body {
    margin: 0;
    padding: 0;
    font-size: 14px;
  }

  #content-wrapper {
    margin: 0;
  }
</style>
