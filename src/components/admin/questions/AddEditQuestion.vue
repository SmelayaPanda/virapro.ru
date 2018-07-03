<template>
  <div>
    <el-button @click="dialog = true">
      <i class="el-icon-plus"></i>
    </el-button>
    <el-dialog
      title="Добавить вопрос"
      close-on-press-escape
      :visible.sync="dialog"
      center
      width="500px">
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
          <el-button @click="addQuestion" :disabled="!isValidForm" class="secondary_btn">
            Добавить
          </el-button>
        </el-row>
      </el-form>
    </el-dialog>
  </div>
</template>
<script>
  export default {
    name: 'AddEditQuestion',
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
