<template>
  <el-row v-if="userOrders && Object.keys(userOrders).length" type="flex" justify="center">
    <el-col :xs="22" :sm="20" :md="18" :lg="16" :xl="12" type="flex" align="middle">
      <p id="order_title" align="left">
        <!--<img src="@/assets/icons/routers/list.svg" id="order_bag" alt="">-->
        ИСТОРИЯ ПОКУПОК
      </p>
      <div v-if="userOrders">
        <hr>
        <el-row
          v-for="order in userOrders" :key="order.id"
          type="flex"
          justify="center"
          class="order"
          style="flex-wrap: wrap">
          <el-col :span="24" align="left">
            <el-row
              type="flex"
              justify="center"
              style="flex-wrap: wrap; align-items: center">
              <el-col :xs="6" :sm="3" :md="3" :lg="2" :xl="2">
                <el-switch v-model="order.showDetails" type="text"></el-switch>
              </el-col>
              <el-col :xs="18" :sm="21" :md="21" :lg="22" :xl="22">
                <el-tag type="info">ИД: {{ order.id }}</el-tag>
                <el-tag type="info">{{ new Date(order.history.created).toDateString() }}</el-tag>
                <el-tag type="info">{{ order.amount.final.value }} {{ order.amount.final.currency }}</el-tag>
                <el-tag type="info">{{ $store.getters.ORDER_STATUSES[order.status].label }}</el-tag>
                <el-tag type="info">{{ $store.getters.PAYMENT_STATUSES[order.payment.status].label }}</el-tag>
              </el-col>
            </el-row>
            <!--DETAILS-->
            <div v-show="order.showDetails === true" :key="order.id">
              <el-row type="flex" justify="center" style="flex-wrap: wrap;">
                <el-col :xs="20" :sm="10" :md="10" :lg="10" :xl="10">
                  <div v-if="order.buyer">
                    <p class="info_title">
                      <!--<v-icon class="info&#45;&#45;text">person_pin_circle</v-icon>-->
                      Контакты:
                    </p>
                    <p>
                      Имя: {{ order.buyer.firstname }}<br>
                      Фамилия: {{ order.buyer.lastname }}<br>
                      Email: {{ order.buyer.email }}<br>
                      Телефон: {{ order.buyer.phone }}<br>
                    </p>
                    <p>
                      <!--<v-icon class="info&#45;&#45;text">monetization_on</v-icon>-->
                      <span class="info_title">
                        Оплата:
                      </span><br>
                      {{ $store.getters.PAYMENT_TYPES[order.payment.type].label }}:
                      {{ $store.getters.PAYMENT_METHODS[order.payment.method].label }}
                    </p>
                  </div>
                </el-col>
                <el-col :xs="20" :sm="10" :md="10" :lg="10" :xl="10">
                  <div v-if="order.delivery && order.delivery.address">
                    <p class="info_title">
                      <!--<v-icon class="info&#45;&#45;text">location_on</v-icon>-->
                      Доставка:
                    </p>
                    <p>
                      Страна: {{ order.delivery.address.country }}<br>
                      Город: {{ order.delivery.address.city }}<br>
                      Улица: {{ order.delivery.address.street }}<br>
                      Здание: {{ order.delivery.address.build }}<br>
                      Дом: {{ order.delivery.address.house }}<br>
                      Почтовый индекс: {{ order.delivery.address.postCode }}<br>
                    </p>
                    <p>
                      <!--<v-icon class="info&#45;&#45;text">airplanemode_active</v-icon>-->
                      <span class="info_title">
                        Способ доставки:
                      </span><br>
                      {{ $store.getters.DELIVERY_METHODS[order.delivery.method].label }}
                    </p>
                  </div>
                </el-col>
              </el-row>
              <el-row type="flex" justify="center" style="flex-wrap: wrap">
                <!--Standard looping is not working-->
                <el-col :span="20">
                  <div>
                    <!--<v-icon class="info&#45;&#45;text">shopping_cart</v-icon>-->
                    <span class="info_title">
                      Товары:
                    </span>
                  </div>
                  <div v-for="i in 10" :key="i">
                    <div v-if="order.products[i-1]">
                      Артикул:
                      <el-tag size="mini" type="info">
                        {{ order.products[i-1].SKU }}
                      </el-tag>
                      <p>
                        Название: {{ order.products[i-1].title }}<br>
                        Цена: {{ order.products[i-1].price | price }} {{ order.products[i-1].currency }}<br>
                        Количество: {{ order.products[i-1].qty }}
                      </p>
                    </div>
                  </div>
                  <!--<p v-if="order.comments">-->
                  <!--<span>-->
                  <!--<i class="el-icon-warning"></i>-->
                  <!--Комментарии:-->
                  <!--</span>-->
                  <!--{{ order.comments.user }}<br>-->
                  <!--</p>-->
                </el-col>
              </el-row>
            </div>
            <hr>
          </el-col>
        </el-row>
      </div>
    </el-col>
  </el-row>
</template>

<script>
export default {
  name: 'OrdersHistory',
  components: {},
  data () {
    return {}
  },
  methods: {},
  computed: {
    userOrders () {
      return this.$store.getters.orders
    }
  }
}
</script>

<style scoped lang="scss">
  #order_title {
    color: $color-secondary;
    font-size: 18px;
  }

  #order_bag {
    height: 28px;
    margin-bottom: -5px;
    margin-right: 2px;
  }

  .order {
    /*color: white;*/
  }

  .order:before {
    content: "";
    display: block;
    position: absolute;
    z-index: 0;
    width: 100%;
    height: 100%;
    /*background: white;*/
    opacity: .05;
  }

  .info_title {
    font-size: 16px;
    font-weight: 600;
  }

  #confirm_payment {
    margin-top: 10px;
    /*color: white;*/
    border: 1px solid $color-secondary;
    background: $color-secondary;
  }
</style>
