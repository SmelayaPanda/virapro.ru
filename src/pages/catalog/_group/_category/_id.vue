<template>
  <div>
    <el-row el-row type="flex" justify="center" v-if="$store.getters.singleProduct" id="product_card_wrap">
      <el-col :xs="24" :sm="24" :md="22" :lg="20" :xl="18" type="flex" align="middle">
        <div id="product_card" itemscope itemtype="http://schema.org/Product">
          <el-row type="flex" style="flex-wrap: wrap">
            <el-col :xs="24" :sm="4" :md="3" :lg="3" :xl="3" id="product_thumbnails_desctop">
              <img v-if="$store.getters.singleProduct.img_0.thumbnail"
                   :src="$store.getters.singleProduct.img_0.thumbnail" @click="loadOriginal(0)"
                   ref="d_img_0" class="thumb_img active" itemprop="image"/>
              <img v-if="$store.getters.singleProduct.img_1.thumbnail"
                   :src="$store.getters.singleProduct.img_1.thumbnail" @click="loadOriginal(1)"
                   ref="d_img_1" class="thumb_img" itemprop="image"/>
              <img v-if="$store.getters.singleProduct.img_2.thumbnail"
                   :src="$store.getters.singleProduct.img_2.thumbnail" @click="loadOriginal(2)"
                   ref="d_img_2" class="thumb_img" itemprop="image"/>
              <img v-if="$store.getters.singleProduct.img_3.thumbnail"
                   :src="$store.getters.singleProduct.img_3.thumbnail" @click="loadOriginal(3)"
                   ref="d_img_3" class="thumb_img" itemprop="image"/>
            </el-col>
            <el-col :xs="24" :sm="20" :md="20" :lg="9" :xl="10">
              <zoom-on-hover
                :img-normal="viewImage ? viewImage : $store.getters.singleProduct.img_0.original"
                :img-zoom="viewImage ? viewImage : $store.getters.singleProduct.img_0.original"
                class="main_img">
              </zoom-on-hover>
              <el-row id="product_thumbnails_mobile">
                <img v-if="$store.getters.singleProduct.img_0.thumbnail"
                     :src="$store.getters.singleProduct.img_0.thumbnail" @click="loadOriginal(0)"
                     ref="m_img_0" class="thumb_img active" itemprop="image"/>
                <img v-if="$store.getters.singleProduct.img_1.thumbnail"
                     :src="$store.getters.singleProduct.img_1.thumbnail" @click="loadOriginal(1)"
                     ref="m_img_1" class="thumb_img" itemprop="image"/>
                <img v-if="$store.getters.singleProduct.img_2.thumbnail"
                     :src="$store.getters.singleProduct.img_2.thumbnail" @click="loadOriginal(2)"
                     ref="m_img_2" class="thumb_img" itemprop="image"/>
                <img v-if="$store.getters.singleProduct.img_3.thumbnail"
                     :src="$store.getters.singleProduct.img_3.thumbnail" @click="loadOriginal(3)"
                     ref="m_img_3" class="thumb_img" itemprop="image"/>
              </el-row>
            </el-col>
            <el-col :xs="24" :sm="24" :md="24" :lg="12" :xl="12">
              <p id="product_title">
                <span itemprop="name">{{ $store.getters.singleProduct.title }}</span>
              </p>
              <div itemprop="offers" itemscope itemtype="http://schema.org/Offer">
                <p>
                  Цена:
                  <span id="price" itemprop="price" :content="$store.getters.singleProduct.price.toFixed(2)">
                  {{ $store.getters.singleProduct.price | price }}
                </span>
                  <span itemprop="priceCurrency" content="RUB">RUB</span>
                </p>
              </div>
              <div class="product_info">
                <p>Арт. :<span itemprop="sku" id="sku"> {{ $store.getters.singleProduct.SKU }}</span></p>
                <ul class="leaders">
                  <li v-for="(val, key) in $store.getters.singleProduct" :key="key"
                      v-if="$store.getters.DYNAMIC_PROPS[key]">
                    <span>{{ $store.getters.DYNAMIC_PROPS[key].label }}</span>
                    <span>{{ val }}</span>
                  </li>
                </ul>
              </div>
              <no-ssr v-if="!isAlreadyAddedProduct">
                <el-button
                  id="into_cart_btn"
                  :disabled="$store.getters.singleProduct.totalQty < 1"
                  @click="updateOwnProduct($store.getters.singleProduct, 'cart', 'add')">
                  <span>
                    В корзину
                  </span>
                  <i class="el-icon-goods" style="transform: scale(1.5)"></i>
                </el-button>
              </no-ssr>
              <!--ALREADY IN CART-->
              <div v-else>
                <el-tooltip class="item" effect="dark" placement="top-end" content="Продолжить покупки">
                  <nuxt-link to="/catalog">
                    <el-button class="already_added_btn">
                      <i class="el-icon-d-arrow-left"></i>
                      В каталог
                    </el-button>
                  </nuxt-link>
                </el-tooltip>
                <el-tooltip class="item" effect="dark" placement="top-end" content="Оформить покупку">
                  <nuxt-link to="/cart">
                    <el-button class="already_added_btn already_added_btn_xs_fix">
                      Оформить
                      <i class="el-icon-d-arrow-right"></i>
                    </el-button>
                  </nuxt-link>
                </el-tooltip>
                <br>
                <el-tooltip class="item" effect="dark" content="Удалить из корзины">
                  <el-button @click="updateOwnProduct($store.getters.singleProduct, 'cart', 'remove')" size="mini">
                    <i class="el-icon-delete"></i>
                  </el-button>
                </el-tooltip>
              </div>
            </el-col>
          </el-row>
        </div>
        <div id="product_descr_wrapper">
          <p itemprop="description" v-html="$store.getters.singleProduct.description"></p>
        </div>
      </el-col>
    </el-row>
  </div>
</template>

<script>
  import ZoomOnHover from "~/components/catalog/ZoomOnHover";

  export default {
    name: "Product",
    components: {ZoomOnHover},
    data() {
      return {
        dialogVisible: false,
        activeImg: 0,
        viewImage: ''
      }
    },
    async fetch({store, params}) {
      await store.dispatch('loadSingleProduct', params.id)
      await store.dispatch('increaseProductCounter', {id: params.id, type: 'watch'})
    },
    // computed: {
    //   alreadyAddedProduct() {
    //     return this.$store.getters.alreadyCartAddedProduct
    //   }
    // },
    methods: {
      loadOriginal(idx) {
        if (this.$refs['d_img_' + this.activeImg]) {
          this.$refs['d_img_' + this.activeImg].classList.remove('active')
        }
        if (this.$refs['d_img_' + idx]) {
          this.$refs['d_img_' + idx].classList.add('active')
        }
        if (this.$refs['m_img_' + this.activeImg]) {
          this.$refs['m_img_' + this.activeImg].classList.remove('active')
        }
        if (this.$refs['m_img_' + idx]) {
          this.$refs['m_img_' + idx].classList.add('active')
        }
        this.activeImg = idx
        this.viewImage = this.$store.getters.singleProduct['img_' + idx].original
      },
      updateOwnProduct(product, subject, operation) {
        if (subject === 'cart' && operation === 'add') {
          this.$store.dispatch('increaseProductCounter', {id: product.productId, type: 'cart'})
        }
        this.$store.dispatch('USER_EVENT',
          `${subject === 'cart' ? 'Корзина' : 'Избранное'}:
           ${operation === 'add' ? ' добавлен' : ' удален'}
          "${product.title}"`
        )
        this.$store.dispatch('updateOwnProducts', {
          subject: subject,
          operation: operation,
          product: product
        })
      }
    },
    computed: {
      isAlreadyAddedProduct() {
        return this.$store.getters.user.cart &&
          this.$store.getters.user.cart[this.$store.getters.singleProduct.productId]
      }
    }
  }
</script>

<style scoped lang="scss">
  #product_card_wrap {
    flex-wrap: wrap;
    margin-top: 40px;
  }

  .main_img {
    width: 400px;
    height: 400px;
    object-fit: cover;
    @include primaryShadow
  }

  .thumb_img {
    height: 75px;
    width: 75px;
    object-fit: cover;
    margin-bottom: 26px;
    border: 1px solid $color-primary-light-3;
    margin-right: 1px;
    margin-left: 1px;
    &:hover {
    cursor: pointer;
    }
  }

  .active {
    transition: all 0.5s;
    transform: scale(1.1);
    @include primaryShadow
  }

  #product_title {
    font-size: 24px;
    font-weight: 500;
    color: $color-primary;
    padding: 10px 10px 5px;
    margin-top: 10px;
    margin-bottom: 10px;
  }

  #product_descr_wrapper {
    width: 100%;
    text-align: left;
    margin-bottom: 10px;
  }

  #price {
    font-size: 18px;
    font-weight: 500;
  }

  .product_info {
    text-align: left;
    margin-left: 20px;
    margin-right: 20px;
    #sku {
      color: $color-success-second;
    }
    ul.leaders {
      padding: 0;
      overflow-x: hidden;
      list-style: none;

      li:before {
        float: left;
        width: 0;
        white-space: nowrap;
        margin-top: 4px;
        color: $color-primary-light-2;
        font-weight: 500;
        font-size: 16px;
        content: ". . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . ";
      }

      span:first-child {
        line-height: 28px;
        font-weight: 400;
        padding-right: 8px;
        background: white;
      }

      span + span {
        color: $color-primary;
        font-weight: 500;
        float: right;
        padding-left: 8px;
        margin-top: 5px;
        background: white;
      }
    }
  }

  #product_card {
    margin-bottom: 70px;
  }

  .own_product_icon {
    position: absolute;
    top: 0;
    right: 0;
  }

  .own_product_icon:hover {
    transform: scale(1.3);
    cursor: pointer;
  }

  .property_icon {
    margin-bottom: -5px;
    margin-right: 2px;
  }

  #into_cart_btn {
    color: white;
    background: $color-primary;
    height: 44px;
    width: 160px;
    border: 1px solid $color-primary;
    margin-bottom: 5px;
    .el-icon-goods {
      margin-left: 8px;
    }
  }

  .already_added_btn {
    width: 142px;
    margin-bottom: 5px;
    background: $color-success-second;
    color: white;
  }

  #product_thumbnails_desctop {
    margin-top: 3px;
  }

  #product_thumbnails_mobile {
    display: none;
  }

  @media only screen and (max-width: $xs-screen) {
    .product_info {
      margin-left: 10px;
    }
    .already_added_btn_xs_fix {
      margin-left: 3px;
    }
    #product_thumbnails_desctop {
      display: none;
    }
    #product_thumbnails_mobile {
      display: block;
      margin-top: 12px;
    }
  }
</style>
