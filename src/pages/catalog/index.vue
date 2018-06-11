<template>
  <el-row id="shop_wrap">
    <el-col :xs="24" :sm="24" :md="7" :lg="6" :xl="5">
      <div id="filter_category">
        <el-input
          label="Category Filter"
          placeholder="Find group"
          v-model="filterText">
        </el-input>
      </div>
      <el-tree
        :key="treeKey"
        ref="productTree"
        empty-text="No data"
        :data="$store.getters.PRODUCT_TREE"
        :props="defaultProps"
        @node-click="handleNodeClick"
        :filter-node-method="filterNode"
        :indent="16"
        highlight-current
        accordion>
      </el-tree>
    </el-col>
    <el-col :xs="24" :sm="24" :md="17" :lg="17" :xl="17">
      <el-row id="product_card_wrap">
        <el-col :span="15">
          <div id="algolia_search">
            <el-input
              label="Algolia Filter"
              @change="algoliaSearch"
              @keyup.enter.exact="algoliaSearch"
              placeholder="Find product"
              v-model="algoliaSearchText">
              <el-button slot="append" icon="el-icon-search"></el-button>
            </el-input>
          </div>
        </el-col>
        <el-col :span="9" align="right" id="view_type">
          <el-radio-group v-model="view" size="mini" border>
            <el-radio-button label="list">
              <img v-if="view === 'list'" src="~/assets/icons/view/list-white.svg" alt="View List">
              <img v-else src="~/assets/icons/view/list-black.svg" alt="View List">
            </el-radio-button>
            <el-radio-button label="module">
              <img v-if="view === 'module'" src="~/assets/icons/view/module-white.svg" alt="View Module">
              <img v-else src="~/assets/icons/view/module-black.svg" alt="View Module">
            </el-radio-button>
          </el-radio-group>
        </el-col>
      </el-row>
      <el-row id="product_filters">
        <el-col :span="24">
          <el-collapse v-model="activeNames">
            <el-collapse-item title="Extend Filter" name="1">
              <div>Consistent with real life: in line with the process and logic of real life, and comply with languages
                and habits that the users are used to;
              </div>
              <div>Consistent within interface: all elements should be consistent, such as: design style, icons and
                texts, position of elements, etc.
              </div>
            </el-collapse-item>
          </el-collapse>
        </el-col>
      </el-row>
      <el-row>
        <el-col :xs="24"
                :sm="view === 'list' ? 24 : 12"
                :md="view === 'list' ? 24 : 12"
                :lg="view === 'list' ? 24 : 8"
                :xl="view === 'list' ? 24 : 8"
                v-for="p in products" :key="p.productId"
                itemscope itemtype="http://schema.org/ItemList">
          <ProductCard :id="p.productId" :view="view" itemprop="itemListElement" itemtype="http://schema.org/Product"/>
        </el-col>
      </el-row>
    </el-col>
  </el-row>
</template>

<script>
  import ProductCard from "@/components/shop/ProductCard";

  export default {
    components: {ProductCard},
    data() {
      let filter = this.$store.getters.productFilters
      return {
        catalog: [],
        filterText: '',
        algoliaSearchText: '',
        treeKey: '1',
        view: 'list',
        activeNames: [], // ['1', '2']
        defaultProps: {
          children: 'children',
          label: 'label',
          disabled: false
        },
        hoverOnCard: false,
        sortByPrice: filter.sortByPrice,
        sliderValues: [
          filter.minPrice,
          filter.maxPrice
            ? filter.maxPrice
            : this.$store.getters.productStatistics.maxPrice
        ],
        selectedCountry: filter.country,
        selectedBrand: filter.brand,
        selectedColor: filter.color,
        selectedMaterial: filter.material,
        selectedGroup: filter.group,
        selectedCategory: filter.category,
        isCollapsed: false,
        activeName:
          !filter.brand &&
          !filter.color &&
          !filter.minPrice &&
          !filter.maxPrice ? '0' : '1'
      };
    },
    methods: {
      handleNodeClick(data) {
        console.log(data)
        // TODO: check repeated click, block loading
        let filter = {
          [data.type]: data.value,
          sortByPrice: 'desc'
        }
        this.$store.dispatch('setLastVisible', null)
        this.$store.dispatch('productFilters', filter).then(() => this.$store.dispatch('fetchProducts'))
        if (data.value === 'all') {
          this.treeKey = new Date().getTime()
          this.$forceUpdate()
        }
      },
      filterNode(value, data) {
        if (!value) {
          this.treeKey = new Date().getTime()
          this.$forceUpdate()
        }
        return data.label.indexOf(value) !== -1;
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
        this.$store.dispatch('productFilters', {
          limit: 15,
          sortByPrice: this.sortByPrice,
          minPrice: this.sliderValues[0],
          maxPrice: this.sliderValues[1],
          category: this.selectedCategory,
          group: this.selectedGroup,
          country: this.selectedCountry,
          brand: this.selectedBrand,
          color: this.selectedColor,
          material: this.selectedMaterial
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
      changeCategory(key) {
        let groupList = ['sexToy', 'bdsm', 'baa', 'condom', 'eroticLingerie', 'cosmetic', 'gifts']
        if (groupList.indexOf(key) !== -1) {
          this.selectedGroup = key
          this.selectedCategory = null
        } else {
          this.selectedCategory = key
          this.selectedGroup = null
        }
        // this.$store.dispatch('USER_EVENT', `Категория: ${this.searchGroup.split(':')[0]}`)
      },
      algoliaSearch() {
        if (!this.algoliaSearchText) {
          this.$store.dispatch('setAlgoliaSearchText', null)
          return this.filterProducts()
        }
        if (this.algoliaSearchText !== this.$store.getters.algoliaSearchText) { // because input have 2 events
          this.$store.dispatch('algoliaSearch', this.algoliaSearchText)
          // this.$store.dispatch('USER_EVENT', `Поиск по слову: "${this.algoliaSearchText}"`)
        }
      },
      logFilterEvents() {
        let lastFilter = this.$store.getters.productFilters
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
      // searchGroup () { // TODO: may be improve it?)
      //   let searchGroup = ''
      //   if (this.selectedCategory) {
      //     for (let group of this.PRODUCT_CLASSIFICATION) {
      //       let categories = group.children
      //       for (let category in categories) {
      //         if (categories.hasOwnProperty(category) &&
      //           categories[category].value === this.selectedCategory) {
      //           searchGroup = categories[category].label
      //         }
      //       }
      //     }
      //   } else if (this.selectedGroup) {
      //     for (let group of this.PRODUCT_CLASSIFICATION) {
      //       if (group.value === this.selectedGroup) {
      //         searchGroup = group.label
      //       }
      //     }
      //   } else {
      //     searchGroup = 'Все'
      //   }
      //   return searchGroup + ' : '
      // },
      user() {
        return this.$store.getters.user
      }
    },
    created() {
      this.$store.dispatch('fetchProducts')
    },
    watch: {
      filterText(val) {
        this.$refs.productTree.filter(val);
      }
    },
  }
</script>

<style scoped lang="scss">
  #product_card_wrap {
    display: flex;
    justify-content: start;
    padding-left: 10px;
    padding-right: 10px;
  }

  #shop_wrap {
    display: flex;
    justify-content: start;
    flex-wrap: wrap;
  }

  #filter_category {
    padding: 10px;
  }

  #algolia_search {
    padding-top: 10px;
    padding-bottom: 10px;
  }

  #product_filters {
    padding-left: 10px;
    padding-right: 10px;
  }

  #view_type {
    padding-top: 11px;
    align-content: right;
  }

  @media only screen and (max-width: $xs-screen) {
    #view_type {
      display: none;
    }
  }
</style>
