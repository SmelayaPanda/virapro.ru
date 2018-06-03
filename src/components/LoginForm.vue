<template>
    <div>
      <h2 class="title">Sign In with Google</h2>
      <el-button class="signIn mb-2" @click.native="googleSignUp">Google Sign In</el-button>
  </div>
</template>

<script>
  export default {
    data () {
      return {
        formEmail: '',
        formPassword: ''
      }
    },
    methods: {
      emailLogin () {
        this.$store.dispatch('signInWithEmail', {
          email: this.formEmail,
          password: this.formPassword
        }).then(() => {
          this.formEmail = ''
          this.formPassword = ''
        }).catch((e) => {
          console.log(e.message);
        })
      },
      googleSignUp () {
        this.$store.dispatch('signInWithGoogle').then(() => {
          console.log('inside then statement on login');
        }).catch((e) => {
          console.log(e.message);
        })
      }
    }
  }
</script>

<style lang="css">
  .signIn {
  }
</style>
