<!--
REVIEW STATUSES:
1. created
2. published
3. archived
-->
<template>
  <div>
    <el-carousel
      id="reviews_carousel"
      :autoplay="false"
      trigger="click"
      type="card"
      arrow="always"
      height="350px">
      <el-carousel-item v-for="(item, idx) in reviews" :key="idx">
        <el-card class="review_card">
          <el-row class="review">
            <el-col :span="6">
              <img :src="item.user.avatar" alt="Аватар">
            </el-col>
            <el-col :span="18">
              <p class="user_name">{{ item.user.name }}</p>
            </el-col>
            <el-col :span="20">
              <span v-html="item.text.slice(300)"></span>
            </el-col>
          </el-row>
          <el-col :span="24">
            <time>{{ new Date(item.date).toLocaleDateString() }}</time>
          </el-col>
        </el-card>
      </el-carousel-item>
    </el-carousel>
    <el-row type="flex" justify="center">
      <el-button @click="dialog = true" class="primary_btn">Добавить отзыв</el-button>
    </el-row>
    <el-dialog
      id="your_review"
      title="Ваш отзыв!"
      :visible.sync="dialog"
      width="500px"
      center>
      <UploadReviewAvatar @fileUploaded="loadFileData"/>
      <el-input v-model="review.user.name" placeholder="Имя" style="margin-bottom: 10px;"></el-input>
      <el-input
        v-model="review.text"
        type="textarea"
        placeholder="Отзыв ( максимум 300 символов )"
        :autosize="{ minRows: 5, maxRows: 7}"
        :maxlength="300">
      </el-input>
      <span slot="footer" class="dialog-footer">
      <el-button @click="addReview" class="primary_btn" :disabled="!isValidForm">Отправить!</el-button>
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
  #reviews_carousel {
  }

  .review_card {
    padding: 0;
    margin: 0;
    height: 330px;
    .review {
      display: flex;
      flex-wrap: wrap;
      justify-content: center;
      align-items: center;
      padding-left: 20px;
    }
    time {
      position: absolute;
      bottom: 40px;
      right: 40px;
      color: $color-info;
      font-size: 12px;
    }
    img {
      height: 70px;
      width: 70px;
      border-radius: 50%;
      object-fit: cover;
    }
    .user_name {
      font-size: 16px;
      margin: 15px;
    }
  }

  .el-card {
    border-radius: 20px;
  }
</style>
