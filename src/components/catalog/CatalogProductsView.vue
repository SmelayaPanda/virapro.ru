<template>
  <div id="central_view">
    <PriceFilter/>
    <el-row v-if="!Object.keys(groupedByProp).length && $store.getters.LOADING" type="flex" justify="center">
      <i class="el-icon-loading" style="margin-top: 20px;"></i>
    </el-row>
    <el-row v-if="!Object.keys(groupedByProp).length && !$store.getters.LOADING" type="flex" justify="center">
      <div id="no_products">Товары отсутствуют</div>
    </el-row>
    <el-row v-for="(items, idx) in groupedByProp" :key="idx">
      <h3 @click="$nuxt.$router.push(`/catalog/${items[0].group}/${items[0].category}/`)">
        {{ categoryTitle(items[0].group, items[0].category) }}
      </h3>
      <ProductsGroup :items="items"/>
    </el-row>
    <el-row id="load_more">
      <div>
        <el-button
          v-if="$store.getters.lastVisible"
          type="text"
          @click="loadMore"
          :disabled="$store.getters.LOADING">
          Загрузить больше
        </el-button>
      </div>
    </el-row>
  </div>
</template>
<script>
  import PriceFilter from "@/components/catalog/PriceFilter"
  import ProductsGroup from "./ProductsGroup"

  export default {
    name: 'CatalogProductsView',
    components: {ProductsGroup, PriceFilter},
    data() {
      return {
        hoverOnCard: false
      }
    },
    methods: {
      async loadMore() {
        this.$store.dispatch('USER_EVENT', 'Загрузить больше')
        await this.$store.dispatch('fetchProducts')
      },
      groupByProp(arr, prop) { // can be used for grouping by any product property
        let grouped = {}
        for (let item of arr) {
          let p
          if (item[prop]) {
            p = item[prop]
          } else { // without prop
            continue
          }
          if (!grouped[p]) grouped[p] = []
          grouped[p].push(item)
        }
        return grouped
      },
      categoryTitle(groupVal, catVal) {
        let label = ''
        let tree = this.$store.getters.PRODUCT_TREE
        for (let group in tree) {
          if (tree[group].value === groupVal) {
            tree[group].children.forEach(category => {
              if (category.value === catVal) {
                label = category.label
              }
            })
          }
        }
        return this.capitalizeFirstLetter(label)
      },
      capitalizeFirstLetter(string) {
        return string.charAt(0).toUpperCase() + string.slice(1);
      }
    },
    computed: {
      groupedByProp() {
        return this.groupByProp(this.$store.getters.products ?
          Object.values(this.$store.getters.products) : [], 'category')
      },
      dictionaries() {
        return this.$store.getters.dictionaries
      },
      user() {
        return this.$store.getters.user
      }
    }
  }
</script>
<style scoped lang="scss">

  h3 {
    color: $color-primary;
    &:hover {
      cursor: pointer;
    }
  }

  #central_view {
    /*min-width: 600px;*/
    flex: 1;
  }

  #load_more {
    display: flex;
    justify-content: center;
    margin-top: 10px;
  }

  #no_products {
    margin-top: 10px;
    color: $color-info-dark;
  }

  @media only screen and (max-width: $xs-screen) {
    h3 {
      margin-left: 10px !important;
    }
  }
</style>
