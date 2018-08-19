<template>
  <div id="filters">
    <el-row id="filter_title">
      <el-col :span="19">Фильтр</el-col>
      <el-col v-if="dynamicFilters && Object.keys(dynamicFilters).length" :span="5">
        <div id="clear_filter" @click="clearCheckedFilters">
          <i class="el-icon-close"></i>
        </div>
      </el-col>
    </el-row>
    <div v-if="filtersTree.length">
      <el-tree
        id="filter_tree"
        ref="filtersTree"
        :data="filtersTree"
        :props="defaultProps"
        @check="getCheckedFilterNodes"
        node-key="value"
        highlight-current
        show-checkbox>
      </el-tree>
    </div>
    <p v-else id="no_filters">Нет фильтров</p>
  </div>
</template>
<script>
  export default {
    name: 'DynamicCategoryFilters',
    props: {},
    data() {
      return {
        filtersTree: '',
        defaultProps: {children: 'children', value: 'value', label: 'label'},
      }
    },
    methods: {
      async clearCheckedFilters() {
        if (this.$refs.filtersTree) {
          this.$refs.filtersTree.setCheckedNodes([])
        }
        await this.$store.dispatch('setProductDynamicFilters', '')
      },


      getCheckedFilterNodes(data, tree) { // active dynamic filters
        let filterObj = {} // { color: [red, green], size: [big, small] }
        let prevNodeProp
        let filterString = ''
        tree.checkedNodes.forEach(node => {
          if (!node.children) {
            if (prevNodeProp === node.prop) {
              filterObj[node.prop].push(node.value)
              filterString += `; ${node.value}`
            } else {
              filterObj[node.prop] = [node.value]
              filterString += ` / ${this.$store.getters.DYNAMIC_PROPS[node.prop].label}: ${node.value}`
            }
            prevNodeProp = node.prop
          }
          this.$store.dispatch('USER_EVENT', 'Фильтр: ' + filterString)
        })
        this.$store.dispatch('setProductDynamicFilters', filterObj).then(() => {
          this.$store.dispatch('createDynamicFilteredProductIds')
        })
      },


      createFiltersTree() { // get unique values of fetched products by every dynamic props
        let selectedNode = this.$store.getters.selectedCatalogNode
        if (!selectedNode && selectedNode.type !== 'category' || !selectedNode.filters) {
          return
        }
        let tree = []
        let node = {}
        selectedNode.filters.forEach(prop => {
          node.value = this.$store.getters.DYNAMIC_PROPS[prop].value
          node.label = this.$store.getters.DYNAMIC_PROPS[prop].label
          node.children = []
          let unique = []
          let products = this.$store.getters.products
          for (let p in products) {
            if (products[p][prop] && unique.indexOf(products[p][prop]) === -1) {
              unique.push(products[p][prop])
            }
          }
          unique.forEach(el => {
            node.children.push({
              value: el,
              label: el.length > 27 ? `${el.slice(27)}...` : el,
              prop: prop
            })
          })
          if (node.children.length) {
            node.children.sort((a,b) => a.value - b.value)
            tree.push(node)
          }
          node = {}
        })
        this.filtersTree = tree
      }
    },
    computed: {
      dynamicFilters() {
        return this.$store.getters.productDynamicFilters
      },
      selectedCatalogNode () {
        return this.$store.getters.selectedCatalogNode
      },
      products () {
        return this.$store.getters.products
      }
    },
    watch: {
      products() {
        this.createFiltersTree()
      }
    }
  }
</script>
<style scoped lang="scss">

  #filters {
    margin-top: 10px;
    flex: 0 0 300px;
  }

  #filter_title {
    display: flex;
    justify-content: start;
    padding-left: 18px;
    align-items: center;
    height: 33px;
    color: #909399;
    background: #f5f7fa;
    border: 1px solid #dcdfe6;
    border-radius: 4px;
    margin-right: 10px;
    width: 290px;
  }

  #filter_tree {
    font-weight: 300;
  }

  #clear_filter {
    background: $color-primary;
    padding: 7px 8px 7px 20px;
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

  #no_filters {
    text-align: center;
    color: $color-info;
  }

  @media only screen and (max-width: $sm-screen) {
    #filters {
      display: none;
    }
  }
</style>
