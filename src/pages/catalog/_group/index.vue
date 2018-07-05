<template>
  <div id="shop_wrap">
    <CatalogNavMenu/>
    <CatalogProductsView/>
    <Advertising/>
  </div>
</template>

<script>
  import CatalogNavMenu from "@/components/catalog/CatalogNavMenu";
  import CatalogProductsView from "@/components/catalog/CatalogProductsView";
  import Advertising from "@/components/catalog/Advertising";

  export default {
    components: {Advertising, CatalogProductsView, CatalogNavMenu},
    methods: {},
    created() {
      this.$store.dispatch('fetchProducts') // TODO: not in the fetch method because lastVisible object - circular
    }
  }
</script>

<style scoped lang="scss">
  #shop_wrap {
    display: flex;
    justify-content: start;
    flex-wrap: wrap;
  }
</style>
