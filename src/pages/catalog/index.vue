<template>
  <div id="shop_wrap">
    <div id="nav_menu">
      <div id="filter_category">
        <el-input label="Category Filter" placeholder="Поиск каталога" v-model="filterText">
          <el-button slot="prepend" icon="el-icon-search"></el-button>
        </el-input>
      </div>
      <el-tree
        :key="treeKey"
        ref="catalog"
        empty-text="No data"
        :data="$store.getters.PRODUCT_TREE"
        :props="defaultProps"
        @node-click="handleNodeClick"
        :filter-node-method="filterNode"
        :indent="16"
        highlight-current
        accordion>
      </el-tree>
    </div>
    <div id="central_view">
      <el-row id="product_card_wrap">
        <el-col :span="24">
          <div id="algolia_search">
            <el-input
              label="Algolia Filter"
              @change="algoliaSearch"
              @keyup.enter.exact="algoliaSearch"
              placeholder="введите поисковый запрос"
              v-model="algoliaSearchText">
              <template slot="prepend">{{ searchPrefix }}</template>
              <i v-if="$store.getters.LOADING"
                 slot="append"
                 class="el-icon-loading" id="search_loading"></i>
              <img
                v-else
                slot="append"
                src="~/assets/icons/algolia/algolia-mark-blue.svg"
                id="algolia_icon" alt="Algolia Search">
            </el-input>
          </div>
        </el-col>
      </el-row>
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
    </div>
    <div id="filters">
      <el-row id="filter_title">
        <el-col :span="19">Фильтр</el-col>
        <el-col v-if="dynamicFilters.length" :span="5">
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
      <!--{{checkedNodes}}-->
      <p v-else align="middle">Нет фильтров</p>
    </div>
  </div>
</template>

<script>
  import ProductCard from "@/components/shop/ProductCard";

  export default {
    components: {ProductCard},
    data() {
      let comFilter = this.$store.getters.productCommonFilters
      return {
        catalog: [],
        filterText: '',
        algoliaSearchText: '',
        searchPrefix: 'Вся продукция',
        treeKey: '1',
        activeNames: [], // ['1', '2']
        defaultProps: {
          children: 'children',
          value: 'value',
          label: 'label',
          disabled: false
        },
        hoverOnCard: false,
        sortByPrice: comFilter.sortByPrice,
        sliderValues: [
          comFilter.minPrice,
          comFilter.maxPrice
            ? comFilter.maxPrice
            : this.$store.getters.productStatistics.maxPrice
        ],
        selectedNode: '',
        selectedGroup: comFilter.group,
        selectedCategory: comFilter.category,
        isCollapsed: false,
        activeName:
          !comFilter.brand &&
          !comFilter.color &&
          !comFilter.minPrice &&
          !comFilter.maxPrice ? '0' : '1'
      };
    },
    methods: {

      handleNodeClick(data) { // смена выбраной группы/категории товара
        // TODO: check repeated click, block loading
        if ((data.type && this.selectedGroup === data.value) ||
          (data.type === 'category' && this.selectedCategory === data.value)) {
          return
        }
        this.clearCheckedFilters()
        this.selectedNode = data
        if (data.type === 'group') {
          this.selectedGroup = data.value
        } else if (data.type === 'category') {
          this.selectedCategory = data.value
        }
        this.searchPrefix = data.label
        let filter = {
          [data.type]: data.value,
          sortByPrice: 'desc'
        }
        // this.$store.dispatch('USER_EVENT', `Категория/Группа`)
        this.$store.dispatch('setLastVisible', null)
        this.$store.dispatch('setProductCommonFilters', filter).then(() => this.$store.dispatch('fetchProducts'))
        if (data.value === 'all-products') {
          this.treeKey = new Date().getTime()
          this.$forceUpdate()
        }
      },


      filterNode(value, data) { // text search of catalog name
        if (!value) {
          this.treeKey = new Date().getTime()
          this.$forceUpdate()
        }
        return data.label.indexOf(value) !== -1;
      },


      getCheckedFilterNodes(data, tree) { // active dynamic filters
        let arr = [] // clear prev
        tree.checkedNodes.forEach(node => {
          if (!node.children) { // only checked leafs
            arr.push(`${node.prop}:${node.value}`)
          }
        })
        this.$store.dispatch('setProductDynamicFilters', arr)
      },


      clearCheckedFilters() {
        if (this.$refs.filtersTree) {
          this.$refs.filtersTree.setCheckedNodes([])
        }
        this.$store.dispatch('setProductDynamicFilters', [])
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


      filterProducts() {
        this.$store.dispatch('setLastVisible', null)
        this.filter()
      },


      loadMore() {
        // this.$store.dispatch('USER_EVENT', 'Загрузить больше')
        this.filter()
      },


      filter() {
        // this.logFilterEvents()
        this.$store.dispatch('setProductCommonFilters', {
          limit: 15,
          sortByPrice: this.sortByPrice,
          minPrice: this.sliderValues[0],
          maxPrice: this.sliderValues[1],
          category: this.selectedCategory,
          group: this.selectedGroup
        })
          .then(() => {
            if (this.algoliaSearchText) {
              return this.$store.dispatch('algoliaSearch', this.algoliaSearchText)
            } else {
              this.$store.dispatch('setAlgoliaSearchText', null)
              return this.$store.dispatch('fetchProducts')
            }
          })
      },


      algoliaSearch() {
        if (!this.algoliaSearchText) {
          this.$store.dispatch('setAlgoliaSearchText', null)
          return this.filterProducts()
        }
        // if (this.algoliaSearchText !== this.$store.getters.algoliaSearchText) { // because input have 2 events
        this.$store.dispatch('algoliaSearch', this.algoliaSearchText)
        // this.$store.dispatch('USER_EVENT', `Поиск по слову: "${this.algoliaSearchText}"`)
        // }
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
      },
      filtersTree() {
        if (!this.$store.getters.dictionaries || !this.selectedNode || !this.selectedNode.filters) {
          return []
        }
        let tree = []
        let treeNode = {}
        this.selectedNode.filters.forEach(el => {
          treeNode.value = this.$store.getters.DYNAMIC_PROPS[el].value
          treeNode.label = this.$store.getters.DYNAMIC_PROPS[el].label
          treeNode.children = []
          if (this.$store.getters.dictionaries[el]) {
            this.$store.getters.dictionaries[el].forEach(item => {
              treeNode.children.push({value: item, label: item, prop: el})
            })
          }
          tree.push(treeNode)
          treeNode = {}
        })
        return tree
      }
    },
    created() {
      this.$store.dispatch('fetchProductStatistics')
      this.$store.dispatch('fetchProducts')
      this.$store.dispatch('fetchDictionaries')
    },
    watch: {
      filterText(val) {
        this.$refs.catalog.filter(val);
      }
    },
  }
</script>

<style scoped lang="scss">
  #shop_wrap {
    display: flex;
    justify-content: start;
    flex-wrap: wrap;
  }

  #nav_menu {
    flex: 0 0 320px;
  }

  #central_view {
    /*min-width: 600px;*/
    flex: 1;
  }

  #price_filter {
    display: flex;
    align-items: center;
    padding: 0 10px;
    margin-right: 10px;
    margin-left: 10px;
    margin-bottom: 10px;
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

  #product_card_wrap {
    display: flex;
    justify-content: start;
    padding-left: 10px;
    padding-right: 10px;
  }

  #filter_category {
    padding: 10px;
  }

  #algolia_search {
    padding-top: 10px;
    padding-bottom: 10px;
  }

  #search_loading {
    padding-right: 7px;
    padding-left: 7px;
  }

  #algolia_icon {
    padding-top: 5px;
    height: 28px;
  }

  @media only screen and (max-width: $sm-screen) {
    #nav_menu {
      flex: 0 0 100%;
    }
    #filters {
      display: none;
    }
  }
</style>
