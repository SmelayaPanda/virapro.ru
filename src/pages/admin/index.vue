<template>
  <div>
    <UsersEventsChart/>
    <el-row type="flex" justify="left" style="flex-wrap: wrap">
      <!--ORDERS-->
      <el-col :xs="24" :sm="12" :md="12" :lg="6" :xl="6">
        <el-card style="height: 100%" :body-style="{ padding: '10px'}">
          <div slot="header" class="clearfix">
            <h3>Покупки</h3>
          </div>
          <div v-if="orderStatistics">
            <el-row class="item_row">
              <el-col :span="17" :offset="2">ожидают оплаты</el-col>
              <el-col :span="5">
                <el-tag outline label>{{ orderStatistics.created }}</el-tag>
              </el-col>
            </el-row>
            <el-row class="item_row">
              <el-col :span="17" :offset="2">ожидают отправки</el-col>
              <el-col :span="5">
                <el-tag outline label>{{ orderStatistics.pending }}</el-tag>
              </el-col>
            </el-row>
            <el-row class="item_row">
              <el-col :span="17" :offset="2">отправлено</el-col>
              <el-col :span="5">
                <el-tag outline label>{{ orderStatistics.sent }}</el-tag>
              </el-col>
            </el-row>
            <el-row class="item_row">
              <el-col :span="17" :offset="2">доставлено</el-col>
              <el-col :span="5">
                <el-tag outline label>{{ orderStatistics.delivered }}</el-tag>
              </el-col>
            </el-row>
            <el-row class="item_row">
              <el-col :span="17" :offset="2">отклонено</el-col>
              <el-col :span="5">
                <el-tag outline label>{{ orderStatistics.refused }}</el-tag>
              </el-col>
            </el-row>
            <el-row class="item_row">
              <el-col :span="17" :offset="2">общее количество</el-col>
              <el-col :span="5">
                <el-tag outline label>{{ orderStatistics.totalOrders }}</el-tag>
              </el-col>
            </el-row>
          </div>
        </el-card>
      </el-col>
      <!--REQUESTS-->
      <el-col :xs="24" :sm="12" :md="12" :lg="6" :xl="6">
        <el-card style="height: 100%" :body-style="{ padding: '10px'}">
          <div slot="header" class="clearfix">
            <h3>Заявки</h3>
          </div>
          <div v-if="requestsStatistics">
            <el-row class="item_row">
              <el-col :span="17" :offset="2">новые</el-col>
              <el-col :span="5">
                <el-tag outline label>{{ requestsStatistics.created }}</el-tag>
              </el-col>
            </el-row>
            <el-row class="item_row">
              <el-col :span="17" :offset="2">обработанные</el-col>
              <el-col :span="5">
                <el-tag outline label>{{ requestsStatistics.handled }}</el-tag>
              </el-col>
            </el-row>
            <el-row class="item_row">
              <el-col :span="17" :offset="2">общее количество</el-col>
              <el-col :span="5">
                <el-tag outline label>{{ requestsStatistics.total }}</el-tag>
              </el-col>
            </el-row>
          </div>
        </el-card>
      </el-col>
      <!--REVIEW-->
      <el-col :xs="24" :sm="12" :md="12" :lg="6" :xl="6">
        <el-card style="height: 100%" :body-style="{ padding: '10px'}">
          <div slot="header" class="clearfix">
            <h3>Отзывы</h3>
          </div>
          <div v-if="reviewStatistics">
            <el-row class="item_row">
              <el-col :span="17" :offset="2">новые</el-col>
              <el-col :span="5">
                <el-tag outline label>{{ reviewStatistics.created }}</el-tag>
              </el-col>
            </el-row>
            <el-row class="item_row">
              <el-col :span="17" :offset="2">опубликованные</el-col>
              <el-col :span="5">
                <el-tag outline label>{{ reviewStatistics.published }}</el-tag>
              </el-col>
            </el-row>
            <el-row class="item_row">
              <el-col :span="17" :offset="2">архив</el-col>
              <el-col :span="5">
                <el-tag outline label>{{ reviewStatistics.archived }}</el-tag>
              </el-col>
            </el-row>
            <el-row class="item_row">
              <el-col :span="17" :offset="2">общее количество</el-col>
              <el-col :span="5">
                <el-tag outline label>{{ reviewStatistics.totalReviews }}</el-tag>
              </el-col>
            </el-row>
          </div>
        </el-card>
      </el-col>
      <!--PRODUCTS-->
      <el-col :xs="24" :sm="12" :md="12" :lg="6" :xl="6">
        <el-card style="height: 100%" :body-style="{ padding: '10px'}">
          <div slot="header" class="clearfix">
            <h3>Товары</h3>
          </div>
          <div v-if="productStatistics">
            <el-row class="item_row">
              <el-col :span="14" :offset="1">средняя цена</el-col>
              <el-col :span="9">
                <el-tag outline label>{{ productStatistics.avgPrice }} &#8381;</el-tag>
              </el-col>
            </el-row>
            <el-row class="item_row">
              <el-col :span="14" :offset="1">макс. цена</el-col>
              <el-col :span="9">
                <el-tag outline label>{{ productStatistics.maxPrice }} &#8381;</el-tag>
              </el-col>
            </el-row>
            <el-row class="item_row">
              <el-col :span="14" :offset="1">уникальных</el-col>
              <el-col :span="9">
                <el-tag outline label>{{ productStatistics.uniqueProductQty }}</el-tag>
              </el-col>
            </el-row>
            <el-row class="item_row">
              <el-col :span="14" :offset="1">общее кол-во</el-col>
              <el-col :span="9">
                <el-tag outline label>{{ productStatistics.totalProductQty }}</el-tag>
              </el-col>
            </el-row>
            <el-row class="item_row">
              <el-col :span="14" :offset="1">общая стоимость</el-col>
              <el-col :span="9">
                <el-tag outline label>{{ productStatistics.totalStoreCoast }} &#8381;</el-tag>
              </el-col>
            </el-row>
          </div>
        </el-card>
      </el-col>
    </el-row>
    <el-row>
      <el-col :span="24">
        <PopularProducts/>
      </el-col>
    </el-row>
  </div>
</template>

<script>
  import UsersEventsChart from "@/components/admin/dashboard/UsersEventsChart";
  import PopularProducts from "@/components/admin/dashboard/PopularProducts";

  export default {
    name: 'index',
    components: {PopularProducts, UsersEventsChart},
    layout: 'admin',
    methods: {
      fetchDashboardStatistics() {
        this.$store.dispatch('fetchProductStatistics')
        this.$store.dispatch('fetchOrderStatistics')
        this.$store.dispatch('fetchReviewStatistics')
        this.$store.dispatch('fetchRequestsStatistics')
      }
    },
    computed: {
      productStatistics() {
        return this.$store.getters.productStatistics
      },
      orderStatistics() {
        return this.$store.getters.orderStatistics
      },
      reviewStatistics() {
        return this.$store.getters.reviewStatistics
      },
      requestsStatistics() {
        return this.$store.getters.requestsStatistics
      }
    },
    created() {
      this.fetchDashboardStatistics()
    }
  }
</script>

<style scoped lang="scss">
  h3 {
    margin: 0px;
  }

  p {
    margin: 10px;
  }

  #product_numer_statistics {
    margin-top: 20px;
    border-top: 1px solid #ebeef5;
    padding: 20px;
  }

  .item_row {
    display: flex;
    font-weight: 300;
    justify-content: start;
    align-items: center;
    padding: 5px;
    border: 1px solid transparent;
    &:hover {
      background: $color-primary-light-2;
      border: 1px solid $color-success-dark;
      border-radius: 3px;
    }
  }

</style>
