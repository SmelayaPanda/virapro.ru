<template>
  <div
    v-if="product"
    @click="viewProduct"
    class="card_wrapper"
    @touchstart="hoveredCard = true" @touchend="hoveredCard = false"
    @mouseover="hoveredCard = true" @mouseleave="hoveredCard = false"
    itemscope itemtype="http://schema.org/Product">
    <!-- LIST VIEW -->
    <el-card
      :body-style="{ padding: '0px' }"
      :class="view === 'list' ? 'card list_card' : 'card module_card'">
      <el-row class="card_content">
        <el-col :xs=" 24"
                :sm="view === 'list' ? 8 : 24"
                :md="view === 'list' ? 8 : 24"
                :lg="view === 'list' ? 7 : 24"
                :xl="view === 'list' ? 6 : 24">
          <div :class="view === 'list' ? 'list_product_image' : 'module_product_image'">
            <img class="product_img" :src="product.img_0.card" alt="">
          </div>
        </el-col>
        <el-col class="product_description"
                :xs="24"
                :sm="view === 'list' ? 16 : 24"
                :md="view === 'list' ? 16 : 24"
                :lg="view === 'list' ? 17 : 24"
                :xl="view === 'list' ? 18 : 24">
          <p itemprop="offers" itemscope itemtype="http://schema.org/Offer">
            <span itemprop="price" :content="product.price">{{ product.price }} </span>
            <span itemprop="priceCurrency" content="RUB">RUB</span>
          </p>
          <p itemprop="name">
            {{ product.title }}
          </p>
        </el-col>
      </el-row>
    </el-card>
  </div>
</template>
<script>
  export default {
    name: 'product-card',
    props: ['id', 'view'],
    data() {
      return {
        hoveredCard: false
      }
    },
    methods: {
      updateOwnProduct(product, subject, operation) {
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
      },
      viewProduct() {
        // this.$store.dispatch('USER_EVENT', `Просмотр: ${this.product.title}`)
        this.$router.push({
          path: `/shop/${this.product.group}/${this.product.category}/${this.id}`,
        })
      }
    },
    computed: {
      user() {
        return this.$store.getters.user
      },
      product() {
        return this.$store.getters.products[this.id]
      }
    }
  }
</script>

<style scoped lang="scss">
  $list-height: 140px;
  $list-width: 140px;
  $module-height: 480px;
  $module-img-height: 300px;

  .card_wrapper {
    transition: all .5s;
  }

  .card_wrapper:hover,
  .card_wrapper:active {
    cursor: pointer;
    transform: scale(1.01);
  }

  .list_card {
    height: $list-height;
  }

  .module_card {
    height: $module-height;
  }

  .list_product_image {
    width: $list-width;
    height: $list-height;
    img {
      width: $list-width;
      height: 100%;
      object-fit: cover;
    }
  }

  .module_product_image {
    width: 100%;
    height: $module-img-height;
    img {
      height: $module-img-height;
      width: 100%;
      object-fit: cover;
    }
  }

  .card {
    margin: 4px;
    padding: 0;
    border: 1px solid $color-info-light;
    transition: all .5s;
  }

  .card:hover,
  .card:active {
    box-shadow: 0 3px 8px 0 rgba(250, 250, 250, 0.15), 3px 3px 8px 0 rgba(250, 250, 250, 0.15);
  }

  .card_content {
    display: flex;
    justify-content: start;
    flex-wrap: wrap;
  }

  .product_description {
    padding: 10px;
  }

  @media only screen and (max-width: $xs-screen) {
    .list_product_image {
      width: 100%;
      height: $module-img-height;
    }
    .list_card {
      height: $module-height;
    }
  }
</style>
