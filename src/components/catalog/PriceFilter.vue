<template>
  <el-row id="price_filter">
    <el-col id="price_title">Цена</el-col>
    <el-col id="price_min">{{ sliderValues[0] }}</el-col>
    <el-col id="price_slider_wrap">
      <el-slider
        id="price_slider"
        v-model="sliderValues" @change="changePriceRange" range
        :step="100" :min="0" :max="$store.getters.productStatistics.maxPrice + 100">
      </el-slider>
    </el-col>
    <el-col id="price_max">{{ sliderValues[1] }} &#8381</el-col>
  </el-row>
</template>
<script>
  export default {
    name: 'PriceFilter',
    props: {},
    data() {
      let filter = this.$store.getters.productCommonFilters
      return {
        sliderValues: [
          filter.minPrice,
          filter.maxPrice
            ? filter.maxPrice
            : this.$store.getters.productStatistics.maxPrice
        ],
      }
    },
    methods: {
      async changePriceRange () {
        await this.$store.dispatch('setLastVisible', null)
        await this.$store.dispatch('updateProductCommonFilter', {field: 'minPrice', value: this.sliderValues[0]})
        await this.$store.dispatch('updateProductCommonFilter', {field: 'maxPrice', value: this.sliderValues[1]})
        this.$store.dispatch('USER_EVENT', `Фильтр: цена от ${this.sliderValues[0]} до ${this.sliderValues[1]}` )
        if (!this.$store.getters.productCommonFilters.category) {
          await this.$store.dispatch('fetchProducts')
        }
      }
    },
    computed: {
      // maxPrice() {
      //   let max = 0
      //   for (let p in this.$store.getters.products) {
      //     if (Number(this.$store.getters.products[p].price) > max) {
      //       max = Number(this.$store.getters.products[p].price)
      //     }
      //   }
      //   return max
      // }
    }
  }
</script>
<style scoped lang="scss">

  #price_filter {
    display: flex;
    align-items: center;
    padding: 0 10px;
    margin: 10px;
    background: $color-primary-dark;
    border: 1px solid #dcdfe6;
    height: 34px;
    border-radius: 4px;
  }

  #price_slider_wrap {
    padding-right: 24px;
    padding-left: 10px;
  }

  #price_title {
    flex: 0 0 80px;
    padding-left: 7px;
    color: white;
  }

  #price_max,
  #price_min{
    color: $color-success-second;
    font-size: 14px;
  }
  #price_min {
    flex: 0 0 20px;
  }
  #price_max {
    flex: 0 0 60px;
  }

  @media only screen and (max-width: $sm-screen) {
  }
</style>
