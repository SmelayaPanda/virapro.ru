<!--
REVIEW STATUSES:
1. created
2. published
3. archived
-->
<template>
  <div class="mb-5">
    <h2 id="reviews_title">Отзывы о нас</h2>
    <el-carousel
      id="reviews_carousel"
      :autoplay="false"
      trigger="click"
      type="card"
      height="350px">
      <el-carousel-item v-for="(item, idx) in reviews" :key="idx">
        <el-card class="review_card">
          <el-row>
            <img :src="item.user.avatar" height="70px" alt="User avatar">
            <el-col :span="24">
              <p class="user_name">{{ item.user.name }}</p>
            </el-col>
          </el-row>
          <el-col :span="24">
            <div class="review_text_wrapper">
              <span v-html="item.text.slice(0, 300)"></span>
            </div>
            <p>{{ new Date(item.date).toLocaleDateString() }}</p>
          </el-col>
        </el-card>
      </el-carousel-item>
    </el-carousel>
    <el-button @click="dialog = true">Добавить отзыв</el-button>
    <el-dialog
      id="your_review"
      title="Ваш отзыв!"
      :visible.sync="dialog"
      width="500px"
      center>
      <UploadReviewAvatar @fileUploaded="loadFileData"/>
      <el-input v-model="review.user.name" placeholder="Имя"></el-input>
      <el-input
        v-model="review.text"
        type="textarea"
        placeholder="Отзыв ( максимум 300 символов )"
        :autosize="{ minRows: 5, maxRows: 7}"
        :maxlength="300">
      </el-input>
      <span slot="footer" class="dialog-footer">
      <el-button @click="addReview" type="danger" :disabled="!isValidForm">Отправить!</el-button>
      <el-button @click="dialog = false">Отмена</el-button>
    </span>
    </el-dialog>
  </div>
</template>

<script>
import UploadReviewAvatar from "./UploadReviewAvatar";
export default {
  name: 'Reviews',
  components: {UploadReviewAvatar},
  data () {
    return {
      dialog: false,
      review: {
        user: {name: '', id: '', avatar: ''},
        text: '',
        status: 'created',
        date: new Date().getTime()
      }
    }
  },
  methods: {
    addReview () {
      this.dialog = false
      this.$store.dispatch('addReview', this.review)
    },
    loadFileData (val) {
      this.review.user.avatar = val
    },
  },
  computed: {
    reviews () {
      return this.$store.getters.reviews
    },
    isValidForm () {
      return this.review.user.name && this.review.user.avatar && this.review.text
    }
  },
  created() {
    this.$store.dispatch('fetchReviews', {status: this.$store.getters.REVIEW_STATUSES.published.value })
  }
}
</script>

<style scoped lang="scss">
  .review_card {
    padding: 0;
    margin: 0;
    height: 330px;
    color: $color-primary;
  }

  #reviews_title {
    font-size: 24px;
    font-weight: 400;
    color: $color-secondary;
    padding: 40px 40px 20px 55px;
  }

  .el-card {
    border-radius: 20px;
  }

  .review_text_wrapper {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 120px;
  }

  .user_name {
    font-size: 16px;
    margin: 15px;
  }
  .review_text {
  }
</style>
