<template>
  <div id="add_wrap">
    <el-carousel
      class="info_carousel"
      :interval="5000"
      height="300px"
      indicator-position="none">
      <el-carousel-item v-for="item in $store.getters.SERVICE_TYPES" :key="item.value">
        <el-row class="carousel_title">
          <h4>{{ item.title }}</h4>
        </el-row>
        <el-row class="carousel_content">
          <p>
            {{ item.description }}
          </p>
        </el-row>
        <el-row type="flex" justify="center">
          <el-button class="primary_btn" @click="$bus.$emit('openOrderServiceDialog', item.value)">Заказать</el-button>
        </el-row>
      </el-carousel-item>
    </el-carousel>
    <el-carousel
      v-if="questions"
      :interval="5000"
      height="300px"
      class="question_carousel"
      indicator-position="none">
      <el-carousel-item v-for="q in questions" :key="q.title">
        <el-row class="carousel_title">
          <h4>{{ q.title }}</h4>
        </el-row>
        <el-row class="carousel_content">
          <p>{{ q.description }}</p>
        </el-row>
        <el-row type="flex" justify="center">
          <OneQuestionAnswer :item="q" :key="q.id"/>
        </el-row>
      </el-carousel-item>
    </el-carousel>
  </div>
</template>

<script>
  import OneQuestionAnswer from "./OneQuestionAnswer";

  export default {
    name: "Advertising",
    components: {OneQuestionAnswer},
    data() {
      return {}
    },
    computed: {
      questions() {
        return this.$store.getters.questions
      }
    },
    created() {
      this.$store.dispatch('fetchQuestions')
    }
  }
</script>

<style scoped lang="scss">
  #add_wrap {
    margin-top: 45px;
    flex: 0 0 300px;
  }

  .carousel_title {
    display: flex;
    justify-content: center;
    h4 {
      margin: 10px;
    }
  }

  .carousel_content {
    display: flex;
    justify-content: center;
    padding: 5px 15px;
    margin: 0;
    font-weight: 300;
    p {
      margin: 0 0 15px;
    }
  }

  .info_carousel {
    border-radius: 3px;
  }

  .question_carousel {
    border-radius: 3px;
    margin-top: 10px;
  }

  /**/

  .el-carousel__item:nth-child(2n) {
    background-color: white;
  }

  .el-carousel__item:nth-child(2n+1) {
    background-color: white;
  }
</style>
