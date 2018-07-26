<template>
  <el-card style="height: 100%" :body-style="{ padding: '20px'}">
    <div slot="header" class="clearfix">
      <h3>Популярные товары</h3>
    </div>
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
      <span class="product_info">( Арт.: {{ product.SKU }}, Цена: {{ product.price }} руб. )</span>
    </el-row>
  </el-card>
</template>
<script>
  import {db, fs} from '@/services/fireinit'

  export default {
    name: 'PopularProducts',
    data() {
      return {
        popProducts: ''
      }
    },
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
