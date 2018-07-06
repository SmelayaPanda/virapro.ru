<template>
  <div>
    <RouterHeader>
      <div slot="title">КОРЗИНА</div>
    </RouterHeader>
  <el-row v-if="userCart" id="desctop_shopping_cart">
    <el-col :xs="22" :sm="22" :md="18" :lg="16" :xl="14" type="flex" align="middle">
      <div v-if="!Object.keys(userCart).length">
        <p id="cart_is_empty">Ваша корзина пуста</p>
        <router-link to="/catalog">
          <el-button class="primary_btn" id="into_catalog">
            <span style="padding-left: 15px;padding-right: 5px;">В каталог</span>
            <i class="el-icon-arrow-right"></i>
            <i class="el-icon-arrow-right"></i>
          </el-button>
        </router-link>
      </div>
      <div v-if="Object.keys(userCart).length">
        <el-row id="cart_table_header">
          <el-col :span="3">ТОВАР</el-col>
          <el-col :span="11">НАИМЕНОВАНИЕ</el-col>
          <el-col :span="4">КОЛИЧЕСТВО</el-col>
          <el-col :span="3">СУММА</el-col>
          <el-col :span="2">УДАЛИТЬ</el-col>
        </el-row>
        <div v-for="product in userCart" :key="product.productId" v-if="product">
          <el-row class="product_row">
            <el-col :xs="6" :sm="3" :md="3" :lg="3" :xl="3">
              <img v-if="product.img_0.thumbnail" :src="product.img_0.thumbnail" ref="img_0"/>
            </el-col>
            <el-col :xs="18" :sm="11" :md="11" :lg="11" :xl="11">
              <router-link :to="`/catalog/${product.group}/${product.category}/${product.productId}`">
                <p id="cart_product_descr">{{ product.title }} <br>
                  <span class="cart_sub_text">Артикул: {{ product.SKU }}</span>
                </p>
              </router-link>
            </el-col>
            <el-col :xs="11" :sm="4" :md="4" :lg="4" :xl="4">
              <el-input-number size="small" v-model="product.qty" :min="1" :max="product.totalQty"></el-input-number>
            </el-col>
            <el-col :xs="9" :sm="3" :md="3" :lg="3" :xl="3">
              <p class="price">{{ parseFloat(product.qty * product.price).toFixed(2) }} р.</p>
            </el-col>
            <el-col class="remove_from_cart" :xs="4" :sm="2" :md="3" :lg="2" :xl="2">
              <i @click="removeFromCart(product)" class="el-icon-delete"></i>
            </el-col>
          </el-row>
        </div>
        <div v-if="Object.keys(userCart).length">
          <p id="total_price">ИТОГО: {{ parseFloat(totalOrder.price).toFixed(2) }} RUB</p>
          <el-row id="total_row">
            <nuxt-link to="/catalog" exact>
              <el-button class="secondary_btn" style="width: 208px">ПРОДОЛЖИТЬ ПОКУПКИ</el-button>
            </nuxt-link>
            <checkout type="all" :checkout-obj="totalOrder.items" style="margin-left: 10px;"></checkout>
          </el-row>
        </div>
      </div>
    </el-col>
  </el-row>
  </div>
</template>
<script>
  import Checkout from "./Checkout";
  import RouterHeader from "../RouterHeader";

  export default {
    name: 'CartProducts',
    components: {RouterHeader, Checkout},
    props: {},
    methods: {
      removeFromCart(product) {
        this.$store.dispatch('updateOwnProducts', {
          subject: 'cart',
          operation: 'remove',
          product: product
        })
      }
    },
    computed: {
      userCart() {
        return !Array.isArray(this.$store.getters.user.cart) ? this.$store.getters.user.cart : {};
      },
      totalOrder() {
        let items = []
        let price = 0
        let cart = this.userCart
        if (cart) {
          for (let pId in cart) {
            if (cart.hasOwnProperty(pId) && cart[pId]) {
              let item = {}
              item.productId = cart[pId].productId
              item.qty = cart[pId].qty
              price += cart[pId].qty * cart[pId].price
              items.push(item)
            }
          }
        }
        return {items: items, price: price}
      }
    }
  }
</script>
<style scoped lang="scss">

  #desctop_shopping_cart {
    display: flex;
    justify-content: center;
    margin-top: 20px;
    margin-bottom: 30px;
    h1 {
      color: $color-primary;
      font-size: 28px;
      font-weight: 600;
    }

    #cart_table_header {
      display: flex;
      justify-content: start;
      align-items: center;
      font-size: 12px;
      color: $color-info-dark;
      margin-top: 30px;
      flex-wrap: wrap;
      background: $color-primary-light-2;
      padding-right: 10px;
      div {
        padding: 14px;
        font-size: 10px;
      }
    }

    .product_row {
      display: flex;
      justify-content: start;
      align-items: center;
      flex-wrap: wrap;
      border: 1px solid $color-primary-light-2;
      border-top: none;
      margin: 0;
      padding: 12px;
      img {
        height: 90px;
        width: 78px;
        object-fit: cover;
      }
      .remove_from_cart {
        padding-left: 18px;
      }
    }
  }

  #total_row {
    display: flex;
    justify-content: center;
    margin-top: 20px;
  }

  .cart_sub_text {
    color: $color-info;
    font-size: 12px;
  }

  #total_price {
    color: $color-success-second;
    font-size: 16px;
    font-weight: 600;
    text-align: center;
    margin-top: 20px;
  }

  .price {
    font-weight: 500;
  }

  .el-icon-delete {
    transition: all .3s;
    transform: scale(1.4);
    &:hover {
      cursor: pointer;
      transform: scale(1.6);
    }
  }

  #cart_bag {
    height: 28px;
    margin-bottom: -5px;
    margin-right: 2px;
  }

  #cart_product_descr {
    padding-left: 15px;
    text-align: left;
  }

  .product_count {
    display: inline-flex;
    justify-content: center;
    align-items: center;
    font-size: 18px;
    font-weight: 500;
    width: 30px;
    height: 30px;
    border: 1px solid $color-secondary;
  }

  @media only screen and (max-width: $sm-screen) {
    #cart_table_header {
      display: none;
      visibility: hidden;
    }
    .product_row {
      border-top: 1px solid $color-primary-light-2 !important;
    }
  }

  #cart_is_empty {
    color: $color-info;
  }
</style>
