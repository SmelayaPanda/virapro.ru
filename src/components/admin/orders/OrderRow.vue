<template>
  <el-card id="order_row_wrap">
    <el-row id="order_row">
      <el-col style="width: 56px">
        <el-button
          :icon="openInfo ? 'el-icon-arrow-down' : 'el-icon-arrow-right'"
          circle plain @click="openInfo = !openInfo">
        </el-button>
      </el-col>
      <el-col style="width: 160px">
        <el-tag size="small" type="success">{{ new Date(order.history.created).toLocaleString() }}</el-tag>
      </el-col>
      <el-col style="width: 100px" class="product_title">{{ order.amount.final.value }} &#8381</el-col>
      <el-col :span="6">{{ order.buyer.firstname.concat(' ', order.buyer.lastname ) }}</el-col>
      <el-col :span="6">{{ order.buyer.phone }} <br> {{ order.buyer.email }}</el-col>
      <ChangeOrder :order-id="order.id"/>
    </el-row>
    <el-row v-if="openInfo" id="expand_description">
      <p><span class="prop_name">ИД ордера: </span>
        <el-tag type="success" size="small">{{ order.id }}</el-tag>
      </p>
      <el-col :span="12">
        <h4>Покупатель:</h4>
        <p>ИД: <el-tag type="success" size="small">{{ order.buyer.userId }}</el-tag></p>
        <p>{{ order.buyer.lastname }} {{ order.buyer.firstname }}</p>
        <p>{{ order.buyer.phone }}</p>
        <p>{{ order.buyer.email }}</p>
      </el-col>
      <el-col :span="12">
        <p>
          <b>Адрес:</b>
        {{ order.delivery.address.country }}, {{ order.delivery.address.city }}</p>
        <p>ул. {{ order.delivery.address.street }} {{ order.delivery.address.house }},
          кв. {{ order.delivery.address.build }}, {{ order.delivery.address.postCode }}
        </p>
        <p><b>Способ доставки:</b> {{ $store.getters.DELIVERY_METHODS[order.delivery.method].label }}</p>
      </el-col>
      <el-col :span="12">
        <p>
          <b>Оплата:</b>
          {{ $store.getters.PAYMENT_METHODS[order.payment.method].label }}
          ({{ $store.getters.PAYMENT_TYPES[order.payment.type].label }})</p>
        <p><i>Статус оплаты: </i>
          <el-tag size="small">{{ $store.getters.PAYMENT_STATUSES[order.payment.status].label }}</el-tag>
        </p>
      </el-col>
      <hr>
      <el-col :span="24">
        <h4>Товары:</h4>
        <div v-for="p in order.products" :key="p.id">
          <p>ИД: <el-tag type="success" size="small">{{ p.id }}</el-tag></p>
          <p><el-tag size="small">{{ p.qty }} x</el-tag> {{ p.title }}
            <span id="price">( Арт.: {{ p.SKU }} - {{ p.price }} &#8381 )</span>
          </p>
        </div>
      </el-col>
      <hr>
      <el-col :span="24">
        <h4>Комментарии:</h4>
        <p>Ваш: {{ order.comments.admin }}</p>
        <p>Пользователя: {{ order.comments.client }}</p>
      </el-col>
    </el-row>
  </el-card>
</template>
<script>

  import ChangeOrder from "./ChangeOrder";
  export default {
    name: 'OrderRow',
    components: {ChangeOrder},
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

  .product_title {
    padding-right: 5px;
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
</style>
