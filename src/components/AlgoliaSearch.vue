<template>
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
            <img src="~/assets/icons/algolia/search_by_algolia.svg" alt="Algolia Search">
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
        placeholder="Введите поисковый запрос"
        v-model="algoliaSearchText">
      </el-input>
    </el-popover>
  </div>
</template>
<script>
  export default {
    name: 'AlgoliaSearch',
    data() {
      return {
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
    }
  }
</script>
<style scoped lang="scss">

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
