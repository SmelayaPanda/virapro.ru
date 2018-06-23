<template>
  <div>
    <AdminReviews></AdminReviews>
  </div>
</template>

<script>
  import AdminReviews from "@/components/admin/reviews/AdminReviews";

  export default {
    name: "index",
    components: {AdminReviews},
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
