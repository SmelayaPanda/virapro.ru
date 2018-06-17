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
    async fetch({store, params}) {
      if (!Object.keys(store.getters.dictionaries).length) {
        await store.dispatch('fetchDictionaries')
      }
      if (!Object.keys(store.getters.productStatistics.avgPrice).length) {
        await store.dispatch('fetchProductStatistics')
      }
      console.log(params)
      await store.dispatch('updateProductCommonFilter', {field: 'group', value: params.group})
      await store.dispatch('updateProductCommonFilter', {field: 'category', value: params.category})
    },
    methods: {},
    created() {
      this.$store.dispatch('fetchProducts') // Problem: not in the fetch method because lastVisible object - circular
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
