<template>
  <div v-if="products" id="admin_products">
    <el-row type="flex" justify="start" align="middle">
      <el-cascader
        :options="$store.getters.PRODUCT_TREE"
        filterable
        placeholder="Выберите категорию"
        v-model="productOption"
        @change="loadCategoryProducts">
      </el-cascader>
      <el-col class="left" style="width: 100px;">
        <AddEditProduct operation="add" :group="productOption[0]" :category="productOption[1]"></AddEditProduct>
      </el-col>
    </el-row>
    <div id="products_table">
      <el-row id="header">
        <el-col style="width: 64px">Инфо</el-col>
        <el-col style="width: 74px">Фото</el-col>
        <el-col style="width: 114px">Артикул</el-col>
        <el-col :span="10">Название</el-col>
        <el-col :span="3">Цена</el-col>
        <el-col :span="2">Кол-во</el-col>
        <el-col style="width: 166px">Операции</el-col>
      </el-row>
      <el-card v-for="p in products" :key="p.productId" id="product_card">
        <ProductRow :key="p.productId" :p="p"/>
      </el-card>
    </div>
    <div v-if="totalProductCount" id="pagination">
      <el-pagination
        @current-change="changeCurPage"
        @size-change="changePageSize"
        background
        layout="sizes, prev, pager, next, total"
        :current-page.sync="curPage"
        :page-size="pageSize"
        :page-sizes="[6, 10, 20, 50, 100]"
        :total="totalProductCount">
      </el-pagination>
    </div>
  </div>
</template>

<script>
  import AddEditProduct from '@/components/admin/products/crud/AddEditProduct'
  import ProductRow from "@/components/admin/products/ProductRow"

  export default {
    name: 'index',
    layout: 'admin',
    components: {ProductRow, AddEditProduct},
    data() {
      return {
        productOption: ['shutoff-and-control-valves', 'shut-off-valves'],
        curPage: 1,
        pageSize: 6
      }
    },
    methods: {
      loadCategoryProducts() {
        this.$store.dispatch('setLastVisible', null)
        this.$store.dispatch('setProductCommonFilters', {
          limit: null, // all
          sortByPrice: 'desc',
          category: this.productOption[1],
          group: this.productOption[1] ? null : this.productOption[0]
        }).then(() => this.$store.dispatch('fetchProducts'))
      },
      changeCurPage(curPage) {
        this.curPage = curPage
      },
      changePageSize(size) {
        this.pageSize = size
      }
    },
    computed: {
      products() {
        if (this.$store.getters.products) {
          return Object.values(this.$store.getters.products)
            .slice((this.curPage - 1) * this.pageSize, this.curPage * this.pageSize)
        } else {
          return []
        }
      },
      totalProductCount() {
        return this.$store.getters.products ? Object.keys(this.$store.getters.products).length : 0
      }
    },
    created() {
      this.$store.dispatch('fetchProductStatistics') // product MaxPrice for shop
      this.$store.dispatch('fetchDictionaries') // product dropdowns
      this.loadCategoryProducts()
    }
  }
</script>

<style scoped lang="scss">
  .el-cascader {
    width: 400px !important;
  }

  #products_table {
    margin-top: 10px;
  }

  #product_card:hover {
    /*background: rgba(1, 95, 173, 0.07);*/
  }

  #pagination {
    margin-top: 10px;
  }

  #header {
    display: flex;
    justify-content: start;
    font-size: 12px;
    color: $color-info;
    margin-bottom: 4px;
    padding-left: 20px;
    padding-right: 20px;
  }

</style>
