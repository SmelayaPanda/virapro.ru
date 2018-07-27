<template>
  <el-card style="height: 100%" :body-style="{ padding: '20px'}">
    <div slot="header" class="clearfix">
      <h3>Популярные товары</h3>
    </div>
    <el-row type="flex">
      <el-col :span="17">
        <el-row v-for="product in popProducts" :key="product.productId" id="pop_product_row">
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
          <span class="product_info">/ {{ product.price }} &#8381</span>
        </el-row>
      </el-col>
      <el-col :span="7">
        <div class="doughnut-chart">
          <doughnut-chart
            :chartData="doughnutChartData"
            :options="chartOptions" :height="420"/>
        </div>
      </el-col>
    </el-row>
  </el-card>
</template>
<script>
  import {db, fs} from '@/services/fireinit'
  import DoughnutChart from "@/components/chartjs/doughnut-chart";

  export default {
    name: 'PopularProducts',
    components: {DoughnutChart},
    data() {
      return {
        popProducts: '',
        chartOptions: {
          legend: {display: true},
          maintainAspectRatio: true
        },
        doughnutChartData: {
          labels: ['Просмотр', 'Корзина', 'Покупка'],
          datasets: [{
            label: 'кол-во',
            backgroundColor: ['rgba(99, 185, 250, .3)', 'rgba(5, 255, 100, .3)', 'rgba(255, 100, 100, .3)'],
            data: [1, 1, 1]
          }]
        }
      }
    },
    methods: {},
    created() {
      db.ref('productCounters').orderByChild('watch').limitToLast(10).on('value', snap => {
        let popProducts = []
        let actions = []
        let fetchProduct = function (data) {
          return fs.collection('products').doc(data.key).get().then(snap => {
            if (snap.exists) {
              let product = snap.data()
              product.events = data.val()
              popProducts.unshift(product)
            }
          })
        }
        snap.forEach(data => {
          actions.push(fetchProduct(data))
        });
        Promise.all(actions).then(() => {
          this.popProducts = popProducts.sort((a, b) => {
            return a.events.watch && b.events.watch ? a.events.watch < b.events.watch : -1;
          });
          let chartData = [0, 0, 0]
          this.popProducts.forEach(el => {
            if (el.events.watch) chartData[0] += el.events.watch
            if (el.events.cart) chartData[1] += el.events.cart
            if (el.events.checkout) chartData[2] += el.events.checkout
          })
          this.doughnutChartData = {...this.doughnutChartData}
          this.doughnutChartData.datasets[0].data = chartData
        })
      })
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
    font-size: 14px;
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

  .doughnut-chart {
  }
</style>
