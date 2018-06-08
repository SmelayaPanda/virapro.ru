<template>
  <div>
    <el-row type="flex" justify="left" style="flex-wrap: wrap">
      <!--ORDERS-->
      <el-col :xs="24" :sm="12" :md="8" :lg="8" :xl="8" class="pl-2 pr-2 mt-2">
        <el-card style="height: 100%">
          <div slot="header" class="clearfix">
            <h3>
              <!--<v-icon>description</v-icon>-->
              Покупки
            </h3>
          </div>
          <div v-if="orderStatistics" align="left" style="padding-left: 10%">
            <p><el-tag outline label color="danger_a">{{ orderStatistics.created }}</el-tag> ожидают оплаты</p>
            <p><el-tag outline label color="danger_a">{{ orderStatistics.pending }}</el-tag> ожидают отправки</p>
            <p><el-tag outline label color="info_a">{{ orderStatistics.sent }}</el-tag> отправлено</p>
            <p><el-tag outline label color="success_a">{{ orderStatistics.delivered }}</el-tag> доставлено</p>
            <p><el-tag outline label color="warning_a">{{ orderStatistics.refused }}</el-tag> отклонено</p>
            <p><el-tag label color="primary_a" text-color="white">{{ orderStatistics.totalOrders }}</el-tag> общее количество</p>
          </div>
        </el-card>
      </el-col>
      <!--PRODUCTS-->
      <el-col :xs="24" :sm="12" :md="8" :lg="8" :xl="8" class="pl-2 pr-2 mt-2">
        <el-card style="height: 100%">
          <div slot="header" class="clearfix">
            <h3>
              <!--<v-icon>playlist_add</v-icon>-->
              Товары
            </h3>
          </div>
          <div v-if="productStatistics" align="left" style="padding-left: 10%">
            <p><el-tag>{{ productStatistics.avgPrice }} RUB</el-tag> средняя цена</p>
            <p><el-tag>{{ productStatistics.maxPrice }} RUB</el-tag> максимальная цена</p>
            <p><el-tag>{{ productStatistics.uniqueProductQty }}</el-tag> уникальных продуктов</p>
            <p><el-tag>{{ productStatistics.totalProductQty }}</el-tag> общее количество</p>
            <p><el-tag label>{{ productStatistics.totalStoreCoast }} RUB</el-tag> общая стоимость</p>
          </div>
        </el-card>
      </el-col>
      <!--REVIEW-->
      <el-col :xs="24" :sm="12" :md="8" :lg="8" :xl="8" class="pl-2 pr-2 mt-2">
        <el-card style="height: 100%">
          <div slot="header" class="clearfix">
            <h3>
              <!--<v-icon>record_voice_over</v-icon>-->
              Отзывы
            </h3>
          </div>
          <div v-if="reviewStatistics" align="left" style="padding-left: 10%">
            <p><el-tag  outline label  color="danger_a">{{ reviewStatistics.created }}</el-tag> новые</p>
            <p><el-tag  outline label  color="success_a">{{ reviewStatistics.published }}</el-tag> опубликованные</p>
            <p><el-tag outline label color="warning_a">{{ reviewStatistics.archived }}</el-tag> архив</p>
            <p><el-tag label color="primary_a" text-color="white">{{ reviewStatistics.totalReviews }}</el-tag> общее количество</p>
          </div>
        </el-card>
      </el-col>
    </el-row>
  </div>
</template>

<script>
  export default {
    name: 'index',
    layout: 'admin',
    methods: {
      fetchDashboardStatistics () {
        this.$store.dispatch('fetchProductStatistics')
        this.$store.dispatch('fetchOrderStatistics')
        this.$store.dispatch('fetchReviewStatistics')
      }
    },
    computed: {
      productStatistics () {
        return this.$store.getters.productStatistics
      },
      orderStatistics () {
        return this.$store.getters.orderStatistics
      },
      reviewStatistics () {
        return this.$store.getters.reviewStatistics
      }
    },
    created () {
      this.fetchDashboardStatistics()
    }
  }
</script>

<style scoped>

</style>
