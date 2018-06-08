<template>
  <el-row type="flex" justify="center">
    <el-col :xs="24" :sm="14" :md="12" :lg="10" :xl="8">
      <el-card id="signup_card">
        <el-alert
          v-if="$store.state.ERR"
          :description="$store.state.ERR.message"
          title="Error" type="error" show-icon>
        </el-alert>
        <h2>Signup</h2>
        <el-form :model="form" status-icon :rules="rules" auto-complete="on" ref="form">
          <el-form-item label="Firstname" prop="firstname">
            <el-input type="text" id="firstname" :autofocus="true" v-model="form.firstname" auto-complete="on"/>
          </el-form-item>
          <el-form-item label="Lastname" prop="lastname">
            <el-input type="text" id="lastname" :autofocus="true" v-model="form.lastname" auto-complete="on"/>
          </el-form-item>
          <el-form-item label="Email" prop="email">
            <el-input type="email" :autofocus="true" v-model="form.email" auto-complete="on"></el-input>
          </el-form-item>
          <el-form-item label="Password" prop="password">
            <el-input type="password" v-model="form.password" auto-complete="off"></el-input>
          </el-form-item>
          <el-form-item label="Password confirmation" prop="checkPass">
            <el-input type="password" v-model="form.checkPass" auto-complete="off"></el-input>
          </el-form-item>
          <el-form-item>
            <el-button
              type="danger mt-2"
              :disabled="$store.getters.LOADING || !isValidForm"
              @click="submitForm('form')">
              Go!
            </el-button>
            <el-button @click.native="googleSignUp">Google Sign In</el-button>
          </el-form-item>
        </el-form>
        <router-link to="/account/signin">
          <el-button type="text">Have an account?</el-button>
        </router-link>
      </el-card>
    </el-col>
  </el-row>
</template>

<script>
  export default {
    name: 'signin',
    data() {
      let notEmptyString = (rule, value, callback) => {
        if (!value) {
          callback(new Error('Fill in the field'))
        } else {
          callback()
        }
      }
      let checkEmail = (rule, value, callback) => {
        if (!value) {
          return callback(new Error('Enter email'))
        }
        setTimeout(() => {
          if (!this.isValidEmail(value)) {
            callback(new Error('Email is wrong'))
          } else {
            callback()
          }
        }, 1000)
      }
      let validatePass = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('Enter password'))
        } else if (value.length < 6) {
          callback(new Error('Password length more than 6 symbols'))
        } else {
          if (this.form.checkPass !== '') {
            this.$refs.form.validateField('checkPass')
          }
          callback()
        }
      }
      let validateConfPass = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('Confirm the password'))
        } else if (value !== this.form.password) {
          callback(new Error('Passwords do not match!'))
        } else {
          callback()
        }
      }
      return {
        form: {
          password: '',
          checkPass: '',
          email: '',
          firstname: '',
          lastname: ''
        },
        rules: {
          firstname: [{validator: notEmptyString, trigger: 'blur'}],
          lastname: [{validator: notEmptyString, trigger: 'blur'}],
          password: [{validator: validatePass, trigger: 'blur'}],
          checkPass: [{validator: validateConfPass, trigger: 'blur'}],
          email: [{validator: checkEmail, trigger: 'blur'}]
        }
      }
    },
    methods: {
      submitForm(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            this.$store.dispatch('signUpWithEmailAndPassword', {
              email: this.form.email,
              password: this.form.password,
              firstname: this.form.firstname,
              lastname: this.form.lastname
            })
          } else {
            return this.$store.dispatch('ERR', {message: 'Пожалуйста, заполните поля корректно!'})
          }
        })
      },
      isValidEmail: function (email) {
        return /^\S+@\S+\.\S+$/.test(email)
      },
      googleSignUp() {
        this.$store.dispatch('signInWithGoogle').then(() => {
          console.log('inside then statement on login');
        }).catch((e) => {
          console.log(e.message);
        })
      }
    },
    computed: {
      isValidForm() {
        return this.form.firstname && this.form.lastname &&
          this.form.password.length > 5 && this.form.password === this.form.checkPass &&
          this.isValidEmail(this.form.email)
      }
    }
  }
</script>

<style scoped>
  #signup_card {
    margin-top: 10px;
  }
</style>
