<template>
  <div>
    <el-row id="product_card_wrap">
      <el-col :xs="23" :sm="12" :md="8" :lg="8" :xl="8"
              v-for="i in 15" :key="i"
              itemscope itemtype="http://schema.org/ItemList">
        <product-card :id="i" itemprop="itemListElement" itemtype="http://schema.org/Product"/>
      </el-col>
    </el-row>
  </div>
</template>

<script>
  import ProductCard from "../../components/shop/ProductCard";

  export default {
    components: {ProductCard}
  }
</script>

<style scoped lang="scss">
  #product_card_wrap {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-evenly;
  }
</style>
