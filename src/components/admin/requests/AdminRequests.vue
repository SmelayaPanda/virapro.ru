<template>
  <div v-if="requests">
    <el-row id="status_select">
      <span id="title">Статус</span>
      <el-radio-group v-model="status" @change="loadStatusRequests" size="small">
        <el-radio-button
          v-for="status in $store.getters.REQUESTS_STATUSES"
          :key="status.value"
          :label="status.value"> {{ status.label }}
        </el-radio-button>
      </el-radio-group>
    </el-row>

    <div v-for="(request, idx) in requests" :key="idx">
      <RequestRow :request="request"/>
    </div>

    <el-row v-if="totalRequestsCount" type="flex" justify="start" id="pagination">
      <el-pagination
        @current-change="changeCurPage"
        @size-change="changePageSize"
        background
        layout="sizes, prev, pager, next, total"
        :current-page.sync="curPage"
        :page-size="pageSize"
        :page-sizes="[5, 10, 20, 50, 100]"
        :total="totalRequestsCount">
      </el-pagination>
    </el-row>
    <el-row v-if="totalRequestsCount">
      <p><img src="~/assets/icons/admin/round_green.svg" style="margin-bottom: -6px;" alt=""> простая заявка</p>
      <p><img src="~/assets/icons/admin/round_red.svg" style="margin-bottom: -6px;" alt=""> заявка с заказом услуги</p>
    </el-row>
  </div>
</template>

<script>
  import RequestRow from "./RequestRow";

  export default {
    name: 'AdminRequests',
    components: {RequestRow},
    data() {
      return {
        status: 'created',
        curPage: 1,
        pageSize: 6
      }
    },
    methods: {
      loadStatusRequests() {
        return this.$store.dispatch('fetchRequests', {status: this.status})
      },
      changeCurPage(curPage) {
        this.curPage = curPage
      },
      changePageSize(size) {
        this.pageSize = size
      }
    },
    computed: {
      requests() {
        if (this.$store.getters.requests) {
          return Object.values(this.$store.getters.requests)
            .slice((this.curPage - 1) * this.pageSize, this.curPage * this.pageSize)
        } else {
          return []
        }
      },
      totalRequestsCount() {
        return this.$store.getters.requests ? Object.keys(this.$store.getters.requests).length : 0
      }
    },
    created() {
      this.loadStatusRequests()
    }
  }
</script>

<style scoped lang="scss">

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
