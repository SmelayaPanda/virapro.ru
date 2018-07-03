<template>
  <el-card id="order_row_wrap">
    <el-row id="order_row">
      <el-col style="width: 62px">
        <el-button
          :icon="openInfo ? 'el-icon-arrow-down' : 'el-icon-arrow-right'"
          circle plain @click="openInfo = !openInfo">
        </el-button>
      </el-col>
      <el-col style="width: 280px">
        <el-tag size="small" type="success">{{ order.history.created | date }}</el-tag>
      </el-col>
      <el-col style="width: 140px">{{ order.amount.final.value }} &#8381</el-col>
      <el-col :span="8">{{ order.buyer.firstname.concat(' ', order.buyer.lastname ) }}</el-col>
      <el-col :span="8">{{ order.buyer.phone }} <br> {{ order.buyer.email }}</el-col>
      <UpdateOrder :order-id="order.id" style="width: 70px"/>
    </el-row>
    <el-row v-if="openInfo" id="expand_description">
      <el-col :span="24">
        <span class="prop_name">ИД ордера: </span>
        <el-tag type="success" size="small">{{ order.id }}</el-tag>
      </el-col>
      <el-col :span="12">
        <h4>Покупатель:</h4>
        <p>ИД:
          <el-tag type="success" size="small">{{ order.buyer.userId }}</el-tag>
          <br>
          {{ order.buyer.lastname }} {{ order.buyer.firstname }} <br>
          {{ order.buyer.phone }} <br>
          {{ order.buyer.email }}
        </p>
      </el-col>
      <el-col :span="12">
        <br><br>
        <p>
          <b>Адрес:</b>
          {{ order.delivery.address.country }}, {{ order.delivery.address.city }}
          ул. {{ order.delivery.address.street }} {{ order.delivery.address.house }},
          кв. {{ order.delivery.address.build }}, {{ order.delivery.address.postCode }} <br>
          <b>Способ доставки:</b> {{ $store.getters.DELIVERY_METHODS[order.delivery.method].label }}</p>
        <p>
          <b>Оплата:</b>
          {{ $store.getters.PAYMENT_METHODS[order.payment.method].label }}
          ({{ $store.getters.PAYMENT_TYPES[order.payment.type].label }}) /
          <!-- Для читабельности назван статус, а вообще это завершенность оплаты -->
          <i>Статус: </i>
          <el-tag size="small">{{ $store.getters.PAYMENT_ENDING[order.payment.ending].label }}</el-tag>
        </p>
      </el-col>
      <el-col :span="24">
        <h4>Товары:</h4>
        <div v-for="p in order.products" :key="p.id">
          <span>
            <el-tag size="small">{{ p.qty }} x</el-tag>
            {{ p.title }}
            <span id="price">
              ( ИД: <el-tag type="success" size="small">{{ p.id }}</el-tag> /
              Арт.: <el-tag type="info" size="small">{{ p.SKU }}</el-tag> /
              <el-tag type="warning" size="small">{{ p.price }} &#8381</el-tag> )</span>
          </span> <br>
        </div>
      </el-col>
      <el-col :span="24" v-if="order.services && order.services.length">
        <h4> Дополнительные услуги к заказу:</h4>
        <span v-for="service in order.services" :key="service">
          {{ $store.getters.SERVICE_TYPES[service].title }} /
        </span>
      </el-col>
      <el-col :span="24">
        <h4>Комментарии:</h4>
        <p>
          <el-tag type="success" size="small">Ваш:</el-tag>
          <span v-html="order.comments.admin"></span></p>
        <p>
          <el-tag type="success" size="small">Пользователя:</el-tag>
        <p>{{ order.comments.user }}</p>
      </el-col>
      <el-col :span="24">
        <h4>История:</h4>
        <span id="info_status">( Указано последнее значение статуса )</span>
        <el-steps id="history_step" align-center>
          <el-step
            v-if="order.history[status.value]"
            v-for="status in $store.getters.ORDER_STATUSES" :key="status.value"
            :title="status.label"
            :description="order.history[status.value] | date">
          </el-step>
        </el-steps>
      </el-col>
    </el-row>
  </el-card>
</template>
<script>

  import UpdateOrder from "./UpdateOrder";

  export default {
    name: 'OrderRow',
    components: {UpdateOrder},
    props: {
      order: {type: Object, required: true}
    },
    data() {
      return {
        openInfo: false
      }
    }
  }
</script>
<style scoped lang="scss">
  #order_row_wrap {
    font-size: 14px;
    color: $color-secondary
  }

  #order_row {
    display: flex;
    justify-content: start;
    align-items: center;
  }

  #expand_description {
    margin-top: 20px;
    margin-left: 10px;
  }

  .prop_name {
    color: $color-info;
  }

  #price {
    color: $color-info;
  }

  #info_status {
    font-size: 12px;
    color: $color-info
  }

  #history_step {
    margin-top: 40px;
  }
</style>
