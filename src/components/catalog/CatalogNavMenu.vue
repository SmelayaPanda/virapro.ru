<template>
  <div id="catalog_menu">
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
      node-key="value"
      @node-click="handleNodeClick"
      :filter-node-method="filterNode"
      :default-expanded-keys="defaultExpandedKeys"
      :indent="16"
      highlight-current
      accordion>
    </el-tree>
  </div>
</template>
<script>
  export default {
    name: 'CatalogNavMenu',
    props: {},
    data() {
      return {
        catalog: [],
        defaultExpandedKeys: [],
        treeKey: '1',
        filterText: '',
        defaultProps: {children: 'children', value: 'value', label: 'label'},
      }
    },
    methods: {
      filterNode(value, data) { // text search of catalog name
        if (!value) {
          this.treeKey = new Date().getTime()
          this.$forceUpdate()
        }
        return data.label.indexOf(value) !== -1;
      },
      async handleNodeClick(data) { // смена выбраной группы/категории товара
        let filter = this.$store.getters.productCommonFilters
        if ((data.type === 'category' && filter.category === data.value) ||
          (data.type === 'group' && filter.group === data.value && !this.$nuxt.$route.params.category)) {
          return
        }
        await this.$store.dispatch('setSelectedCatalogNode', data)
        await this.$store.dispatch('setLastVisible', '')
        if (data.value === 'all-products') {
          return this.$nuxt.$router.push('/catalog/')
        }
        if (data.type === 'group'){
          return this.$nuxt.$router.push(`/catalog/${data.value}`)
        }
        if (data.type === 'category'){
          return this.$nuxt.$router.push(`/catalog/${this.$nuxt.$route.params.group}/${data.value}`)
        }
      },
      async loadProducts () {
        await this.$store.dispatch('fetchProducts')
      }
    },
    watch: {
      filterText(val) {
        this.$refs.catalog.filter(val);
      }
    },
    created () {
      this.defaultExpandedKeys.push(this.$nuxt.$route.params.group)
    }
  }
</script>
<style scoped lang="scss">

  #catalog_menu {
    flex: 0 0 340px;
  }

  #filter_category {
    padding: 10px;
  }

  @media only screen and (max-width: $sm-screen) {
    #catalog_menu {
      flex: 0 0 100%;
    }
  }
</style>
