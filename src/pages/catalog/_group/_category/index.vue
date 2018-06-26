<template>
  <div id="shop_wrap">
    <CatalogNavMenu/>
    <CatalogProductsView/>
    <DynamicCategoryFilters/>
  </div>
</template>

<script>
  import CatalogNavMenu from "@/components/catalog/CatalogNavMenu";
  import CatalogProductsView from "@/components/catalog/CatalogProductsView";
  import DynamicCategoryFilters from "@/components/catalog/DynamicCategoryFilters";

  export default {
    components: {DynamicCategoryFilters, CatalogProductsView, CatalogNavMenu},
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

  @media only screen and (max-width: $sm-screen) {
  }
</style>
