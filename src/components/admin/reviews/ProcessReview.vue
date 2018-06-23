<template>
  <div v-if="review">
    <el-button @click="openDialog">
      <i class="el-icon-edit-outline"></i>
    </el-button>
    <el-dialog
      title="Редактировать отзыва"
      :visible.sync="dialog"
      width="100%"
      center>
      <p align="center">Статус отзыва</p>
      <el-radio-group v-model="review.status" id="review_status" size="small">
        <el-radio-button
          v-for="status in $store.getters.REVIEW_STATUSES"
          :key="status.value"
          :label="status.value">{{ status.label }}
        </el-radio-button>
      </el-radio-group>
      <section class="container">
        <div class="quill-editor"
             v-model="review.text"
             v-quill:myQuillEditor="editorOption">
        </div>
      </section>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialog = false">Отмена</el-button>
        <el-button type="danger" @click="correctReviewText">Подтвердить</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
  export default {
    name: 'ProcessReview',
    props: {
      reviewId: {type: String, required: true}
    },
    data() {
      return {
        dialog: false,
        oldStatus: '',
        editorOption: {
          // some quill options
          modules: {
            toolbar: [
              ['bold', 'italic', 'underline', 'strike'],
              ['blockquote', 'code-block'],
              [{'list': 'ordered'}, {'list': 'bullet'}],
              [{'script': 'sub'}, {'script': 'super'}],
              [{'indent': '-1'}, {'indent': '+1'}],
              ['clean'],
              ['link'],
              [{'align': []}],
            ]
          }
        }
      }
    },
    methods: {
      correctReviewText() {
        this.dialog = false
        let obj = {
          text: this.review.text,
          status: this.review.status
        }
        if (this.oldStatus !== this.review.status) {
          obj.isChangedStatus = true
        }
        this.$store.dispatch('updateReview', {
          id: this.reviewId,
          updateData: obj
        })
      },
      openDialog () {
        this.oldStatus = this.review.status
        this.dialog = true
      }
    },
    computed: {
      review() {
        return this.$store.getters.reviews[this.reviewId]
      }
    }
  }
</script>

<style scoped lang="scss">
  #review_status {
    display: flex;
    justify-content: center;
    margin-bottom: 30px;
  }

  .container {
    width: 100%;
    margin: 0 auto;
    .quill-editor {
      min-height: 200px;
      max-height: 400px;
      overflow-y: auto;
    }
  }
</style>
