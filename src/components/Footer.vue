<template>
  <footer>
    <p id="to_admin_go">
      <nuxt-link to="/admin"> Go to admin panel</nuxt-link>
    </p>
  </footer>
</template>

<script>
  export default {
    name: 'AppFooter'
  }
</script>

<style scoped lang="scss">
  footer {
    position: fixed;
    box-sizing: border-box;
    color: white;
    background-color: $color-secondary;
    border-top: 1px solid #e0e0e0;
    padding: .25em 0;
    display: flex;
    align-items: center;
    bottom: 0;
    left: 0;
    right: 0;
    height: 60px;
    z-index: 99;
  }

  a {
    color: white;
    text-decoration: underline;
  }

  #to_admin_go {
    margin-left: 20px;
    margin-right: 20px;
  }
</style>
