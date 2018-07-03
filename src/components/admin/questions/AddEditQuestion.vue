<template>
  <div>
    <el-button @click="openDialog">
      <i :class="operation === 'add' ? 'el-icon-plus' : 'el-icon-edit'"></i>
    </el-button>
    <el-dialog
      :title="operation === 'add' ? 'Добавить вопрос' : 'Редактировать вопрос'"
      close-on-press-escape
      :visible.sync="dialog"
      center
      width="500px">
      <p v-if="operation === 'edit'" class="info_msg">
        Пользуйтесь исправлением вопроса только в случае орфографических/грамматических ошибок.
        Не стоит менять вопрос, если на него уже начали отвечать пользователи
        ( в таком случае лучше создать новый )
      </p>
      <el-form :model="form" ref="form" :rules="rules">
        <el-form-item label="Заголовок" prop="title">
          <el-input type="text" placeholder="(От 4 до 32 символов)" v-model="form.title">
          </el-input>
        </el-form-item>
        <el-form-item label="Описание" prop="description">
          <el-input
            v-model="form.description"
            type="textarea"
            :autosize="{ minRows: 3, maxRows: 4}"
            placeholder="(От 4 до 128 символов)">
          </el-input>
        </el-form-item>
        <el-row type="flex" justify="center">
          <el-button v-if="operation === 'add'" @click="addQuestion" :disabled="!isValidForm" class="secondary_btn">
            Добавить
          </el-button>
          <el-button v-else @click="editQuestion" :disabled="!isValidForm" class="secondary_btn">
            Редактировать
          </el-button>
        </el-row>
      </el-form>
    </el-dialog>
  </div>
</template>
<script>
  export default {
    name: 'AddEditQuestion',
    props: {
      operation: {type: String, required: true},
      question: {type: Object}
    },
    data() {
      return {
        dialog: false,
        form: {
          title: '',
          description: ''
        },
        rules: {
          title: [{min: 4, max: 32, message: 'От 4 до 32 символов', trigger: 'change'}],
          description: [{min: 4, max: 128, message: 'От 4 до 128 символов', trigger: 'change'}],
        }
      }
    },
    methods: {
      addQuestion() {
        this.$store.dispatch('createQuestion', {
          title: this.form.title,
          description: this.form.description,
          counters: {yes: [], no: []} // arrays of user ids
        })
        this.$refs.form.resetFields();
        this.dialog = false
      },
      editQuestion() {
        this.$store.dispatch('updateQuestion', {
          id: this.question.id,
          updateData: {
            title: this.form.title,
            description: this.form.description
          }
        })
        this.$refs.form.resetFields();
        this.dialog = false
      },
      openDialog() {
        this.dialog = true
        if (this.operation === 'edit') {
          this.form.title = this.question.title
          this.form.description = this.question.description
        }
      }
    },
    computed: {
      isValidForm() {
        return this.form.title.length > 3 && this.form.title.length < 32 &&
          this.form.description.length > 3 && this.form.description.length < 128
      }
    }
  }
</script>

<style type="text/css" lang="scss">
  .info_msg {
    font-size: 12px;
    color: $color-info;
  }
</style>
