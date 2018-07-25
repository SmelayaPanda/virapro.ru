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
      let group = ''
      let category = ''
      await store.getters.PRODUCT_TREE.forEach(el => {
        if (el.value === params.group && el.children) {
          group = el.label
          el.children.forEach(item => {
            if (item.value === params.category) {
              category = item.label
            }
          })
        }
      })
      await store.dispatch('USER_EVENT', `Каталог: ${group} / ${category}`)
    },
    methods: {},
    created() {
      this.$store.dispatch('fetchProducts') // NOTE: not in the fetch method because lastVisible object - circular
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
