<template>
  <div>
    <no-ssr>
    <div v-if="$store.getters.USER">
      <h1>User Data</h1>
      <el-button type="success" @click="$store.dispatch('logout')">Logout</el-button>
      <br>
      <p>{{ $store.getters.USER.email }}</p>
      <p>{{ $store.getters.USER.firstname }}</p>
      <p>{{ $store.getters.USER.lastname }}</p>
    </div>
    <div v-else>
      <nuxt-link to="/account/signin">
        <el-button>Signin</el-button>
      </nuxt-link>
      <nuxt-link to="/account/signup">
        <el-button>Signup</el-button>
      </nuxt-link>
    </div>
    </no-ssr>
  </div>
</template>

<script>
  export default {
  }
</script>
