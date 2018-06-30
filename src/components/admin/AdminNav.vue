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
          <span>Статистика</span>
        </el-menu-item>
        <el-menu-item index="/admin/products">
          <img src="~/assets/icons/admin/playlist_add.svg" alt="">
          <span>Товары</span>
        </el-menu-item>
        <el-menu-item index="/admin/orders">
          <img src="~/assets/icons/admin/description.svg" alt="">
          <span>Покупки</span>
        </el-menu-item>
        <el-menu-item index="/admin/requests">
          <img src="~/assets/icons/admin/pan_tool.svg" alt="">
          <span>Заявки</span>
        </el-menu-item>
        <el-menu-item index="/admin/dictionaries">
          <img src="~/assets/icons/admin/text_format.svg" alt="">
          <span>Словари</span>
        </el-menu-item>
        <el-menu-item index="/admin/reviews">
          <img src="~/assets/icons/admin/record_voice_over.svg" alt="">
          <span>Отзывы</span>
        </el-menu-item>
        <el-menu-item index="/admin/users">
          <img src="~/assets/icons/admin/how_to_reg.svg" alt="">
          <span>Пользователи</span>
        </el-menu-item>
        <el-menu-item index="/admin/company">
          <img src="~/assets/icons/admin/account_balance.svg" alt="">
          <span>Компания</span>
        </el-menu-item>
        <el-menu-item index="/admin/system">
          <img src="~/assets/icons/admin/settings.svg" alt="">
          <span>Система</span>
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
