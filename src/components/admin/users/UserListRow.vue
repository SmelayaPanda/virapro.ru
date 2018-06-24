<template>
  <div id="row">
    <el-button type="primary" id="user">{{ id }}</el-button>
  </div>
</template>

<script>
  export default {
    name: "UserListRow",
    props: {
      id: {type: String, required: true}
    }
  }
</script>

<style scoped lang="scss">
  #user {
    width: 100%;
  }
</style>
