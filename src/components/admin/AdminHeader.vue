<template>
  <div id="admin_header">
    <div id="panel">
      <h2>Admin Panel</h2>
      <!--<img id="home" src="~/assets/icons/admin/important_devices.svg" alt="Go Home">-->
    </div>
  </div>
</template>

<script>
  export default {
    name: "AdminHeader"
  }
</script>

<style scoped lang="scss">
  #admin_header {
    background: $color-primary;
    color: White;
  }

  #panel {
    margin-left: 20px;
    line-height: 20px;
  }

  #home {
    /*height: 15px;*/
  }
</style>
