<template>
  <el-row id="price_filter">
    <el-col id="price_sort">
      <el-tooltip content="Нажми для сортировки" placement="top">
        <div @click="changeSortByPrice">
          <el-button type="text">Цена</el-button>
          <i v-if="sortByPrice === 'asc'" class="el-icon-sort-up sort_icon"></i>
          <i v-else class="el-icon-sort-down sort_icon"></i>
        </div>
      </el-tooltip>
    </el-col>
    <el-col id="price_slider_wrap">
      <el-slider
        if="price_slider"
        v-model="sliderValues" @change="loadProducts" range
        :step="100" :min="0" :max="$store.getters.productStatistics.maxPrice">
      </el-slider>
    </el-col>
  </el-row>
</template>
<script>
  export default {
    name: 'PriceFilter',
    props: {},
    data() {
      let filter = this.$store.getters.productCommonFilters
      return {
        sortByPrice: filter.sortByPrice,
        sliderValues: [
          filter.minPrice,
          filter.maxPrice
            ? filter.maxPrice
            : this.$store.getters.productStatistics.maxPrice
        ],
      }
    },
    methods: {
      changeSortByPrice() {
        if (this.sortByPrice === 'asc') {
          this.sortByPrice = 'desc'
          // this.$store.dispatch('USER_EVENT', `Сортировка по цене: убывание`)
        } else {
          this.sortByPrice = 'asc'
          // this.$store.dispatch('USER_EVENT', `Сортировка по цене: возрастание`)
        }
        // this.filterProducts()
      },
      loadProducts () {}
    }
  }
</script>
<style scoped lang="scss">

  #price_filter {
    display: flex;
    align-items: center;
    padding: 0 10px;
    margin: 10px;
    background: #f5f7fa;
    border: 1px solid #dcdfe6;
    height: 40px;
    border-radius: 4px;
  }

  #price_slider_wrap {
    padding-right: 24px;
    padding-left: 10px;
  }

  #price_sort {
    flex: 0 0 80px;
    padding-left: 7px;
  }

  .sort_icon {
    color: $color-primary;
  }

  @media only screen and (max-width: $sm-screen) {
  }
</style>
