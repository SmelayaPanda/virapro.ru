<template>
  <div id="crumbs">
    <ul>
      <li>
        <nuxt-link to="/catalog">Каталог</nuxt-link>
      </li>
      <li>
        <nuxt-link v-if="$nuxt.$route.params.group" :to="`/catalog/${$nuxt.$route.params.group}`">
          {{ loadedGroup.label }}
        </nuxt-link>
      </li>
      <li>
        <nuxt-link
          v-if="$nuxt.$route.params.category"
          :to="`/catalog/${$nuxt.$route.params.group}/${$nuxt.$route.params.category}`">
          {{ loadedCategory.label }}
        </nuxt-link>
      </li>
      <li>
        <nuxt-link
          v-if="$nuxt.$route.params.id && $store.getters.singleProduct"
          :to="`/catalog/${$nuxt.$route.params.group}/${$nuxt.$route.params.category}/${$nuxt.$route.params.id}`">
          Арт.: {{ $store.getters.singleProduct.SKU }}
        </nuxt-link>
      </li>
    </ul>
  </div>
</template>

<script>
  export default {
    name: "Breadcrumbs",
    computed: {
      loadedGroup() {
        for (let group in this.$store.getters.PRODUCT_TREE) {
          if (this.$store.getters.PRODUCT_TREE[group].value === this.$nuxt.$route.params.group) {
            return this.$store.getters.PRODUCT_TREE[group]
          }
        }
      },
      loadedCategory() {
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
  $crumbs-back: white;
  $text-color: white;

  #crumbs {
    /*text-align: center;*/
    ul {
      list-style: none;
      display: inline-table;
      margin: 12px 12px 5px;
      li {
        display: inline;
        a {
          display: block;
          float: left;
          height: 18px;
          background: $color-primary-light; // white

          text-align: center;
          padding: 12px 10px 10px 34px;
          position: relative;
          margin: 0 10px 0 0;

          font-size: 14px;
          text-decoration: none;
          color: $text-color;

          &:after {
            content: "";
            border-top: 20px solid transparent;
            border-bottom: 20px solid transparent;
            border-left: 20px solid $color-primary-light;
            position: absolute;
            right: -20px;
            top: 0;
            z-index: 1;
          }
          &:before {
            content: "";
            border-top: 20px solid transparent;
            border-bottom: 20px solid transparent;
            border-left: 20px solid #fff;
            position: absolute;
            left: 0;
            top: 0;
          }
        }
      }
    }
  }

  #crumbs ul li:first-child a {
    border-top-left-radius: 10px;
    border-bottom-left-radius: 10px;
  }

  #crumbs ul li:first-child a:before {
    display: none;
  }

  #crumbs ul li:last-child a {
    padding-right: 40px;
    border-top-right-radius: 10px;
    border-bottom-right-radius: 10px;
  }

  #crumbs ul li:last-child a:after {
    display: none;
  }

  #crumbs ul li a:hover {
    background: $color-primary;
    color: #fff;
  }

  #crumbs ul li a:hover:after {
    border-left-color: $color-primary;
    color: #fff;
  }
</style>
