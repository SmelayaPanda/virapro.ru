<template>
  <div v-if="reviews">
    <el-row id="status_select">
      <span id="title">Статус</span>
      <el-radio-group v-model="status" @change="loadStatusReviews" size="small">
        <el-radio-button
          v-for="status in $store.getters.REVIEW_STATUSES"
          :key="status.value"
          :label="status.value"> {{ status.label }}
        </el-radio-button>
      </el-radio-group>
    </el-row>

    <div v-for="(review, idx) in reviews" :key="idx">
      <ReviewRow :review="review"/>
    </div>

    <el-row v-if="totalReviewsCount" type="flex" justify="start" id="pagination">
      <el-pagination
        @current-change="changeCurPage"
        @size-change="changePageSize"
        background
        layout="sizes, prev, pager, next, total"
        :current-page.sync="curPage"
        :page-size="pageSize"
        :page-sizes="[5, 10, 20, 50, 100]"
        :total="totalReviewsCount">
      </el-pagination>
    </el-row>
  </div>
</template>

<script>
  import ReviewRow from "./ReviewRow";

  export default {
    name: 'AdminReviews',
    components: {ReviewRow},
    data() {
      return {
        status: 'created',
        curPage: 1,
        pageSize: 6
      }
    },
    methods: {
      loadStatusReviews() {
        return this.$store.dispatch('fetchReviews', {status: this.status})
      },
      changeCurPage(curPage) {
        this.curPage = curPage
      },
      changePageSize(size) {
        this.pageSize = size
      }
    },
    computed: {
      reviews() {
        if (this.$store.getters.reviews) {
          return Object.values(this.$store.getters.reviews)
            .slice((this.curPage - 1) * this.pageSize, this.curPage * this.pageSize)
        } else {
          return []
        }
      },
      totalReviewsCount() {
        return this.$store.getters.reviews ? Object.keys(this.$store.getters.reviews).length : 0
      }
    },
    created() {
      this.loadStatusReviews()
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
