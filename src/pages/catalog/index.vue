<template>
  <el-row id="catalog_wrap">
    <el-col :span="8" id="catalog_title">
      <h1><span>Каталог</span><br>сантехнического и<br>отопительного<br>оборудования</h1>
    </el-col>
    <el-col
      :span="8"
      v-for="(group, idx) in $store.getters.PRODUCT_TREE" :key="group.value"
      v-if="group.value !== 'all-products'">
      <div class="catalog_card">
        {{idx}}
        <img src="~/assets/icons/admin/attach_file.svg" alt="">
        <nuxt-link :to="`/catalog/${group.value}`">{{ group.label }}</nuxt-link>
      </div>
    </el-col>
  </el-row>
</template>

<script>
  export default {}
</script>

<style scoped lang="scss">
  #catalog_wrap {
    display: flex;
    justify-content: center;
    flex-wrap: wrap;
    margin-top: 120px;
    margin-right: 100px;
    margin-left: 100px;
    a {
      color: $color-secondary;
    }
  }

  #catalog_title {
    margin-top: -90px;
    height: 170px;
    background: url("~/static/catalog/tap.svg") no-repeat;
    background-size: contain;
    letter-spacing: 2px;
    padding-left: 58px;
    margin-bottom: 10px;
    h1 {
      font-size: 24px;
      font-weight: 900;
      color: $color-secondary;
    }
    span {
      font-size: 30px;
      font-weight: 900;
      color: $color-primary;
    }
  }

    .catalog_card {
      display: flex;
      justify-content: start;
      align-items: center;
      transition: all .3s;
      margin: 10px;
      border: 1px solid $color-primary-light;
      padding: 22px;
      border-radius: 5px;
      &:hover {
        cursor: pointer;
        background: $color-primary;
        @include primaryShadow;
        a {
          color: white !important;
        }
      }
      img {
        margin-right: 10px;
      }
    }

</style>
