<template>
  <el-row id="algolia_search_row">
    <el-col :span="19">
      <el-popover
        placement="bottom-start"
        width="440"
        trigger="click"
        v-model="showResult">
        <div id="search_result" v-if="algoliaSearchText && result && result.length">
          <div
            v-for="res in result" :key="res.productId"
            @click="toProduct(res.group, res.category, res.productId)"
            class="search_row">
            <el-col class="thumbnail">
              <img v-if="res.thumbnail" :src="res.thumbnail" :alt="res.title">
              <img v-else class="no_thumbnail_icon" src="~/assets/icons/algolia/no_photo.svg" alt="нет фото">
            </el-col>
            <el-col class="product_info_descr">
              <p class="snippet_title" v-html="res.title"></p>
              <p class="snippet_description" v-html="res.description + '...'"></p>
              <p>
                <span class="sku" v-html="`Арт.: ${res.SKU}`"></span>
                <span class="price" v-html="`${res.price} RUB`"></span>
              </p>
            </el-col>
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
          <p>Поиск среди {{ $store.getters.productStatistics.uniqueProductQty }} уникальных товаров</p>
        </div>
        <label for="algolia_search_input" slot="reference">
          <input
            @input="algoliaSearch"
            v-model="algoliaSearchText"
            placeholder="Введите поисковый запрос"
            type="text"
            id="algolia_search_input">
        </label>
      </el-popover>
    </el-col>
    <el-col :span="2">
      <img src="~/assets/icons/algolia/search.svg" id="search_icon" alt="Поиск товара">
    </el-col>
  </el-row>
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
                productId: el.objectID,
                thumbnail: el.thumbnail ? el.thumbnail : ''
              })
            })
            this.result = data
            this.showResult = true
            this.isSearching = false
            this.$store.dispatch('USER_EVENT', `Поиск: ${this.algoliaSearchText}`)
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
  #algolia_search_row {
    display: flex;
  }

  #search_result {
    overflow: scroll;
    max-height: 440px;
    margin-top: 5px;
    margin-bottom: 40px;
  }

  #algolia_search_input {
    font-size: 14px;
    color: $color-info-dark;
    border-radius: 0;
    border-left: none;
    border-right: none;
    border-top: none;
    border-bottom: 1px solid $color-primary-light;
    margin-bottom: 5px;
    width: 100%;
    height: 20px;
    &:focus {
      outline: none;
    }

    &::placeholder {
      font-size: 13px;
      color: rgba(79, 82, 89, 0.53);
      /*color: rgb(161, 181, 204);*/
      font-weight: 400;
    }
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
    p {
      color: $color-info
    }
  }

  #is_searching {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 47px;
    padding: 20px;
  }

  #search_icon {
    height: 17px;
    margin-top: 5px;
    margin-left: 3px;
  }

  .search_row {
    display: flex;
    justify-content: start;
    margin: 0;
    padding: 0;
    text-align: left;
    border: 1px solid white;
    border-top: 1px solid #ccc;
    &:hover {
      cursor: pointer;
      border: 1px solid $color-primary-light;
      border-radius: 3px;
    }
    p {
      line-height: 12px;
    }
    .thumbnail {
      display: flex;
      justify-content: center;
      align-items: center;
      width: 80px;
      img {
        height: 50px;
      }
      .no_thumbnail_icon {
        height: 30px;
      }
    }
    .product_info_descr {
      width: 360px;
      &:hover {
        cursor: pointer;
        background: rgba(29, 134, 239, 0.17);
      }
      .snippet_title {
        padding: 10px 10px 0;
        margin: 0;
        line-height: 16px;
      }

      .price {
        font-size: 12px;
        color: $color-success-second;
        margin: 0 0 0 10px;
        padding: 0;
      }

      .sku {
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
    }
  }
</style>
