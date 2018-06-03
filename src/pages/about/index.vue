<template>
<div>
  <h1>About Shop</h1>
</div>
</template>

<script>
export default {
  async asyncData () {
    return {
      renderSource: process.static ? 'static' : (process.server ? 'server' : 'client')
    }
  },
  methods: {
    reloadPage () {
      window.location.reload()
    }
  }
}
</script>
