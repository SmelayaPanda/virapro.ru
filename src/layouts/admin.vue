<template>
  <no-ssr>
  <el-container>
    <el-header>
      <admin-header></admin-header>
    </el-header>
    <el-container v-if="$store.getters.user && $store.getters.IS_ADMIN">
      <el-aside width="200px">
        <admin-nav></admin-nav>
      </el-aside>
      <el-main>
        <nuxt/>
      </el-main>
    </el-container>
    <el-container v-else id="is_not_admin">
      <h1>Необходимо зайти как администратор</h1>
    </el-container>
  </el-container>
  </no-ssr>
</template>

<script>
  import AdminHeader from "../components/admin/AdminHeader";
  import AdminNav from "../components/admin/AdminNav";

  export default {
    name: "admin",
    components: {AdminNav, AdminHeader}
  }
</script>

<style lang="scss">
  body {
    margin: 0;
    padding: 0;
    font-size: 16px;
    font-family: 'Open Sans', sans-serif;
    color: $color-secondary;
  }

  .el-header {
    background: $color-primary;
    color: White;
    line-height: 60px;
  }

  .el-aside {
    line-height: 240px;
    margin-top: 10px;
  }

  .el-main {
  }

  body > .el-container {
    margin-bottom: 40px;
  }

  #is_not_admin {
    margin-left: 38px;
    h1 {
      color: $color-info-dark;
    }
  }
</style>
