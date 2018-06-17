<template>
  <div id="shop_wrap">
    <CatalogNavMenu/>
    <div id="central_view">
      <el-row id="price_filter">
        <el-col id="price_sort">
          <el-tooltip content="Нажми для сортировки" placement="top">
            <div @click="changeSortByPrice" type="text">
              <el-button type="text">Цена</el-button>
              <i v-if="sortByPrice === 'asc'" class="el-icon-sort-up sort_icon"></i>
              <i v-else class="el-icon-sort-down sort_icon"></i>
            </div>
          </el-tooltip>
        </el-col>
        <el-col id="price_slider_wrap">
          <el-slider
            if="price_slider"
            v-model="sliderValues" @change="filterProducts" range
            :step="100" :min="0" :max="$store.getters.productStatistics.maxPrice">
          </el-slider>
        </el-col>
      </el-row>
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
      <div id="filters">
        <el-row id="filter_title">
          <el-col :span="19">Фильтр</el-col>
          <el-col v-if="Object.keys(dynamicFilters).length" :span="5">
            <div id="clear_filter" @click="clearCheckedFilters">
              <i class="el-icon-close"></i>
            </div>
          </el-col>
        </el-row>
        <div v-if="filtersTree.length">
          <el-tree
            ref="filtersTree"
            :data="filtersTree"
            :props="defaultProps"
            @check="getCheckedFilterNodes"
            node-key="value"
            show-checkbox>
          </el-tree>
        </div>
        <p v-else align="middle">Нет фильтров</p>
      </div>
    </div>
  </div>
</template>

<script>
  import ProductCard from "@/components/catalog/ProductCard";
  import CatalogNavMenu from "@/components/catalog/CatalogNavMenu";
  export default {
    components: {CatalogNavMenu, ProductCard},
    async fetch({store, params}) {
      if (!Object.keys(store.getters.dictionaries).length) {
        await store.dispatch('fetchDictionaries')
      }
      if (!Object.keys(store.getters.productStatistics.avgPrice).length) {
        await store.dispatch('fetchProductStatistics')
      }
      await store.dispatch('updateProductCommonFilter', {field: 'group', value: params.group})
    },
    data() {
      let filter = this.$store.getters.productCommonFilters
      return {
        treeKey: '1',
        defaultProps: {children: 'children', value: 'value', label: 'label'},
        hoverOnCard: false,
        sortByPrice: filter.sortByPrice,
        sliderValues: [
          filter.minPrice,
          filter.maxPrice
            ? filter.maxPrice
            : this.$store.getters.productStatistics.maxPrice
        ],
        filtersTree: '',
        selectedNode: '',
        selectedGroup: filter.group,
        selectedCategory: filter.category,
      };
    },
    methods: {

      createFiltersTree() { // get unique values of fetched products by every dynamic props
        if (!this.selectedNode || !this.selectedNode.filters) {
          return []
        }
        let tree = []
        let node = {}
        this.selectedNode.filters.forEach(prop => {
          node.value = this.$store.getters.DYNAMIC_PROPS[prop].value
          node.label = this.$store.getters.DYNAMIC_PROPS[prop].label
          node.children = []
          let unique = []
          for (let p in this.products) {
            if (this.products[p][prop] && unique.indexOf(this.products[p][prop]) === -1) {
              unique.push(this.products[p][prop])
            }
          }
          unique.forEach(el => {
            node.children.push({value: el, label: el, prop: prop})
          })
          if (node.children.length) {
            tree.push(node)
          }
          node = {}
        })
        this.filtersTree = tree
      },


      getCheckedFilterNodes(data, tree) { // active dynamic filters
        let filterObj = {} // { color: [red, green], size: [big, small] }
        let prevNodeProp
        tree.checkedNodes.forEach(node => {
          if (!node.children) {
            if (!prevNodeProp) {
              filterObj[node.prop] = [node.value]
            } else if (prevNodeProp === node.prop) {
              filterObj[node.prop].push(node.value)
            } else {
              filterObj[node.prop] = [node.value]
            }
            prevNodeProp = node.prop
          }
        })
        this.$store.dispatch('setProductDynamicFilters', filterObj).then(() => {
          this.filterProducts()
        })
      },


      async clearCheckedFilters() {
        if (this.$refs.filtersTree) {
          this.$refs.filtersTree.setCheckedNodes([])
        }
        await this.$store.dispatch('setProductDynamicFilters', [])
      },


      changeSortByPrice() {
        if (this.sortByPrice === 'asc') {
          this.sortByPrice = 'desc'
          // this.$store.dispatch('USER_EVENT', `Сортировка по цене: убывание`)
        } else {
          this.sortByPrice = 'asc'
          // this.$store.dispatch('USER_EVENT', `Сортировка по цене: возрастание`)
        }
        this.filterProducts()
      },


      async filterProducts() {
        await this.$store.dispatch('setLastVisible', null)
        await this.filter()
      },


      loadMore() {
        // this.$store.dispatch('USER_EVENT', 'Загрузить больше')
        this.filter()
      },


      async filter() {
        // this.logFilterEvents()
        await this.$store.dispatch('setProductCommonFilters', {
          limit: 4,
          sortByPrice: this.sortByPrice,
          minPrice: this.sliderValues[0],
          maxPrice: this.sliderValues[1],
          category: this.selectedCategory,
          group: this.selectedGroup
        })
        await this.$store.dispatch('fetchProducts')
      },


      logFilterEvents() {
        let lastFilter = this.$store.getters.productCommonFilters
        if (lastFilter.brand !== this.selectedBrand) {
          this.$store.dispatch('USER_EVENT', `Фильтр - бренд: ${this.selectedBrand}`)
        }
        if (lastFilter.country !== this.selectedCountry) {
          this.$store.dispatch('USER_EVENT', `Фильтр - страна: ${this.selectedCountry}`)
        }
        if (lastFilter.color !== this.selectedColor) {
          this.$store.dispatch('USER_EVENT', `Фильтр - цвет: ${this.selectedColor}`)
        }
        if (lastFilter.material !== this.selectedMaterial) {
          this.$store.dispatch('USER_EVENT', `Фильтр - материал: ${this.selectedMaterial}`)
        }
        if (lastFilter.minPrice !== this.sliderValues[0] ||
          (lastFilter.maxPrice !== this.sliderValues[1] &&
            this.sliderValues[1] !== this.$store.getters.productStatistics.maxPrice)) {
          this.$store.dispatch('USER_EVENT', `Фильтр - цена: [${this.sliderValues[0]}, ${this.sliderValues[1]}]`)
        }
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
      },
      dynamicFilters() {
        return this.$store.getters.productDynamicFilters
      }
    },
    created() {
      this.$store.dispatch('fetchProducts') // not in the fetch method because lastVisible object - circular
    }
  }
</script>

<style scoped lang="scss">
  #shop_wrap {
    display: flex;
    justify-content: start;
    flex-wrap: wrap;
  }

  #central_view {
    /*min-width: 600px;*/
    flex: 1;
  }

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

  #filters {
    margin-top: 10px;
    flex: 0 0 300px;
  }

  .sort_icon {
    color: $color-primary;
  }

  #filter_title {
    display: flex;
    justify-content: start;
    padding-left: 18px;
    align-items: center;
    height: 40px;
    color: #909399;
    background: #f5f7fa;
    border: 1px solid #dcdfe6;
    border-radius: 4px;
    margin-right: 10px;
    width: 290px;
  }

  #clear_filter {
    background: #1A7CDD;
    padding: 9px 9px 9px 20px;
    color: white;
    border-top-right-radius: 4px;
    border-bottom-right-radius: 4px;
  }

  #clear_filter:hover {
    cursor: pointer;
  }

  .el-icon-close {
    transition: all .3s;
  }

  .el-icon-close:hover {
    @include rotate(90deg, scale(1.4))
  }

  #load_more {
    display: flex;
    justify-content: center;
    margin-top: 10px;
  }

  @media only screen and (max-width: $sm-screen) {
    #filters {
      display: none;
    }
  }
</style>
