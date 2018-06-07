<template>
  <div>
    <h1> Router id: {{ $route.params.id }}</h1>
    <p>{{ $store.getters.singleProduct }}</p>
    <p>{{ $store.getters.singleProduct.SKU }}</p>
    <p>{{ $store.getters.singleProduct.title }}</p>
    <p>{{ $store.getters.singleProduct.description }}</p>
  </div>
</template>

<script>
  import {fs} from "~/services/fireinit";

  export default {
    name: "Product",
    data() {
      return {}
    },
    async fetch({store, params}) {
      await store.dispatch('loadSingleProduct', params.id)
    }
  }
</script>

<style scoped>

</style>
