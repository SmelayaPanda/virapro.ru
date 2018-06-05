<template>
  <div>
    <el-cascader
      :options="$store.getters.PRODUCT_TREE"
      filterable
      placeholder="Выберите категорию"
      v-model="productOption"
      @change="loadCategoryProducts">
    </el-cascader>
    <el-button id="add_product">
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
        productOption: ['shutoff-and-control-valves', 'elevators']
      }
    },
    methods: {
      loadCategoryProducts() {
      }
    }
  }
</script>

<style scoped>
  #add_product {
    margin-left: 10px;
  }
</style>
