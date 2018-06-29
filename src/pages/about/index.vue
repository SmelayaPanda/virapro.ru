<template>
  <el-row type="flex" justify="center">
    <el-col :span="16">
      <h1 id="about_title">О нас</h1>
      <p>
        Разнообразный и богатый опыт укрепление и развитие структуры позволяет выполнять важные задания по разработке
        системы обучения кадров, соответствует насущным потребностям. Разнообразный и богатый опыт укрепление и развитие
        структуры способствует подготовки и реализации модели развития. Равным образом сложившаяся структура организации
        играет важную роль в формировании систем массового участия.
      </p>
      <Reviews></Reviews>
    </el-col>
  </el-row>
</template>

<script>
  import Reviews from "@/components/about/Reviews";

  export default {
    components: {Reviews},
    async asyncData() {
      return {
        renderSource: process.static ? 'static' : (process.server ? 'server' : 'client')
      }
    },
    methods: {
      reloadPage() {
        window.location.reload()
      }
    }
  }
</script>

<style scoped lang="scss">
  #about_title {
    color: $color-primary;
    margin-left: 50px;
  }
</style>
