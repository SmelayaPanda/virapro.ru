<template>
    <div>
      <h2 class="title">Sign In with Google</h2>
      <el-button class="signIn" @click.native="googleSignUp">Google Sign In</el-button>
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
