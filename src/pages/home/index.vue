<template>
  <div>
    <h1>Hello From Home</h1>
    <br>
    <h1>{{ this.$store.getters.greeting.welcome }}</h1>
  </div>
</template>

<script>
  export default {
    async fetch ({ store, params }) {
      await store.dispatch('sayHi')
    },
    methods: {
      sayHi () {
        this.$store.dispatch('sayHi')
      }
    }
  }
</script>

<style scoped lang="scss">
  #hello_btn {
    color: #000;
    background: $color-secondary;
  }
  #chip {
    background: $color-primary;
  }
</style>
