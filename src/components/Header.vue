<template>
  <div>
    <el-row id="contacts_row">
      <el-col :span="13" :offset="2">
        <div id="work_time">
          <img src="~/assets/icons/home/calendar.svg" id="work_time_icon" alt="Рабочее время">
          <time>7 дней в неделю с 10<sup>00</sup> до 18<sup>00</sup> часов</time>
        </div>
      </el-col>
      <el-col :span="4" id="address">
        <img src="~/assets/icons/home/location.svg" id="location_icon" alt="Местоположение">
        г. {{ $store.getters.companyInfo.address.city }},
        ул. {{ $store.getters.companyInfo.address.street }},
        д. {{ $store.getters.companyInfo.address.build }}
      </el-col>
      <el-col :span="4" :offset="1" id="phone">
        <img src="~/assets/icons/home/phone.svg" id="phone_icon" alt="Телефон">
        {{ $store.getters.companyInfo.contacts.phone }}
      </el-col>
    </el-row>
    <el-menu
      id="app_header"
      :default-active="activeIndex"
      class="el-menu-demo"
      mode="horizontal"
      background-color="white"
      text-color="#004072"
      router
      active-text-color="#004072">
      <div id="algolia_search">
        <el-popover
          placement="bottom-start"
          width="400"
          trigger="click"
          v-model="showResult">
          <div id="search_result" v-if="algoliaSearchText && result && result.length">
            <div v-for="res in result" :key="res.productId"
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
      </div>
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
    <Breadcrumbs v-if="$nuxt.$route.path.includes('/catalog/')"/>
  </div>
</template>

<script>
  import Breadcrumbs from "./catalog/Breadcrumbs";

  export default {
    name: 'AppHeader',
    components: {Breadcrumbs},
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
      toProduct(group, category, productId) {
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

  #contacts_row {
    display: flex;
    justify-content: start;
    align-items: center;
    flex-wrap: wrap;
    background: $color-primary-dark;
    height: 44px;
    border-bottom: 2px solid $color-success;
    -webkit-box-shadow: 0px 4px 16px 0px rgba(161,181,204,1);
    -moz-box-shadow: 0px 4px 16px 0px rgba(161,181,204,1);
    box-shadow: 0px 4px 16px 0px rgba(161,181,204,1);
  }

  #phone {
    color: white;
  }

  #facebook,
  #twitter,
  #instagram {
    height: 14px;
    margin: 5px 20px;
  }

  #work_time, #address, #phone {
    display: flex;
    align-items: center;
    color: white;
    font-size: 12px;
    font-weight: 300;
  }

  #work_time_icon {
    height: 20px;
    padding-right: 7px;
  }

  #location_icon {
    height: 18px;
    padding-right: 7px;
  }

  #phone {
    font-weight: 400;
    font-size: 14px;
  }

  #phone_icon {
    height: 18px;
    padding-right: 7px;
  }

  sup {
    font-size: 8px;
    margin-bottom: 5px;
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
  #found_something {
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
