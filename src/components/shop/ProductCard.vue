<template>
  <div
    v-if="product"
    @click="viewProduct"
    class="card_wrapper"
    @touchstart="hoveredCard = true" @touchend="hoveredCard = false"
    @mouseover="hoveredCard = true" @mouseleave="hoveredCard = false"
    itemscope itemtype="http://schema.org/Product">
    <el-card class="card">
      <div class="card_content">
        <p itemprop="offers" itemscope itemtype="http://schema.org/Offer">
          <span itemprop="price" :content="id">{{ id }} </span>
          <span itemprop="priceCurrency" content="RUB">RUB</span>
        </p>
        <p id="title" itemprop="name">
          Some product name + {{ id }}
        </p>
        <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aliquid consequuntur dignissimos earum eligendi est
          fuga possimus quibusdam veritatis. Animi asperiores dolore laboriosam, laborum libero obcaecati quam qui quis
          rem veritatis.</p>
      </div>
    </el-card>
  </div>
</template>
<script>
  export default {
    name: 'product-card',
    props: ['id'],
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
        this.$store.dispatch('USER_EVENT', `Просмотр: ${this.product.title}`)
        this.$router.push('/products/' + this.id)
      }
    },
    computed: {
      user() {
        return this.$store.getters.USER
      },
      product() {
        return true
        // return this.$store.getters.products[this.id]
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
    transform: scale(1.02);
  }

  .card {
    @include aspect-ratio(1, 1);
    margin: 10px;
    max-height: 100%;
    padding: 0 0 10px;
    border: 1px solid $color-info-light;
    transition: all .5s;
  }

  .card:hover,
  .card:active {
    box-shadow: 0 3px 8px 0 rgba(250, 250, 250, 0.15), 3px 3px 8px 0 rgba(250, 250, 250, 0.15);
  }

  .card_content {
    position: absolute;
    top: 0;
  }
</style>
