<!--
  order: {
    amount: {
      final: {
        value: String(0.00),
        currency: 'RUB',
      },
      products: {
        value: String(0.00),
        currency: 'RUB'
      },
      delivery: {
        value: String(0.00),
        currency: 'RUB'
      },
      discount: {
        value: String(0.00),
        currency: 'RUB',
      }
    },
    status: 'created' | 'pending' | 'sent' | 'delivered’ | 'refused’,
    history: {
      created: Date,
      pending: Date,
      sent: Date,
      delivered: Date,
      refused: Date
    },
    payment: {
      status: 'none' | 'pending' | 'waiting_for_capture' | 'succeeded' | 'canceled'
      full: Boolean(true = full, false = part)
      type: 'receipt' | 'online'
      method: 'cash' | 'bank_card'  ('sberbank' | 'yandex_money' | 'qiwi' | 'alfabank' | 'webmoney' | 'apple_pay' | 'mobile_balance' | 'installments')
      history: {
        pending: Date,
        waiting_for_capture: Date,
        succeeded: Date,
        canceled: Date
      },
      notification: { // Yandex Payment Response Obj
        pending: Object,
        waiting_for_capture: Object,
        succeeded: Object,
        canceled: Object
      }
    },
    delivery: {
      method: 'courier' | 'dellin' | 'kit' | 'yourself',
      address: {
        country: String,
        city: String,
        street: String,
        build: String,
        house: String,
        postCode: String
      }
    },
    products: [{
        id: String,
        SKU: String,
        title: String,
        price: String,
        currency: String,
        qty: String
      }
    ],
    buyer: {
      userId: String,
      firstname: String,
      lastname: String,
      email: String,
      phone: String
    },
    comments: {
      user: String,
      admin: String
    }
}
-->
<template>
  <div>
    <el-button v-if="type === 'single'" @click="clickBuy">КУПИТЬ</el-button>
    <el-button class="primary_btn" v-else @click="clickBuy">ОФОРМИТЬ ЗАКАЗ</el-button>
    <el-dialog
      id="checkout_dialog"
      v-if="orderProducts"
      width="100%"
      close-on-press-escape
      :visible.sync="dialog"
      :fullscreen="true">
      <p id="checkout">ОФОРМЛЕНИЕ</p>
      <el-row type="flex" justify="center" style="flex-wrap: wrap">
        <!--ITEMS INFO-->
        <el-col :xs="24" :sm="24" :md="9" :lg="8" :xl="7" id="my_order_wrap">
          <div id="my_order">
            <p id="my_order_title">Мой заказ</p>
            <div class="order_info" v-for="product in orderProducts" :key="product.productId">
              <span class="product_title">{{ product.title }}:</span><br>
              <span class="price_tag">{{ product.price | price }}</span>x
              <span class="price_tag">{{ product.qty }}</span>=
              <span class="price_tag">{{ parseFloat(product.price * product.qty).toFixed(2) }} р</span>
            </div>
            <p id="total">ИТОГО: {{ totalProductsPrice }} р</p>
          </div>
        </el-col>
        <el-col :xs="24" :sm="16" :md="14" :lg="12" :xl="10">
          <!--Stepper-->
          <el-row style="margin-bottom: 40px;">
            <el-steps :active="activeStep" align-center finish-status="success">
              <el-step title="Ваши контакты"></el-step>
              <el-step title="Адрес"></el-step>
              <el-step title="Доставка/Оплата"></el-step>
              <el-step title="Оформление"></el-step>
            </el-steps>
          </el-row>
          <!--Form 1-->
          <el-row type="flex" justify="center" class="mt-5">
            <el-col :xs="22" :sm="18" :md="18" :lg="18" :xl="18">
              <div v-if="activeStep === 1">
                <el-form
                  label-position="top"
                  label-width="100px"
                  status-icon
                  ref="buyer"
                  :rules="buyerFormRules"
                  :model="buyer">
                  <!--EMAIL-->
                  <el-form-item label="Email" prop="email">
                    <el-input type="email" v-model="buyer.email" auto-complete="on"></el-input>
                  </el-form-item>
                  <!--NAME-->
                  <el-row>
                    <el-col :span="12">
                      <el-form-item label="Имя" prop="firstname">
                        <el-input type="text" v-model="buyer.firstname" auto-complete="off"></el-input>
                      </el-form-item>
                    </el-col>
                    <el-col :span="12">
                      <el-form-item label="Фамилия" prop="lastname">
                        <el-input v-model="buyer.lastname"></el-input>
                      </el-form-item>
                    </el-col>
                  </el-row>
                  <!--PHONE-->
                  <el-form-item label="Телефон" prop="phone">
                    <no-ssr>
                      <masked-input
                        v-model="buyer.phone"
                        class="el-input__inner"
                        required
                        mask="\+\7 (111) 111-11-11"
                        placeholder="Номер телефона"/>
                    </no-ssr>
                  </el-form-item>
                </el-form>
              </div>
            </el-col>
          </el-row>
          <!---------->
          <!--Step 2-->
          <el-row type="flex" justify="center">
            <el-col :xs="22" :sm="18" :md="18" :lg="18" :xl="18">
              <div v-if="activeStep === 2">
                <el-form
                  label-position="top"
                  label-width="100px"
                  status-icon
                  ref="address"
                  :rules="addressFormRules"
                  :model="address">
                  <el-row type="flex">
                    <el-col :span="12" class="pr-1">
                      <el-form-item label="Страна" prop="country">
                        <el-input v-model="address.country"></el-input>
                      </el-form-item>
                    </el-col>
                    <el-col :span="12" class="pl-1">
                      <el-form-item label="Город" prop="city">
                        <el-input v-model="address.city"></el-input>
                      </el-form-item>
                    </el-col>
                  </el-row>
                  <el-row>
                    <el-col :xs="16" :sm="18" :md="18" :lg="18" :xl="18" class="pr-1">
                      <el-form-item label="Улица" prop="street">
                        <el-input v-model="address.street"></el-input>
                      </el-form-item>
                    </el-col>
                    <el-col :xs="8" :sm="6" :md="6" :lg="6" :xl="6" class="pl-1">
                      <el-form-item label="Дом" prop="build">
                        <el-input v-model="address.build"></el-input>
                      </el-form-item>
                    </el-col>
                  </el-row>
                  <el-row type="flex">
                    <el-col :span="12" class="pr-1">
                      <el-form-item label="Квартира" prop="house">
                        <el-input v-model="address.house"></el-input>
                      </el-form-item>
                    </el-col>
                    <el-col :span="12" class="pl-1">
                      <el-form-item label="Почтовый индекс" prop="postCode">
                        <el-input v-model="address.postCode"></el-input>
                      </el-form-item>
                    </el-col>
                  </el-row>
                </el-form>
              </div>
            </el-col>
          </el-row>
          <!---------->
          <!--Step 3-->
          <el-row type="flex" justify="center">
            <el-col :xs="24" :sm="18" :md="18" :lg="18" :xl="18">
              <div v-if="activeStep === 3" id="delivery_form">
                Узнать подробнее:
                <el-button
                  style="font-size: 14px; font-weight: 400; padding-top: 8px;;"
                  type="text" @click="$bus.$emit('openDeliveryAndPaymentDialog')">оплата и доставка
                </el-button>
                <br>
                <h3>СПОСОБ ДОСТАВКИ</h3>
                <el-radio-group v-model="delivery.method">
                  <el-radio
                    v-for="method in $store.getters.DELIVERY_METHODS"
                    :key="method.value"
                    :label="method.value"
                    border>{{ method.label }}
                  </el-radio>
                </el-radio-group>
                <h3>ОПЛАТА</h3>
                <el-radio-group v-model="payment.type">
                  <el-radio v-for="type in $store.getters.PAYMENT_TYPES" :key="type.value" :label="type.value" border>
                    {{ type.label }}
                  </el-radio>
                </el-radio-group>
                <div v-if="payment.type">
                  <h3>СПОСОБ ОПЛАТЫ</h3>
                  <el-radio-group v-model="payment.method">
                    <el-radio
                      v-if="payment.type !== $store.getters.PAYMENT_TYPES.online.value"
                      :label="$store.getters.PAYMENT_METHODS.cash.value" border>
                      {{ $store.getters.PAYMENT_METHODS.cash.label }}
                    </el-radio>
                    <el-radio :label="$store.getters.PAYMENT_METHODS.bank_card.value" border>
                      {{ $store.getters.PAYMENT_METHODS.bank_card.label }}
                    </el-radio>
                  </el-radio-group>
                </div>
                <br>
              </div>
            </el-col>
          </el-row>
          <!--Step 4-->
          <el-row type="flex" justify="center">
            <el-col :xs="22" :sm="18" :md="18" :lg="18" :xl="18">
              <div v-if="activeStep === 4" id="final_stage">
                <h3>Нужна помощь? Укажите дополнительные услуги к заказу:</h3>
                <el-checkbox-group v-model="services">
                  <el-checkbox
                    v-for="service in $store.getters.SERVICE_TYPES" :key="service.value"
                    :label="service.value">
                    <p>{{ service.title }}</p>
                  </el-checkbox>
                </el-checkbox-group>
                <el-input
                  style="margin-top: 20px;"
                  type="textarea"
                  :autosize="{ minRows: 2, maxRows: 4}"
                  placeholder="Комментарии к заказу (не обязательно)"
                  v-model="comments.user">
                </el-input>
                <p>Нажимая оформить вы соглашаетесь с
                  <privacy-dialog></privacy-dialog>
                </p>
                <el-button @click="checkout" type="success">ОФОРМИТЬ</el-button>
              </div>
            </el-col>
          </el-row>
        </el-col>
      </el-row>
      <el-row type="flex" justify="center" style="margin-top: 15px;">
        <el-button @click="prevStep" v-if="activeStep !== 1" round>Назад</el-button>
        <el-button
          v-if="activeStep !== 4"
          @click="nextStep" round
          :type="validCheckoutStep ? 'success' : 'info'"
          :disabled="!validCheckoutStep">
          Вперед
        </el-button>
      </el-row>
    </el-dialog>
  </div>
</template>

<script>
  import PrivacyDialog from "../dialogs/PrivacyDialog";
  import DeliveryAndPaymentDialog from "../dialogs/DeliveryAndPaymentDialog";

  export default {
    name: 'Checkout',
    components: {DeliveryAndPaymentDialog, PrivacyDialog},
    props: ['checkoutObj', 'type'],
    data() {
      let notEmptyString = (rule, value, callback) => {
        if (!value) {
          callback(new Error('Поле необходимо заполнить'))
        } else {
          callback()
        }
      }
      let checkEmail = (rule, value, callback) => {
        if (!value) {
          return callback(new Error('Введите адрес вашей эл. почты'))
        }
        setTimeout(() => {
          if (!this.isValidEmail(value)) {
            callback(new Error('Некорректная эл. почта'))
          } else {
            callback()
          }
        }, 1000)
      }
      return {
        dialog: false,
        activeStep: 1,
        comments: {user: '', admin: ''},
        services: [],
        delivery: {
          method: '',
          prices: {
            dellin: '',
            kit: '',
            courier: '', // only 54 region,
            yourself: ''
          }
        },
        payment: {
          type: '',
          method: ''
        },
        buyer: {
          firstname: '',
          lastname: '',
          email: '',
          phone: ''
        },
        address: {
          country: 'Россия',
          city: '',
          street: '',
          build: '',
          house: '',
          postCode: ''
        },
        buyerFormRules: {
          firstname: [{validator: notEmptyString, trigger: 'blur'}],
          lastname: [{validator: notEmptyString, trigger: 'blur'}],
          email: [{validator: checkEmail, trigger: 'blur'}]
        },
        addressFormRules: {
          country: [{validator: notEmptyString, trigger: 'blur'}],
          city: [{validator: notEmptyString, trigger: 'blur'}],
          street: [{validator: notEmptyString, trigger: 'blur'}],
          build: [{validator: notEmptyString, trigger: 'blur'}],
          house: [{validator: notEmptyString, trigger: 'blur'}],
          postCode: [{validator: notEmptyString, trigger: 'blur'}]
        }
      }
    },
    methods: {
      clickBuy() {
        this.dialog = true
        this.$store.dispatch('USER_EVENT', 'Купить товар')
      },
      nextStep() {
        if (this.activeStep < 4) this.activeStep++
        this.$store.dispatch('USER_EVENT', `Шаг: ${this.activeStep}`)
      },
      prevStep() {
        if (this.activeStep > 1) {
          this.activeStep--
          this.$store.dispatch('USER_EVENT', `Шаг: ${this.activeStep}`)
        }
      },
      isValidEmail() {
        return /^\S+@\S+\.\S+$/.test(this.buyer.email)
      },
      isValidPhone() {
        return this.buyer.phone.replace(/[^0-9]/g, '').length === 11
      },
      checkout() {
        this.buyer.userId = this.$store.getters.user.uid
        let products = []
        this.orderProducts.forEach(el => {
          this.$store.dispatch('increaseProductCounter', {id: el.productId, type: 'checkout'})
          products.push({
            id: el.productId,
            SKU: el.SKU,
            qty: el.qty,
            title: el.title,
            price: parseFloat(el.price).toFixed(2),
            currency: 'RUB'
          })
        })
        let status
        let history
        if (this.$store.getters.PAYMENT_TYPES.receipt.value === this.payment.type) {
          status = 'pending'
          history = {created: new Date().getTime(), pending: new Date().getTime()}
        } else {
          status = 'created'
          history = {created: new Date().getTime()}
        }

        let order = {
          amount: {
            final: {value: parseFloat(this.totalProductsPrice).toFixed(2), currency: 'RUB'},
            discount: {value: 0, currency: 'RUB'},
            products: {value: parseFloat(this.totalProductsPrice).toFixed(2), currency: 'RUB'},
            delivery: {value: 0, currency: 'RUB'}
          },
          payment: {
            status: this.$store.getters.PAYMENT_STATUSES.none.value, // now not used (for yandex.kassa lost here)
            history: {},
            ending: 'none', // PAYMENT_ENDING
            type: this.payment.type,
            method: this.payment.method,
            notification: {}
          },
          delivery: {
            method: this.delivery.method,
            address: this.address
          },
          services: this.services,
          products: products,
          status: status,
          history: history,
          buyer: this.buyer,
          comments: this.comments
        }
        console.log(order);
        this.dialog = false
        this.$store.dispatch('checkout', order)
        this.$store.dispatch('USER_EVENT', 'Успешная покупка!')
      }
    },
    computed: {
      isValidBuyerData() {
        return this.isValidPhone() && this.isValidEmail() && this.buyer.firstname && this.buyer.lastname
      },
      isValidAddress() {
        return this.address.country && this.address.city && this.address.build &&
          this.address.street && this.address.house && this.address.postCode
      },
      validCheckoutStep() {
        if (this.activeStep === 1) return this.isValidBuyerData
        if (this.activeStep === 2) return this.isValidAddress
        if (this.activeStep === 3) return this.delivery.method && this.payment.type && this.payment.method
      },
      orderProducts() {
        let checkoutObj = this.checkoutObj
        let cart = this.$store.getters.user.cart
        let products = []
        checkoutObj.forEach(el => {
          let product = cart[el.productId]
          product.qty = el.qty
          products.push(product)
        })
        return products
      },
      totalProductsPrice() {
        let products = this.orderProducts
        let total = 0
        products.forEach(el => {
          total += el.qty * el.price
        })
        return total
      }
    }
  }
</script>

<style scoped lang="scss">

  #checkout {
    font-size: 16px;
    font-weight: 600;
    letter-spacing: 1px;
    margin-top: -20px;
    margin-bottom: 30px;
  }

  #my_order_wrap {
    padding: 30px;
    #my_order_title {
      font-weight: 600;
      padding-top: 15px;
      padding-bottom: 15px;
      box-shadow: 1px 1px 1px rgba(13, 13, 13, 0.1), 0 5px 5px rgba(13, 13, 13, 0.1);
    }
    #my_order {
      background: $color-primary;
      color: white;
      border-radius: 3px;
      .order_info {
        margin-bottom: 14px;
        font-size: 14px;
        padding: 5px;
        line-height: 22px;
        .product_title {
        }
        .price_tag {
          background: $color-success-second;
          padding: 4px 10px;
          border-radius: 4px;
          margin-left: 2px;
          margin-right: 5px;
        }
      }
    }
    #total {
      font-weight: 600;
      padding-bottom: 20px;
    }
  }

  #delivery_form,
  #payment_form,
  #final_stage {
    /*margin-top: 40px;*/
  }

  #delivery_help {
    margin-top: -42px;
    margin-left: 2px;
    color: $color-info;
    &:hover, &:active {
      cursor: help;
    }
  }

  @media only screen and (max-width: $xs-screen) {
    #my_order_wrap {
      padding: 10px;
    }
  }
</style>
