<template>
  <div>
    <h1>Products</h1>
    <el-cascader
      :options="$store.getters.PRODUCT_TREE"
      filterable
      placeholder="Выберите категорию"
      v-model="productOption"
      @change="loadCategoryProducts">
    </el-cascader>
    <el-button>
      <i class="el-icon-plus"></i>
    </el-button>
  </div>
</template>

<script>
  export default {
    name: "index",
    layout: 'admin',
    data() {
      return {
        productOption: ''
      }
    },
    methods: {
      loadCategoryProducts() {
      }
    }
  }
</script>

<style scoped>

</style>
