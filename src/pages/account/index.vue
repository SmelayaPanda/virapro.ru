<template>
  <no-ssr>
    <el-row type="flex" justify="start">
      <el-col :span="20">
        <div v-if="$store.getters.USER && $store.getters.USER.isAnonymous">
          <AnonymousAccount/>
        </div>
        <div v-if="$store.getters.USER && !$store.getters.USER.isAnonymous">
          <h1>User Data</h1>
          <p>{{ $store.getters.USER.email }}</p>
          <p>{{ $store.getters.USER.firstname }} {{ $store.getters.USER.lastname }}</p>
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
