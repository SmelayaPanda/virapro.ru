<template>
  <el-row id="shop_wrap">
    <el-col :xs="24" :sm="24" :md="7" :lg="6" :xl="5">
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
    <el-col :xs="24" :sm="24" :md="17" :lg="17" :xl="17">
      <el-row id="product_card_wrap">
        <el-col>
          <el-radio-group v-model="view" size="mini" id="view_type">
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
        <el-col :xs="24"
                :sm="view === 'list' ? 23 : 12"
                :md="view === 'list' ? 23 : 12"
                :lg="view === 'list' ? 23 : 8"
                :xl="view === 'list' ? 23 : 8"
                v-for="i in 15" :key="i"
                itemscope itemtype="http://schema.org/ItemList">
          <product-card :id="i" :view="view" itemprop="itemListElement" itemtype="http://schema.org/Product"/>
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
        view: 'list',
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
    justify-content: start;
  }

  #shop_wrap {
    display: flex;
    justify-content: start;
    flex-wrap: wrap;
  }

  #filter_category {
    padding: 10px;
  }

  #view_type {
    padding: 10px;
  }

  @media only screen and (max-width: $xs-screen) {
    #view_type {
      display: none;
    }
  }
</style>
