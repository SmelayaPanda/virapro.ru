<template>
  <div>
    <el-row el-row type="flex" justify="center" v-if="$store.getters.singleProduct" id="product_card_wrap">
      <el-col :xs="24" :sm="20" :md="21" :lg="18" :xl="16" type="flex" align="middle">
        <el-card id="product_card" itemscope itemtype="http://schema.org/Product">
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
              <img v-if="$store.getters.singleProduct.img_4.thumbnail"
                   :src="$store.getters.singleProduct.img_4.thumbnail" @click="loadOriginal(4)"
                   ref="d_img_4" class="thumb_img" itemprop="image"/>
            </el-col>
            <el-col :xs="24" :sm="20" :md="9" :lg="9" :xl="10">
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
                <img v-if="$store.getters.singleProduct.img_4.thumbnail"
                     :src="$store.getters.singleProduct.img_4.thumbnail" @click="loadOriginal(4)"
                     ref="m_img_4" class="thumb_img" itemprop="image"/>
              </el-row>
              <el-row>
                <p id="misterio_shop">
                  <i class="el-icon-minus"></i>
                  Сантехника
                  <i class="el-icon-minus"></i>
                </p>
              </el-row>
            </el-col>
            <el-col :xs="24" :sm="24" :md="12" :lg="12" :xl="12">
              <p id="product_title">
                <span itemprop="name">{{ $store.getters.singleProduct.title }}</span>
                <!--<span>-->
                <!--<v-icon-->
                <!--v-if="$store.getters.user.favorites[$store.getters.singleProduct.productId]"-->
                <!--@click.stop="updateOwnProduct($store.getters.singleProduct, 'favorites', 'remove')"-->
                <!--class="own_product_icon secondary&#45;&#45;text">favorite</v-icon>-->
                <!--<v-icon-->
                <!--v-else-->
                <!--@click.stop="updateOwnProduct($store.getters.singleProduct, 'favorites', 'add')"-->
                <!--class="own_product_icon primary&#45;&#45;text">favorite_border</v-icon>-->
                <!--</span>-->
              </p>
              <hr>
              <div class="product_info">
                <p class="info--text">Арт. :<span itemprop="sku">{{ $store.getters.singleProduct.SKU }}</span></p>
                <el-row type="flex">
                  <el-col :span="12" align="left">
                    <p>
                      <img class="property_icon" src="~/assets/icons/product/brand.svg" width="21px" alt="">
                      <span itemprop="brand">{{ $store.getters.singleProduct.brand }}</span>
                    </p>
                    <p>
                      <img class="property_icon" src="~/assets/icons/product/color.svg" width="20px" alt="">
                      <span itemprop="color">{{ $store.getters.singleProduct.color }}</span>
                    </p>
                    <p>
                      <img class="property_icon" src="~/assets/icons/product/qty.svg" width="20px" alt="">
                      <span v-if="$store.getters.singleProduct.totalQty < 1" class="error--text">
                          Нет в наличии
                        </span>
                      <span v-else>
                          {{ $store.getters.singleProduct.totalQty }}
                        </span>
                    </p>
                  </el-col>
                  <el-col :span="12" align="left" class="pl-3">
                    <p v-if="$store.getters.singleProduct.country">
                      <img class="property_icon" src="~/assets/icons/product/country.svg" width="20px" alt="">
                      {{ $store.getters.singleProduct.country }}</p>
                    <p v-if="$store.getters.singleProduct.material">
                      <img class="property_icon" src="~/assets/icons/product/material.svg" width="20px" alt="">
                      {{ $store.getters.singleProduct.material }}</p>
                    <p v-if="$store.getters.singleProduct.size">
                      <img class="property_icon" src="~/assets/icons/product/size.svg" width="16px" alt="">
                      {{ $store.getters.singleProduct.size }}</p>
                  </el-col>
                </el-row>
                <div id="product_descr_wrapper">
                  <p itemprop="description">{{ $store.getters.singleProduct.description }} </p>
                </div>
              </div>
              <hr>
              <div itemprop="offers" itemscope itemtype="http://schema.org/Offer">
                <p>
                  Цена: <span itemprop="price" :content="$store.getters.singleProduct.price.toFixed(2)">{{ $store.getters.singleProduct.price | price }}</span>
                  <span itemprop="priceCurrency" content="RUB">RUB</span>
                </p>
              </div>
              <hr>
              <no-ssr v-if="!isAlreadyAddedProduct">
                <el-button
                  id="into_cart_btn"
                  :disabled="$store.getters.singleProduct.totalQty < 1"
                  @click="updateOwnProduct($store.getters.singleProduct, 'cart', 'add')">
                  <span>
                    В корзину
                  </span>
                  <i class="el-icon-goods ml-2" style="transform: scale(1.5)"></i>
                </el-button>
              </no-ssr>
              <!--ALREADY IN CART-->
              <div v-else>
                <el-tooltip
                  class="item"
                  effect="dark"
                  placement="top-end"
                  content="Продолжить покупки">
                  <router-link to="/shop">
                    <el-button class="already_added_btn">
                      <i class="el-icon-d-arrow-left"></i>
                      В каталог
                    </el-button>
                  </router-link>
                </el-tooltip>
                <el-tooltip
                  class="item"
                  effect="dark"
                  placement="top-end"
                  content="Оформить покупку">
                  <router-link to="/cart">
                    <el-button class="already_added_btn already_added_btn_xs_fix">
                      Оформить
                      <i class="el-icon-d-arrow-right"></i>
                    </el-button>
                  </router-link>
                </el-tooltip>
                <br>
                <el-tooltip
                  class="item"
                  effect="dark"
                  content="Удалить из корзины">
                  <el-button
                    @click="updateOwnProduct($store.getters.singleProduct, 'cart', 'remove')"
                    size="mini">
                    <i class="el-icon-delete"></i>
                  </el-button>
                </el-tooltip>
              </div>
            </el-col>
          </el-row>
        </el-card>
      </el-col>
    </el-row>
  </div>
</template>

<script>
  import ZoomOnHover from "~/components/shop/ZoomOnHover";

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
        // this.$store.dispatch('USER_EVENT',
        //   `${subject === 'cart' ? 'Корзина' : 'Избранное'}:
        //    ${operation === 'add' ? ' добавлен' : ' удален'}
        //   "${product.title}"`
        // )
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
    margin-top: 20px;
  }

  .main_img {
    width: 100%;
    height: 527px;
    object-fit: cover;
  }

  .thumb_img {
    height: 100px;
    width: 75px;
    object-fit: cover;
    margin-right: 1px;
    margin-left: 1px;
  }

  .thumb_img:hover {
    cursor: pointer;
  }

  .active {
    transition: all 0.5s;
    transform: scale(1.08);
    box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);
  }

  .back_to_shop {
    writing-mode: vertical-rl;
    font-size: 16px;
  }

  #product_title {
    font-size: 20px;
    padding: 10px 10px 5px;
    margin-top: 10px;
    margin-bottom: 10px;
  }

  #product_descr_wrapper {
    width: 100%;
    height: 170px;
    overflow: scroll;
    margin-bottom: 10px;
  }

  .product_info {
    text-align: left;
    margin-left: 40px;
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
    background: $color-secondary;
    height: 44px;
    width: 160px;
    border: 1px solid $color-secondary;
    margin-bottom: 5px;
  }

  .already_added_btn {
    width: 142px;
    margin-bottom: 5px;
  }

  #product_thumbnails_desctop {
    margin-top: 3px;
  }

  #product_thumbnails_mobile {
    display: none;
  }

  #misterio_shop {
    font-size: 24px;
    margin-bottom: 7px;
    margin-top: 7px;
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
