<template>
  <el-row type="flex" justify="center">
    <el-col :xs="24" :sm="14" :md="10" :lg="8" :xl="8">
      <el-card id="signin_card">
        <el-alert
          v-if="$store.state.ERR"
          :description="$store.state.ERR.message"
          title="Error" type="error" show-icon>
        </el-alert>
        <h2 align="center">Выберите способ входа</h2>
        <el-button @click.native="googleSignUp">
          <img src="~/assets/icons/account/gmail.svg" height="60" alt="Войти с помощью Google"><br>
          Войти с помощью Google
        </el-button>
        <el-button @click="emailSignInDialog = true">
          <img src="~/assets/icons/account/emailSignIn.svg" height="60px" alt="Войти с помощью Google"><br>
          Войти с помощью email
        </el-button>
        <router-link to="/account/signup">
          <el-button type="text" id="havent_account">
            <!--Haven't account?-->
            Нет аккаунта?
          </el-button>
        </router-link>
        <el-dialog
          width="400px"
          title="Войти с помощью email"
          :visible.sync="emailSignInDialog">
          <el-form :model="form" status-icon :rules="rules" auto-complete="on" ref="form">
            <el-form-item label="Почта" prop="email">
              <el-input type="email" id="email" :autofocus="true" v-model="form.email" auto-complete="on"></el-input>
            </el-form-item>
            <el-form-item label="Пароль" prop="password">
              <el-input type="password" v-model="form.password" auto-complete="off"></el-input>
            </el-form-item>
            <el-form-item>
              <el-button class="primary_btn" :disabled="$store.getters.LOADING" @click="submitForm('form')">
                Вперед!
              </el-button>
            </el-form-item>
            <div v-if="submitCount > 1">
              <!--<span>Forgot a password?</span>-->
              <span>Забыли пароль?</span>
              <!--<p>Type the email in the field above and click:</p>-->
              <p>Введите email в поле выше и нажмите:</p>
              <el-button class="secondary_btn" @click="resetPassword">
                <!--Reset password-->
                Сбросить пароль
              </el-button>
            </div>
            <router-link to="/account/signup">
              <el-button type="text">
                <!--Haven't account?-->
                Нет аккаунта?
              </el-button>
            </router-link>
          </el-form>
        </el-dialog>
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
          return callback(new Error('Enter email please'))
        }
        setTimeout(() => {
          if (!this.isValidEmail(value)) {
            callback(new Error('Email is not correct'))
          } else {
            callback()
          }
        }, 1000)
      }
      let validatePass = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('Enter password'))
        } else {
          if (this.form.checkPass !== '') {
            this.$refs.form.validateField('checkPass')
          }
          callback()
        }
      }
      return {
        emailSignInDialog: false,
        form: {
          password: '',
          checkPass: '',
          email: ''
        },
        rules: {
          password: [{validator: validatePass, trigger: 'blur'}],
          email: [{validator: checkEmail, trigger: 'blur'}]
        },
        submitCount: 0 // for password reset
      }
    },
    methods: {
      submitForm(formName) {
        this.submitCount++
        this.$refs[formName].validate((valid) => {
          if (valid) {
            this.$store.dispatch('signInWithEmailAndPassword', {
              email: this.form.email,
              password: this.form.password
            })
          } else {
            return this.$store.dispatch('ERR', {message: 'Please, fill in the field correct!'})
          }
        })
      },
      isValidEmail(email) {
        return /^\S+@\S+\.\S+$/.test(email)
      },
      googleSignUp() {
        this.$store.dispatch('signInWithGoogle').then(() => {
          console.log('inside then statement on login');
        }).catch((e) => {
          console.log(e.message);
        })
      },
      resetPassword() {
        let email = document.getElementById('email').value
        this.$store.dispatch('resetPassword', email)
      }
    }
  }
</script>

<style scoped lang="scss">
  h2 {
    margin-top: 30px;
    margin-bottom: 40px;
    color: $color-info-dark;
  }

  #signin_card {
    position: relative;
    margin-top: 10px;
    height: 500px;
  }

  #havent_account {
    font-size: 16px;
    position: absolute;
    right: 30px;
    bottom: 10px;
  }
</style>
