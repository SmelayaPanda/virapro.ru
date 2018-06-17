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
      @node-click="handleNodeClick"
      :filter-node-method="filterNode"
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
        if (data.type === 'category' && this.selectedCategory === data.value) {
          return
        }
        // await this.clearCheckedFilters()
        this.selectedNode = data
        if (data.type === 'group') {
          this.selectedGroup = data.value
          this.selectedCategory = ''
        } else if (data.type === 'category') {
          this.selectedCategory = data.value
        }
        this.searchPrefix = data.label
        let filter = {
          [data.type]: data.value,
          sortByPrice: 'desc'
        }
        // this.$store.dispatch('USER_EVENT', `Категория/Группа`)
        if (data.value === 'all-products') {
          this.selectedGroup = ''
          this.selectedCategory = ''
        }
        await this.$store.dispatch('setLastVisible', null)
        await this.$store.dispatch('setProductCommonFilters', filter)
        // await this.filterProducts()
        // this.createFiltersTree()
        if (data.value === 'all-products') {
          this.treeKey = new Date().getTime()
          this.$forceUpdate()
        }
      }
    },
    watch: {
      filterText(val) {
        this.$refs.catalog.filter(val);
      }
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
