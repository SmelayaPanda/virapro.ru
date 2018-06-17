<template>
  <el-row type="flex" justify="center" id="groups_wrap">
    <el-col
      :span="8"
      v-for="group in $store.getters.PRODUCT_TREE" :key="group.value"
      v-if="group.value !== 'all-products'">
      <el-card class="group_card">
        <nuxt-link :to="`/catalog/${group.value}`">{{ group.label }}</nuxt-link>
      </el-card>
    </el-col>
  </el-row>
</template>

<script>
  export default {
  }
</script>

<style scoped lang="scss">
  #groups_wrap {
    flex-wrap: wrap;
    margin-top: 10px;
    margin-right: 10px;
  }

  .group_card {
    margin: 10px;
  }
</style>
