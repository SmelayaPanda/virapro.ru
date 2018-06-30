<template>
  <div>
    <AdminRequests/>
  </div>
</template>

<script>
  import AdminRequests from "@/components/admin/requests/AdminRequests";
  export default {
    name: "index",
    components: {AdminRequests},
    layout: 'admin',
    data () {
      return {
      }
    },
    methods: {}
  }
</script>

<style scoped lang="scss">
</style>
