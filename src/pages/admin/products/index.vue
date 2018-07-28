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
      <el-col>
        <input type="search" v-model="searchText" name="q" class="search-text" required
               placeholder="Введите артикул / название / цену" autocomplete="off">
      </el-col>
    </el-row>
    <div id="products_table">
      <el-row id="header">
        <el-col style="width: 68px">Инфо</el-col>
        <el-col style="width: 68px">Фото</el-col>
        <el-col style="width: 106px">Артикул</el-col>
        <el-col :span="9">Название</el-col>
        <el-col :span="3">Статистика</el-col>
        <el-col :span="3">Цена</el-col>
        <el-col :span="2">Кол-во</el-col>
        <el-col style="width: 176px">Операции</el-col>
      </el-row>
      <el-card v-if="searchProduct(searchText, p)" v-for="p in products" :key="p.productId" id="product_card">
        <ProductRow :key="p.productId" :p="p"/>
      </el-card>
    </div>
    <div v-if="totalProductCount && !searchText" id="pagination">
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
        pageSize: 6,
        searchText: ''
      }
    },
    methods: {
      async loadCategoryProducts() {
        await this.$store.dispatch('fetchAdminProducts', {
          group: this.productOption[0],
          category: this.productOption[1]
        })
      },
      changeCurPage(curPage) {
        this.curPage = curPage
      },
      changePageSize(size) {
        this.pageSize = size
      },
      searchProduct(query, item) {
        if (!query) return true
        return item.title.toLowerCase().indexOf(query.toLowerCase()) > -1 ||
          item.SKU.toLowerCase().indexOf(query.toLowerCase()) > -1 ||
          item.price.toString().indexOf(query) > -1
      }
    },
    computed: {
      products() {
        if (this.$store.getters.products) {
          if (!this.searchText) {
            return Object.values(this.$store.getters.products)
              .slice((this.curPage - 1) * this.pageSize, this.curPage * this.pageSize)
          } else {
            return Object.values(this.$store.getters.products)
          }
        } else {
          return []
        }
      },
      totalProductCount() {
        return this.$store.getters.products ? Object.keys(this.$store.getters.products).length : 0
      }
    },
    created() {
      this.$store.dispatch('fetchProductCounters')
      this.$store.dispatch('fetchDictionaries') // product dropdowns
      this.loadCategoryProducts()
    }
  }
</script>

<style scoped lang="scss">
  .el-cascader {
    width: 600px !important;
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
    padding-left: 30px;
    padding-right: 30px;
  }

  /* Expandable search box */
  /* Note: don't change 0.8s in transition. */
  /* --------------------- */
  input.search-text {
    color: #222;
    position: relative;
    z-index: 5;
    transition: z-index 0.8s, width 0.5s, background 0.3s ease, border 0.3s;
    height: 40px;
    width: 5px;
    margin: 0 0 0 5px;
    font-size: 14px;
    padding: 5px 0 5px 40px;
    box-sizing: border-box;
    cursor: pointer;
    border-radius: 30px;
    border: 1px solid transparent;
    background: url(data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiA/PjwhRE9DVFlQRSBzdmcgIFBVQkxJQyAnLS8vVzNDLy9EVEQgU1ZHIDEuMS8vRU4nICAnaHR0cDovL3d3dy53My5vcmcvR3JhcGhpY3MvU1ZHLzEuMS9EVEQvc3ZnMTEuZHRkJz48c3ZnIGVuYWJsZS1iYWNrZ3JvdW5kPSJuZXcgMCAwIDUxMiA1MTIiIGhlaWdodD0iNTEycHgiIGlkPSJMYXllcl8xIiB2ZXJzaW9uPSIxLjEiIHZpZXdCb3g9IjAgMCA1MTIgNTEyIiB3aWR0aD0iNTEycHgiIHhtbDpzcGFjZT0icHJlc2VydmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIgeG1sbnM6eGxpbms9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkveGxpbmsiPjxwYXRoIGQ9Ik01MDMuODY2LDQ3Ny45NzRMMzYwLjk1OCwzMzUuMDUyYzI4LjcyNS0zNC41NDQsNDYuMDE3LTc4LjkxMiw0Ni4wMTctMTI3LjMzNiAgYzAtMTEwLjA4NC04OS4yMjctMTk5LjMxMi0xOTkuMzEyLTE5OS4zMTJDOTcuNTk5LDguNDAzLDguMzUxLDk3LjYzMSw4LjM1MSwyMDcuNzE1YzAsMTEwLjA2NCw4OS4yNDgsMTk5LjMxMiwxOTkuMzEyLDE5OS4zMTIgIGM0OC40MzUsMCw5Mi43OTItMTcuMjkyLDEyNy4zMzYtNDYuMDE3bDE0Mi45MDgsMTQyLjkyMkw1MDMuODY2LDQ3Ny45NzR6IE0yOS4zMzEsMjA3LjcxNWMwLTk4LjMzNCw3OS45ODctMTc4LjMzMiwxNzguMzMyLTE3OC4zMzIgIGM5OC4zMjUsMCwxNzguMzMyLDc5Ljk5OCwxNzguMzMyLDE3OC4zMzJzLTgwLjAwNywxNzguMzMyLTE3OC4zMzIsMTc4LjMzMkMxMDkuMzE4LDM4Ni4wNDcsMjkuMzMxLDMwNi4wNSwyOS4zMzEsMjA3LjcxNXoiIGZpbGw9IiMzNzQwNEQiLz48L3N2Zz4=) no-repeat left 9px center transparent;
    background-size: 18px;
  }

  input.search-text:focus,
  input.search-text:valid {
    z-index: 3;
    width: 370px;
    border: 1px solid rgb(220, 223, 230);
    background-color: white;
    outline: none;
    cursor: auto;
    padding-right: 10px;
  }

  input.search-text::-webkit-search-cancel-button {
    cursor: pointer;
  }
</style>
