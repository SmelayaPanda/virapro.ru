<template>
  <div id="add_wrap">
    <el-carousel
      class="info_carousel"
      :interval="5000"
      height="300px"
      indicator-position="none">
      <el-carousel-item v-for="item in $store.getters.SERVICE_TYPES" :key="item.value">
        <el-row class="carousel_title">
          <h4>{{ item.label }}</h4>
        </el-row>
        <el-row class="carousel_content">
          <p>
          {{ item.content }}
          </p>
        </el-row>
        <el-row type="flex" justify="center">
          <el-button class="primary_btn">Заказать</el-button>
        </el-row>
      </el-carousel-item>
    </el-carousel>
    <el-carousel
      :interval="5000"
      height="300px"
      class="question_carousel"
      indicator-position="none">
      <el-carousel-item v-for="item in questions" :key="item.title">
        <el-row class="carousel_title">
          <h4>{{ item.title }}</h4>
        </el-row>
        <el-row class="carousel_content">
          <p>{{ item.content }}</p>
        </el-row>
        <el-row type="flex" justify="center">
          <el-radio-group v-model="ansver" size="small">
            <el-radio-button label="Да" ></el-radio-button>
            <el-radio-button label="Нет"></el-radio-button>
          </el-radio-group>
        </el-row>
      </el-carousel-item>
    </el-carousel>
  </div>
</template>

<script>
  export default {
    name: "Advertising",
    data () {
      return {
        questions: [
          {title: 'Новые товары', content: 'Хотели бы вы узнавать о новых поступлениях?'},
          {title: 'Опт/розница', content: 'Важна ли для вас возможность оптовой покупки?'},
          {title: 'Доставка', content: 'Обычно Вам доставляют или Вы сами приезжаете?'},
          {title: 'Тех. поддержка', content: 'Требуется ли Вам техническая поддержка (например, при проектировании, установке)?'}
        ],
        ansver: ''
      }
    }
  }
</script>

<style scoped lang="scss">
  #add_wrap {
    margin-top: 10px;
    flex: 0 0 300px;
  }

  .carousel_title {
    display: flex;
    justify-content: center;
  }

  .carousel_content {
    display: flex;
    justify-content: center;
    padding-left: 15px;
    padding-right: 15px;
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
