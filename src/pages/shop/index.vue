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
              placeholder="Find product"
              v-model="algoliaText">
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
  import ProductCard from "../../components/shop/ProductCard";

  export default {
    components: {ProductCard},
    data() {
      return {
        filterText: '',
        algoliaText: '',
        treeKey: '1',
        view: 'list',
        activeNames: [], // ['1', '2']
        defaultProps: {
          children: 'children',
          label: 'label',
          disabled: false
        }
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
      },
      filterNode(value, data) {
        if (!value) {
          this.treeKey = new Date().getTime()
          this.$forceUpdate()
        }
        return data.label.indexOf(value) !== -1;
      }
    },
    computed: {
      products() {
        return this.$store.getters.products ? this.$store.getters.products : {}
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
