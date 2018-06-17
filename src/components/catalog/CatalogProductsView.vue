<template>
  <div id="central_view">
    <PriceFilter/>
    <el-row>
      <el-col
        :span="24" v-for="p in products" :key="p.productId"
        itemscope itemtype="http://schema.org/ItemList">
        <ProductCard :id="p.productId" itemprop="itemListElement" itemtype="http://schema.org/Product"/>
      </el-col>
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
  import ProductCard from "@/components/catalog/ProductCard"

  export default {
    name: 'CatalogProductsView',
    components: {PriceFilter, ProductCard},
    data() {
      return {
        hoverOnCard: false
      }
    },
    methods: {
      async loadMore() {
        // this.$store.dispatch('USER_EVENT', 'Загрузить больше')
        await this.$store.dispatch('fetchProducts')
      }
    },
    computed: {
      products() {
        return this.$store.getters.products ? this.$store.getters.products : {}
      },
      maxPrice() {
        let max = 0
        for (let p in this.products) {
          if (Number(this.products[p].price) > max) {
            max = Number(this.products[p].price)
          }
        }
        return max
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

  #central_view {
    /*min-width: 600px;*/
    flex: 1;
  }

  #load_more {
    display: flex;
    justify-content: center;
    margin-top: 10px;
  }

  @media only screen and (max-width: $sm-screen) {
  }
</style>
