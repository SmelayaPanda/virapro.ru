<template>
  <header class="mui-appbar mui--z1">
    <nav>
      <nuxt-link to="/home">Home</nuxt-link>
      <nuxt-link to="/products">Products</nuxt-link>
      <nuxt-link to="/account">Account</nuxt-link>
    </nav>
  </header>
</template>

<script>
  export default {
    name: 'AppHeader'
  }
</script>

<style lang="css">
  footer {
    box-sizing: border-box;
    background-color: #eee;
    border-top: 1px solid #e0e0e0;
    padding: .5em 0;
    display: flex;
    align-items: center;
  }

  .footer-flex-item {
    margin: .5em;
  }
</style>
