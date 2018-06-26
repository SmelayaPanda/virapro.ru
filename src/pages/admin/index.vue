<template>
  <div>
    <el-row type="flex" justify="left" style="flex-wrap: wrap">
      <!--ORDERS-->
      <el-col :xs="24" :sm="12" :md="8" :lg="8" :xl="8" class="pl-2 pr-2 mt-2">
        <el-card style="height: 100%" :body-style="{ padding: '7px' }">
          <div slot="header" class="clearfix">
            <h3>Покупки</h3>
          </div>
          <div v-if="orderStatistics" align="left" style="padding-left: 10%">
            <p>
              <el-tag outline label color="danger_a">{{ orderStatistics.created }}</el-tag>
              ожидают оплаты
            </p>
            <p>
              <el-tag outline label color="danger_a">{{ orderStatistics.pending }}</el-tag>
              ожидают отправки
            </p>
            <p>
              <el-tag outline label color="info_a">{{ orderStatistics.sent }}</el-tag>
              отправлено
            </p>
            <p>
              <el-tag outline label color="success_a">{{ orderStatistics.delivered }}</el-tag>
              доставлено
            </p>
            <p>
              <el-tag outline label color="warning_a">{{ orderStatistics.refused }}</el-tag>
              отклонено
            </p>
            <p>
              <el-tag label color="primary_a" text-color="white">{{ orderStatistics.totalOrders }}</el-tag>
              общее количество
            </p>
          </div>
        </el-card>
      </el-col>
      <!--PRODUCTS-->
      <el-col :xs="24" :sm="12" :md="8" :lg="8" :xl="8" class="pl-2 pr-2 mt-2">
        <el-card style="height: 100%" :body-style="{ padding: '7px' }">
          <div slot="header" class="clearfix">
            <h3>Товары</h3>
          </div>
          <div v-if="productStatistics" align="left" style="padding-left: 10%">
            <p>
              <el-tag>{{ productStatistics.avgPrice }} RUB</el-tag>
              средняя цена
            </p>
            <p>
              <el-tag>{{ productStatistics.maxPrice }} RUB</el-tag>
              максимальная цена
            </p>
            <p>
              <el-tag>{{ productStatistics.uniqueProductQty }}</el-tag>
              уникальных продуктов
            </p>
            <p>
              <el-tag>{{ productStatistics.totalProductQty }}</el-tag>
              общее количество
            </p>
            <p>
              <el-tag label>{{ productStatistics.totalStoreCoast }} RUB</el-tag>
              общая стоимость
            </p>
          </div>
        </el-card>
      </el-col>
      <!--REVIEW-->
      <el-col :xs="24" :sm="12" :md="8" :lg="8" :xl="8" class="pl-2 pr-2 mt-2">
        <el-card style="height: 100%" :body-style="{ padding: '7px' }">
          <div slot="header" class="clearfix">
            <h3>Отзывы</h3>
          </div>
          <div v-if="reviewStatistics" align="left" style="padding-left: 10%">
            <p>
              <el-tag outline label color="danger_a">{{ reviewStatistics.created }}</el-tag>
              новые
            </p>
            <p>
              <el-tag outline label color="success_a">{{ reviewStatistics.published }}</el-tag>
              опубликованные
            </p>
            <p>
              <el-tag outline label color="warning_a">{{ reviewStatistics.archived }}</el-tag>
              архив
            </p>
            <p>
              <el-tag label color="primary_a" text-color="white">{{ reviewStatistics.totalReviews }}</el-tag>
              общее количество
            </p>
          </div>
        </el-card>
      </el-col>
    </el-row>
    <el-row>
      <el-col :span="24">
        <el-card style="height: 100%" :body-style="{ padding: '20px'}">
          <div slot="header" class="clearfix">
            <h3>Популярные товары</h3>
          </div>
          <el-row v-for="product in popProducts" :key="product.id" id="pop_product_row">
            <el-popover
              placement="top-start"
              width="280"
              trigger="hover">
              <div style="margin: 12px;">
                Статистика товара
                <ul id="product_statistics">
                  <li>Просмотров:
                    {{ product.events.watch }}
                  </li>
                  <li>Добавлений в корзину:
                    {{ product.events.cart ? product.events.cart : 0 }}
                  </li>
                  <li>Покупкок:
                    {{ product.events.checkout ? product.events.checkout : 0 }}
                  </li>
                </ul>
              </div>
              <div slot="reference" id="pop_product_statistics">
                <el-tag type="info" size="small">
                  <span id="watch_count">{{ product.events.watch }}</span> /
                  <span id="cart_count">{{ product.events.cart ? product.events.cart : 0 }}</span> /
                  <span id="checkout_count">{{ product.events.checkout ? product.events.checkout : 0 }}</span>
                </el-tag>
              </div>
            </el-popover>
            <nuxt-link :to="`/catalog/${product.group}/${product.category}/${product.productId}`">
              {{ product.title }}
            </nuxt-link>
            <span class="product_info">( Арт.: {{ product.SKU }}, Цена: {{ product.price }} руб. )</span>
          </el-row>
        </el-card>
      </el-col>
    </el-row>
  </div>
</template>

<script>
  import {db, fs} from '@/services/fireinit'

  export default {
    name: 'index',
    layout: 'admin',
    data() {
      return {
        popProducts: ''
      }
    },
    methods: {
      fetchDashboardStatistics() {
        this.$store.dispatch('fetchProductStatistics')
        this.$store.dispatch('fetchOrderStatistics')
        this.$store.dispatch('fetchReviewStatistics')
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
      }
    },
    created() {
      this.fetchDashboardStatistics()
      db.ref('productCounters').orderByChild('watch').limitToLast(5).on('value', snap => {
        let popProducts = {}
        let actions = []
        let fetchProduct = function (data) {
          return fs.collection('products').doc(data.key).get().then(snap => {
            if (snap.exists) {
              popProducts[data.key] = snap.data()
              popProducts[data.key].events = data.val()
            }
          })
        }
        snap.forEach(data => {
          actions.push(fetchProduct(data))
        });
        Promise.all(actions).then(() => {
          this.popProducts = popProducts
        })
      });
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

  .product_info {
    color: $color-info;
    font-size: 12px;
    margin-left: 5px;
  }

  #pop_product_statistics {
    margin: 5px;
    width: 100px;
  }

  #pop_product_row {
    display: flex;
    align-items: center;
  }
</style>
