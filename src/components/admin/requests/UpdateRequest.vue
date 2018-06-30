<template>
  <div v-if="request">
    <el-button @click="openDialog">
      <i class="el-icon-edit-outline"></i>
    </el-button>
    <el-dialog
      title="Редактировать заявку"
      :visible.sync="dialog"
      width="100%"
      center>
      <p align="center">Статус заявки</p>
      <el-radio-group v-model="request.status" id="request_status" size="small">
        <el-radio-button
          v-for="status in $store.getters.REQUESTS_STATUSES"
          :key="status.value"
          :label="status.value">{{ status.label }}
        </el-radio-button>
      </el-radio-group>
      <section class="container">
        <div class="quill-editor"
             v-model="request.comments.admin"
             v-quill:myQuillEditor="editorOption">
        </div>
      </section>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialog = false">Отмена</el-button>
        <el-button type="danger" @click="correctRequestText">Подтвердить</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
  export default {
    name: 'UpdateRequest',
    props: {
      requestId: {type: String, required: true}
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
          },
          placeholder: 'Ваш комментарий (виден только Вам)'
        }
      }
    },
    methods: {
      correctRequestText() {
        this.dialog = false
        let obj = {
          'comments.admin': this.request.comments.admin,
          status: this.request.status
        }
        if (this.oldStatus !== this.request.status) {
          obj.isChangedStatus = true
        }
        this.$store.dispatch('updateRequest', {
          id: this.requestId,
          updateData: obj
        })
      },
      openDialog () {
        this.oldStatus = this.request.status
        this.dialog = true
      }
    },
    computed: {
      request() {
        return this.$store.getters.requests[this.requestId]
      }
    }
  }
</script>

<style scoped lang="scss">
  #request_status {
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
