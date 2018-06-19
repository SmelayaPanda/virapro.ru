<template>
  <no-ssr>
    <el-row type="flex" justify="start">
      <el-col :span="20">
        <div v-if="$store.getters.user && $store.getters.user.isAnonymous">
          <AnonymousAccount/>
        </div>
        <div v-if="$store.getters.user && !$store.getters.user.isAnonymous">
          <h1>User Data</h1>
          <p>{{ $store.getters.user.uid }}</p> <br>
          <p>{{ $store.getters.user.email }}</p>
          <p>{{ $store.getters.user.firstname }} {{ $store.getters.user.lastname }}</p>
          <el-button type="success" @click="$store.dispatch('logout')">Logout</el-button>
        </div>
      </el-col>
    </el-row>
  </no-ssr>
</template>

<script>
  import AnonymousAccount from "@/components/account/AnonymousAccount";
  export default {
    components: {AnonymousAccount}
  }
</script>
