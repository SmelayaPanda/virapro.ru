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
        id="price_slider"
        v-model="sliderValues" @change="changePriceRange" range
        :step="100" :min="0" :max="$store.getters.productStatistics.maxPrice + 100">
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
      async changeSortByPrice() {
        if (this.sortByPrice === 'asc') {
          this.sortByPrice = 'desc'
          // this.$store.dispatch('USER_EVENT', `Сортировка по цене: убывание`)
        } else {
          this.sortByPrice = 'asc'
          // this.$store.dispatch('USER_EVENT', `Сортировка по цене: возрастание`)
        }
        await this.$store.dispatch('setLastVisible', null)
        await this.$store.dispatch('updateProductCommonFilter', {field: 'sortByPrice', value: this.sortByPrice})
        await this.$store.dispatch('fetchProducts')
      },
      async changePriceRange () {
        await this.$store.dispatch('setLastVisible', null)
        await this.$store.dispatch('updateProductCommonFilter', {field: 'minPrice', value: this.sliderValues[0]})
        await this.$store.dispatch('updateProductCommonFilter', {field: 'maxPrice', value: this.sliderValues[1]})
        await this.$store.dispatch('fetchProducts')
      }
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
