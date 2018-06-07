<template>
  <div>
    <h1> Router id: {{ $route.params.id }}</h1>
    <!--<p>{{ $store.getters.singleProduct }}</p>-->
    <p>SKU: {{ $store.getters.singleProduct.SKU }}</p>
    <p>title: {{ $store.getters.singleProduct.title }}</p>
    <p>description: {{ $store.getters.singleProduct.description }}</p>
    <p>material: {{ $store.getters.singleProduct.material }}</p>
    <p>color: {{ $store.getters.singleProduct.color }}</p>
    <p>brand: {{ $store.getters.singleProduct.brand }}</p>
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
