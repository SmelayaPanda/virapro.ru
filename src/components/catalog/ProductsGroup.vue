<template>
  <div>
    <el-tooltip id="switch" class="item" effect="light" content="Сортировка" placement="right">
      <el-switch v-model="showSort" active-color="#0976d4"></el-switch>
    </el-tooltip>
    <div v-if="showSort" id="sorting">
      <h4>Сортировка</h4>
      <el-radio-group v-model="sortBy" size="mini" style="margin-bottom: 10px;">
        <el-radio-button label="price">Цена</el-radio-button>
        <el-radio-button label="title">Название</el-radio-button>
        <el-radio-button label="SKU">Артикул</el-radio-button>
      </el-radio-group>
      <el-radio-group v-model="asc" size="mini" style="margin-left: 15px; margin-bottom: 10px;">
        <el-radio-button :label="true">Возрастание</el-radio-button>
        <el-radio-button :label="false">Убывание</el-radio-button>
      </el-radio-group>
    </div>
    <el-col
      :span="24" v-for="p in sortByProp(items, 'price', asc)" :key="p.productId"
      itemscope itemtype="http://schema.org/ItemList">
      <ProductCard
        v-if="showProduct(p)"
        :id="p.productId"
        itemprop="itemListElement"
        itemtype="http://schema.org/Product"/>
    </el-col>
  </div>
</template>

<script>
  import ProductCard from "@/components/catalog/ProductCard"

  export default {
    name: 'ProductsGroup',
    components: {ProductCard},
    props: {
      items: {type: Array, required: true}
    },
    data() {
      return {
        asc: true,
        sortBy: 'title',
        showSort: false
      }
    },
    methods: {
      showProduct(p) {
        return (!this.$store.getters.productDynamicFilters ||
          (this.$store.getters.productDynamicFilters &&
            this.$store.getters.dynamicFilteredProductsIds.indexOf(p.productId) !== -1)) &&
          (p.price > this.$store.getters.productCommonFilters.minPrice &&
            p.price < this.$store.getters.productCommonFilters.maxPrice)
      },
      sortByProp(arr) {
        let prop = this.sortBy
        let asc = this.asc
        let x, y
        return arr.sort(function (a, b) {
          x = typeof a[prop] === 'string' ? a[prop].trim() : a[prop]
          y = typeof b[prop] === 'string' ? b[prop].trim() : b[prop]
          if (asc) {
            return x === y ? 0 : +(x > y) || -1
          } else {
            return x === y ? 0 : +(x < y) || -1
          }
        })
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

  #switch {
    margin-bottom: 10px;
    margin-top: -10px;
    margin-left: 10px;
  }

  #sorting {
    margin-bottom: 10px;
    margin-left: 10px;
    h4 {
      margin-top: 10px;
      margin-bottom: 10px;
      color: #77797e;
    }
  }

  @media only screen and (max-width: $md-screen) {
    #sorting {
      margin-left: 10px !important;
    }
  }
</style>
