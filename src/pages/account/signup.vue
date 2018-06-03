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
        <h2>Регистрация</h2>
        <el-form :model="formRule"
                 status-icon
                 :rules="rules"
                 auto-complete="on"
                 ref="formRule">
          <el-form-item label="Email" prop="email">
            <el-input type="email"
                      :autofocus="true"
                      v-model="formRule.email"
                      auto-complete="on">
            </el-input>
          </el-form-item>
          <el-form-item label="Пароль" prop="password">
            <el-input type="password"
                      v-model="formRule.password"
                      auto-complete="off">
            </el-input>
          </el-form-item>
          <el-form-item label="Подтверждение пароля" prop="checkPass">
            <el-input type="password" v-model="formRule.checkPass" auto-complete="off"></el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="danger mt-2"
                       :disabled="$store.getters.LOADING"
                       @click="submitForm('formRule')">
              Вперед!
            </el-button>
          </el-form-item>
        </el-form>
        <router-link to="/signin">
          <el-button type="text">Есть аккаунт?</el-button>
        </router-link>
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
        } else if (value.length < 6) {
          callback(new Error('Пароль дожен быть не менее 6 символов'))
        } else {
          if (this.formRule.checkPass !== '') {
            this.$refs.formRule.validateField('checkPass')
          }
          callback()
        }
      }
      let validateConfPass = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('Введите пароль повторно'))
        } else if (value !== this.formRule.password) {
          callback(new Error('Пароли не совпадают!'))
        } else {
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
          password: [
            {validator: validatePass, trigger: 'blur'}
          ],
          checkPass: [
            {validator: validateConfPass, trigger: 'blur'}
          ],
          email: [
            {validator: checkEmail, trigger: 'blur'}
          ]
        }
      }
    },
    methods: {
      submitForm(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            this.$store.dispatch('signUserUp', {email: this.formRule.email, password: this.formRule.password})
          } else {
            return this.$store.dispatch('ERR', {message: 'Пожалуйста, заполните поля корректно!'})
          }
        })
      },
      isValidEmail: function (email) {
        return /^\S+@\S+\.\S+$/.test(email)
      }
    }
  }
</script>

<style scoped>
</style>
