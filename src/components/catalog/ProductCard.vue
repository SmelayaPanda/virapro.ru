<template>
  <div
    v-if="product"
    @click="viewProduct"
    class="card_wrapper"
    @touchstart="hoveredCard = true" @touchend="hoveredCard = false"
    @mouseover="hoveredCard = true" @mouseleave="hoveredCard = false"
    itemscope itemtype="http://schema.org/Product">
    <el-card :body-style="{ padding: '0px' }" class="card">
      <el-row class="card_content">
        <el-col :xs=" 24" :sm="8" :md="8" :lg="7" :xl="6">
          <div class="product_image">
            <img v-if="product.img_0" :src="product.img_0.card" :alt="`Фото: ${product.title}`">
          </div>
        </el-col>
        <el-col class="product_description"
                :xs="24" :sm="16" :md="16" :lg="17" :xl="18">
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
    props: {id: {type: String, required: true}},
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
          path: `/catalog/${this.product.group}/${this.product.category}/${this.id}`,
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
  .card_wrapper {
    transition: all .5s;
  }

  .card_wrapper:hover,
  .card_wrapper:active {
    cursor: pointer;
    transform: scale(1.01);
  }

  .card {
    margin-left: 10px;
    margin-right: 10px;
    margin-bottom: 8px;
    padding: 5px;
    border: 1px solid $color-info-light;
    transition: all .5s;
    height: 120px;
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

  .product_image {
    width: 120px;
    height: 120px;
    img {
      width: 120px;
      height: 100%;
      object-fit: cover;
    }
  }

  .product_description {
    padding: 10px;
  }

  @media only screen and (max-width: $xs-screen) {
  }
</style>
