<template>
  <div>
    <AdminOrders></AdminOrders>
  </div>
</template>

<script>
  import AdminOrders from "@/components/admin/orders/AdminOrders";
  export default {
    name: "index",
    components: {AdminOrders},
    layout: 'admin'
  }
</script>

<style scoped>

</style>
