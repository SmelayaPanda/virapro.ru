<template>
  <el-card>
    <el-row v-if="review" id="review_row">
      <el-col style="width: 56px">
        <el-button
          :icon="openInfo ? 'el-icon-arrow-down' : 'el-icon-arrow-right'"
          circle plain @click="openInfo = !openInfo">
        </el-button>
      </el-col>
      <el-col style="width: 76px">
        <img v-if="review.user.avatar" :src="review.user.avatar" height="40px" alt="User avatar">
      </el-col>
      <el-col style="width: 180px">
        <el-tag type="success" size="small">{{ new Date(review.date).toLocaleString() }}</el-tag>
      </el-col>
      <el-col :span="16">
        {{ review.user.name }}
      </el-col>
      <el-col style="width: 60px;">
        <UpdateReview :reviewId="review.id"/>
      </el-col>
    </el-row>
    <el-row v-if="openInfo" id="expand_description">
      <el-col :span="24">
        <span class="prop_name">ИД отзыва: </span>
        <el-tag type="success" size="small">{{ review.id }}</el-tag>
        <br>
        <span class="prop_name">ИД пользователя: </span>
        <el-tag type="success" size="small">{{ review.user.id }}</el-tag>
      </el-col>
      <el-col :span="24" id="review_text">
        <span v-html="review.text"></span>
      </el-col>
    </el-row>
  </el-card>
</template>
<script>
  import UpdateReview from './UpdateReview'

  export default {
    name: 'ReviewRow',
    components: {UpdateReview},
    props: {
      review: {type: Object, required: true}
    },
    data() {
      return {
        openInfo: false
      }
    }
  }
</script>

<style lang="scss" scoped>
  #expand_description {
    margin-top: 20px;
    margin-left: 10px;
  }

  .prop_name {
    font-size: 14px;
    color: $color-info;
  }

  #review_text {
    margin-top: 20px;
  }

  #review_row {
    display: flex;
    justify-content: center;
    align-items: center;
  }
</style>
