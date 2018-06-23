<template>
  <!--
ORDER STATUS CHAIN:
  1. created     - создан
  2. pending     - ожидает отправки ( товар с оплатой при получении попадает сразу в данный статус )
  3. sent        - товар отправлен
  4. delivered   - товар доставлен
  5. refused     - отказ
  -->
  <div v-if="orders">
    <el-row id="status_select">
      <span id="title">Статус</span>
      <el-radio-group v-model="status" @change="loadOrdersWithStatus" size="small">
        <el-radio-button
          v-for="status in $store.getters.ORDER_STATUSES"
          :key="status.value"
          :label="status.value"> {{ status.label }} </el-radio-button>
      </el-radio-group>
    </el-row>
    <div v-for="order in orders" :key="order.id">
      <OrderRow :order="order"></OrderRow>
    </div>
    <el-row v-if="totalOrdersCount" id="pagination">
      <el-pagination
        @current-change="changeCurPage"
        @size-change="changePageSize"
        background
        layout="sizes, prev, pager, next, total"
        :current-page.sync="curPage"
        :page-size="pageSize"
        :page-sizes="[5, 10, 20, 50, 100]"
        :total="totalOrdersCount">
      </el-pagination>
    </el-row>
  </div>
</template>

<script>
  import OrderRow from "./OrderRow";

  export default {
    components: {OrderRow},
    name: 'AdminOrders',
    data() {
      return {
        status: 'created',
        curPage: 1,
        pageSize: 5
      }
    },
    methods: {
      loadOrdersWithStatus() {
        console.log('load')
        console.log(this.status)
        this.$store.dispatch('fetchOrders', {status: this.status})
      },
      changeCurPage(curPage) {
        this.curPage = curPage
      },
      changePageSize(size) {
        this.pageSize = size
      }
    },
    computed: {
      orders() {
        if (this.$store.getters.orders) {
          return Object.values(this.$store.getters.orders)
            .slice((this.curPage - 1) * this.pageSize, this.curPage * this.pageSize)
        } else {
          return []
        }
      },
      totalOrdersCount() {
        return this.$store.getters.orders ? Object.keys(this.$store.getters.orders).length : 0
      }
    },
    created() {
      this.loadOrdersWithStatus()
    }
  }
</script>

<style lang="scss" scoped>
  #pagination {
    margin-top: 10px;
  }

  #title {
    color: $color-info;
    margin-right: 7px;
  }

  #status_select {
    display: flex;
    justify-content: start;
    align-items: center;
    margin-bottom: 10px;
  }
</style>
