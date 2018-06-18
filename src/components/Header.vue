<template>
  <div>
    <div id="contacts">
      <span id="phone">+777 2345 7885</span>
      <i class="work_time">7 ДНЕЙ В НЕДЕЛЮ С 10 ДО 18 ЧАСОВ</i>
      <div>
        <img id="facebook" src="~/assets/icons/social/facebook-logo.svg" alt="Facebook">
        <img id="twitter" src="~/assets/icons/social/twitter-logo.svg" alt="Twitter">
        <img id="instagram" src="~/assets/icons/social/instagram-logo.svg" alt="Instagram">
      </div>
    </div>
    <no-ssr id="algolia_search">
      <el-popover
        placement="bottom-start"
        width="400"
        trigger="click"
        v-model="showResult">
        <div id="search_result" v-if="algoliaSearchText && result.length">
          <div v-for="res in result" :key="res.SKU"
               @click="toProduct(res.group, res.category, res.productId)"
               class="search_row">
            <p class="snippet_title" v-html="res.title"></p>
            <p class="snippet_description" v-html="res.description + '...'"></p>
            <p style="margin: 8px;">
              <span class="snippet_sku" v-html="`Арт.: ${res.SKU}`"></span>
              <span class="snippet_price" v-html="`${res.price} RUB`"></span>
            </p>
            <hr class="snippet_divider">
          </div>
          <div id="algolia_icon">
            <a target="_blank" href="https://www.algolia.com/docsearch">
              <img src="~/assets/icons/algolia/search_by_algolia.svg" alt="">
            </a>
          </div>
        </div>
        <div v-else-if="isSearching" id="is_searching">
          <i class="el-icon-loading"></i>
        </div>
        <div v-else-if="!isSearching && algoliaSearchText" id="no_algolia_match">
          <p>Ничего не найдено</p>
        </div>
        <div v-else id="found_something">
          <p>Введите то, что ищите!</p>
          <p>Поиск среди {{ $store.getters.productStatistics.uniqueProductQty }} уникальных товаров</p>
        </div>
        <el-input
          slot="reference"
          label="Algolia Filter"
          @input="algoliaSearch"
          placeholder="введите поисковый запрос"
          v-model="algoliaSearchText">
        </el-input>
      </el-popover>
    </no-ssr>
    <el-breadcrumb v-if="$nuxt.$route.path.includes('/catalog')" separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="'/catalog'">Каталог</el-breadcrumb-item>
      <el-breadcrumb-item v-if="$nuxt.$route.params.group" :to="`/catalog/${$nuxt.$route.params.group}`">
        {{ loadedGroup.label }}
      </el-breadcrumb-item>
      <el-breadcrumb-item
        v-if="$nuxt.$route.params.category"
        :to="`/catalog/${$nuxt.$route.params.group}/${$nuxt.$route.params.category}`">
        {{ loadedCategory.label }}
      </el-breadcrumb-item>
      <el-breadcrumb-item v-if="$nuxt.$route.params.id">
        {{ $store.getters.products[$nuxt.$route.params.id].SKU }}
      </el-breadcrumb-item>
    </el-breadcrumb>
    <el-menu
      id="app_header"
      :default-active="activeIndex"
      class="el-menu-demo"
      mode="horizontal"
      background-color="#1976d2"
      text-color="#fff"
      router
      active-text-color="#fff">
      <el-menu-item index="/">
        Главная
      </el-menu-item>
      <el-menu-item index="/catalog">
        Товары
      </el-menu-item>
      <el-menu-item index="/about">
        О нас
      </el-menu-item>
      <el-menu-item index="/account">
        Аккаунт
      </el-menu-item>
      <el-menu-item index="/cart">
        Корзина
        <no-ssr>
          <el-badge :value="cartProductCount" class="item"></el-badge>
        </no-ssr>
      </el-menu-item>
    </el-menu>
  </div>
</template>

<script>
  export default {
    name: 'AppHeader',
    data() {
      return {
        activeIndex: '/',
        algoliaSearchText: '',
        isSearching: false,
        showResult: false,
        result: []
      }
    },
    methods: {
      algoliaSearch() {
        this.isSearching = true
        let data = []
        if (!this.algoliaSearchText) {
          this.isSearching = false
          return this.result = []
        }
        this.$store.dispatch('runAlgoliaSearch', this.algoliaSearchText)
          .then(hits => {
            hits.forEach(el => {
              data.push({
                title: el._snippetResult.title ? el._snippetResult.title.value : '',
                description: el._snippetResult.description ? el._snippetResult.description.value : '',
                SKU: el.SKU,
                price: el.price,
                group: el.group,
                category: el.category,
                productId: el.objectID
              })
            })
            this.result = data
            this.showResult = true
            this.isSearching = false
          })
      },
      toProduct (group, category, productId) {
        this.$nuxt.$router.push(`/catalog/${group}/${category}/${productId}`)
        this.showResult = false
      }
    },
    created() {
      this.activeIndex = this.$nuxt.$route.path
    },
    computed: {
      cartProductCount() {
        if (this.$store.getters.user.cart && !Array.isArray(this.$store.getters.user.cart)) {
          return Object.keys(this.$store.getters.user.cart).length
        } else {
          return 0
        }
      },
      loadedGroup () {
        for (let group in this.$store.getters.PRODUCT_TREE) {
          if (this.$store.getters.PRODUCT_TREE[group].value === this.$nuxt.$route.params.group) {
            return this.$store.getters.PRODUCT_TREE[group]
          }
        }
      },
      loadedCategory () {
        for (let child in this.loadedGroup.children) {
          if (this.loadedGroup.children[child].value === this.$nuxt.$route.params.category) {
            return this.loadedGroup.children[child]
          }
        }
      }
    }
  }
</script>

<style scoped lang="scss">
  #app_header {
    display: flex;
    flex-flow: row wrap;
    width: 100%;
    margin-left: auto;
    margin-right: auto;
    align-items: center;
    justify-content: center;
  }

  .el-menu-item {
    font-size: 1em;
  }

  .item {
    position: absolute;
    margin-top: -12px;
    margin-left: 10px;
  }

  #contacts {
    display: flex;
    justify-content: space-evenly;
    align-items: center;
    flex-wrap: wrap;
    background: $color-secondary;
    padding: 5px;
  }

  #phone {
    color: white;
    margin: 5px;
  }

  #facebook,
  #twitter,
  #instagram {
    height: 14px;
    margin: 5px 20px;
  }

  .work_time {
    color: white;
  }

  #search_result {
    overflow: scroll;
    max-height: 440px;
    margin-top: 5px;
    margin-bottom: 40px;
  }

  .search_row {
    margin: 0;
    padding: 0;
    text-align: left;
  }

  .search_row:hover {
    cursor: pointer;
    background: rgba(29, 134, 239, 0.33);
  }

  .snippet_title {
    padding: 10px 10px 0;
    margin: 0;
  }

  .snippet_price {
    font-size: 12px;
    color: $color-success;
    margin: 0 0 0 10px;
    padding: 0;
  }

  .snippet_sku {
    font-size: 12px;
    color: $color-info;
    margin: 0 0 0 10px;
  }

  .snippet_description {
    padding: 0 10px;
    margin: 10px 0 0;
    font-size: 12px;
    color: $color-info;
  }

  .snippet_divider {
    display: block;
    height: 1px;
    border: 0;
    border-top: 1px solid #ccc;
    margin: 0;
    padding: 0;
  }

  #algolia_icon {
    position: absolute;
    bottom: 0;
    right: 0;
    width: 100%;
    text-align: right;
    background: #e4e7ed;
    height: 40px;
    img {
      margin-top: 10px;
      margin-right: 10px;
    }
  }

  #no_algolia_match,
  #found_something{
    padding: 20px;
    text-align: center;
  }

  #is_searching {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 47px;
    padding: 20px;
  }
</style>
