<template>
  <el-row type="flex" justify="center">
    <el-col :xs="24" :sm="14" :md="10" :lg="8" :xl="8">
      <el-card id="signin_card">
        <el-alert
          v-if="$store.state.ERR"
          :description="$store.state.ERR.message"
          title="Error" type="error" show-icon>
        </el-alert>
        <h2>Login</h2>
        <el-form :model="form" status-icon :rules="rules" auto-complete="on" ref="form">
          <el-form-item label="Email" prop="email">
            <el-input type="email" id="email" :autofocus="true" v-model="form.email" auto-complete="on"></el-input>
          </el-form-item>
          <el-form-item label="Password" prop="password">
            <el-input type="password" v-model="form.password" auto-complete="off"></el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="danger" :disabled="$store.getters.LOADING" @click="submitForm('form')">
              Go!
            </el-button>
          </el-form-item>
          <div v-if="submitCount > 1">
            <span class="primary--text ml-3">Forgot a password?</span>
            <p>Type the email in the field above and click:</p>
            <el-button type="danger" @click="resetPassword">Reset password</el-button>
          </div>
          <router-link to="/account/signup">
            <el-button type="text">Haven't account?</el-button>
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
            this.$store.dispatch('signUserIn', {
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
      resetPassword() {
        let email = document.getElementById('email').value
        this.$store.dispatch('resetPassword', email)
      }
    }
  }
</script>

<style scoped>
  #signin_card {
    margin-top: 10px;
  }
</style>
