<template>
  <no-ssr>
    <el-row id="account">
      <el-col :span="16">
        <div v-if="$store.getters.user && $store.getters.user.isAnonymous">
          <AnonymousAccount/>
        </div>
        <div v-if="$store.getters.user && !$store.getters.user.isAnonymous" id="real_account">
          <h1>Аккаунт</h1>
          <span id="uid">ИД пользователя: </span><el-tag type="success" size="small">{{ $store.getters.user.uid }}</el-tag> <br>
          <p id="name">{{ $store.getters.user.firstname }} {{ $store.getters.user.lastname }}</p>
          <p id="email">{{ $store.getters.user.email }}</p>
          <el-button type="success" @click="$store.dispatch('logout')">Выйти</el-button>
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

<style lang="scss" scoped>
  #account {
    display: flex;
    justify-content: center;
  }
  #real_account {
    h1 {
      color: $color-primary;
    }
    #uid {
      font-size: 13px;
      color: $color-info;
    }
    #name {
      color: $color-secondary;
      font-weight: 500;
    }
    #email {
      color: $color-secondary;
    }
  }
</style>
