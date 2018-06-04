<template>
  <el-row id="shop_wrap">
    <el-col :xs="23" :sm="23" :md="7" :lg="6" :xl="6">
      <div id="filter_category">
        <el-input
          placeholder="Filter keyword"
          v-model="filterText">
        </el-input>
      </div>
      <el-tree
        :key="treeKey"
        ref="productTree"
        :data="data"
        :props="defaultProps"
        @node-click="handleNodeClick"
        :filter-node-method="filterNode"
        :indent="8"
        highlight-current
        :default-expand-all="false"
        accordion>
      </el-tree>
    </el-col>
    <el-col :xs="23" :sm="23" :md="16" :lg="17" :xl="16">
      <el-row id="product_card_wrap">
        <el-col :xs="23" :sm="12" :md="8" :lg="8" :xl="8"
                v-for="i in 15" :key="i"
                itemscope itemtype="http://schema.org/ItemList">
          <product-card :id="i" itemprop="itemListElement" itemtype="http://schema.org/Product"/>
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
        treeKey: '1',
        data: [{
          label: 'Berries',
          children: [
            {label: 'blackberries'},
            {label: 'strawberries'},
            {label: 'cranberries'},
            {label: 'grapes'}
          ]
        }, {
          label: 'Melons',
          children: [
            {label: 'honeydew'},
            {label: 'watermelon'},
            {label: 'muskmelon'},
            {label: 'casaba'},
            {label: 'crenshaw'}
          ]
        }, {
          label: 'Tropical',
          children: [
            {label: 'bananas'},
            {label: 'pineapples'},
            {label: 'avocados'},
            {label: 'dates'},
            {label: 'pomegranates'},
            {label: 'papayas'},
            {label: 'mangoes'}
          ]
        }, {
          label: 'Citrus',
          children: [
            {label: 'oranges'},
            {label: 'grapefruits'},
            {label: 'tangerines'},
            {label: 'lemons'},
            {label: 'limes'},
            {label: 'kumquats'},
            {label: 'tengelows'},
            {label: 'citrons'}
          ]
        }, {
          label: 'Drupes',
          children: [
            {label: 'cherries'},
            {label: 'plums'},
            {label: 'nectarines'},
            {label: 'apricots'}
          ]
        }, {
          label: 'Pomes',
          children: [
            {label: 'apples'},
            {label: 'pears'},
            {label: 'kiwis'}
          ]
        }],
        defaultProps: {
          children: 'children',
          label: 'label'
        }
      };
    },
    methods: {
      handleNodeClick(data) {
        console.log(data);
      },
      filterNode(value, data) {
        if (!value) {
          this.treeKey = new Date().getTime()
          this.$forceUpdate()
        }
        return data.label.indexOf(value) !== -1;
      }
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
    flex-wrap: wrap;
    justify-content: space-evenly;
  }

  #shop_wrap {
    display: flex;
    justify-content: start;
    flex-wrap: wrap;
  }

  #filter_category {
    padding: 10px;
  }
</style>
