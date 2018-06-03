<template>
  <el-row type="flex" justify="center">
    <el-col :xs="24" :sm="14" :md="12" :lg="10" :xl="8">
      <el-card>
        <el-alert
          v-if="$store.state.ERR"
          title="Error"
          type="error"
          :description="$store.state.ERR.message"
          show-icon>
        </el-alert>
        <h2>Вход</h2>
        <el-form
          :model="formRule"
          status-icon
          :rules="rules"
          auto-complete="on"
          ref="formRule">
          <el-form-item label="Email" prop="email">
            <el-input
              type="email"
              id="email"
              :autofocus="true"
              v-model="formRule.email"
              auto-complete="on">
            </el-input>
          </el-form-item>
          <el-form-item label="Пароль" prop="password">
            <el-input
              type="password"
              v-model="formRule.password"
              auto-complete="off">
            </el-input>
          </el-form-item>
          <el-form-item>
            <el-button
              type="danger"
              :disabled="$store.getters.LOADING"
              @click="submitForm('formRule')">
              Вперед!
            </el-button>
          </el-form-item>
          <div v-if="submitCount > 1">
            <span class="primary--text ml-3">Забыли пароль?</span>
            <p>Ввведите свою почту в форме выше и нажмите:</p>
            <el-button type="danger" @click="resetPassword">Сбросить пароль</el-button>
          </div>
          <router-link to="/signup">
            <el-button type="text">Нет аккаунта?</el-button>
          </router-link>
        </el-form>
      </el-card>
    </el-col>
  </el-row>
</template>

<script>
  export default {
    name: 'signin',
    data() {
      let checkEmail = (rule, value, callback) => {
        if (!value) {
          return callback(new Error('Укажите вашу электронную почту'))
        }
        setTimeout(() => {
          if (!this.isValidEmail(value)) {
            callback(new Error('Введена некорректная почта'))
          } else {
            callback()
          }
        }, 1000)
      }
      let validatePass = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('Введите пароль'))
        } else {
          if (this.formRule.checkPass !== '') {
            this.$refs.formRule.validateField('checkPass')
          }
          callback()
        }
      }
      return {
        formRule: {
          password: '',
          checkPass: '',
          email: ''
        },
        rules: {
          password: [{validator: validatePass, trigger: 'blur'}],
          email: [{validator: checkEmail, trigger: 'blur'}]
        },
        submitCount: 0
      }
    },
    methods: {
      submitForm(formName) {
        this.submitCount++
        this.$refs[formName].validate((valid) => {
          if (valid) {
            this.$store.dispatch('signUserIn', {
              email: this.formRule.email,
              password: this.formRule.password
            })
          } else {
            return this.$store.dispatch('ERR', {message: 'Пожалуйста, заполните поля корректно!'})
          }
        })
      },
      isValidEmail(email) {
        return /^\S+@\S+\.\S+$/.test(email)
      },
      resetPassword() {
        let email = document.getElementById('email').value
        this.$store.dispatch('resetPassword', email)
      }
    }
  }
</script>

<style scoped>
</style>
