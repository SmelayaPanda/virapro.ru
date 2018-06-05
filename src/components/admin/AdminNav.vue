<template>
  <nav id="admin_nav">
      <el-menu
        :default-active="$nuxt.$route.path"
        class="el-menu-vertical-demo"
        text-color="#37474f"
        active-text-color="#1976d2"
        :router="true">
        <el-menu-item index="/admin">
          <img src="~/assets/icons/admin/assessment.svg" alt="">
          <span>Dashboard</span>
        </el-menu-item>
        <el-menu-item index="/admin/products">
          <img src="~/assets/icons/admin/playlist_add.svg" alt="">
          <span>Products</span>
        </el-menu-item>
        <el-menu-item index="/admin/orders">
          <img src="~/assets/icons/admin/description.svg" alt="">
          <span>Orders</span>
        </el-menu-item>
        <el-menu-item index="/admin/files" disabled>
          <img src="~/assets/icons/admin/attach_file.svg" alt="">
          <span>Files</span>
        </el-menu-item>
        <el-menu-item index="/admin/dictionaries">
          <img src="~/assets/icons/admin/text_format.svg" alt="">
          <span>Dictionaries</span>
        </el-menu-item>
        <el-menu-item index="/admin/reviews" disabled>
          <img src="~/assets/icons/admin/record_voice_over.svg" alt="">
          <span>Reviews</span>
        </el-menu-item>
        <el-menu-item index="/admin/company">
          <img src="~/assets/icons/admin/account_balance.svg" alt="">
          <span>Company</span>
        </el-menu-item>
      </el-menu>
  </nav>
</template>

<script>
  export default {
    name: "AdminNav",
    methods: {}
  }
</script>

<style scoped lang="scss">
  #admin_nav {
  }
  img {
    padding-right: 10px;
  }
</style>
