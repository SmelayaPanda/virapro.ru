<template>
  <footer>
    <p id="made_by">Made by SmelayaPanda
      <a href="https://github.com/smelayapanda" rel="noopener" target="_blank"
       aria-label="Github profile">GitHub</a>
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
    box-sizing: border-box;
    color: white;
    background-color: $color-secondary;
    border-top: 1px solid #e0e0e0;
    padding: .25em 0;
    display: flex;
    align-items: center;
    position: fixed;
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

  #made_by {
    margin-left: 20px;
  }
</style>
