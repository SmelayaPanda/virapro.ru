<template>
  <el-row type="flex" justify="start">
    <el-col :span="20">
      <no-ssr>
        <div v-if="$store.getters.USER">
          <h1>User Data</h1>
          <p>{{ $store.getters.USER.email }}</p>
          <p>{{ $store.getters.USER.firstname }} {{ $store.getters.USER.lastname }}</p>
          <el-button type="success" @click="$store.dispatch('logout')">Logout</el-button>
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
    </el-col>
  </el-row>
</template>

<script>
  export default {}
</script>
