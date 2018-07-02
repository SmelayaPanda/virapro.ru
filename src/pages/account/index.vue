<template>
  <no-ssr>
    <el-row id="account">
      <el-col :span="16">
        <div v-if="$store.getters.user && $store.getters.user.isAnonymous">
          <AnonymousAccount/>
        </div>
        <div v-if="$store.getters.user && !$store.getters.user.isAnonymous" id="real_account">
          <h1>Аккаунт</h1>
          <el-row type="flex" justify="start">
            <el-col :span="7">
              <el-card style="width: 100%; height: 300px;">
                <img src="~/assets/icons/account/user-placeholder.svg" alt="Пользователь">
              </el-card>
            </el-col>
            <el-col :span="17">
              <el-card id="account_info_card">
                <p id="uid"><img src="~/assets/icons/account/fingerprint.svg" alt="ИД">
                  ИД:
                  <el-tag type="success" size="small">{{ $store.getters.user.uid }}</el-tag>
                  <br>
                </p>
                <p id="name">
                  <img src="~/assets/icons/account/perm.svg" alt="Имя Фамилия">
                  <span v-if="$store.getters.user.firstname">
                    {{ $store.getters.user.firstname }} {{ $store.getters.user.lastname }}
                  </span>
                  <span v-else>-</span>
                </p>
                <p id="email">
                  <img src="~/assets/icons/account/email.svg" alt="Почта">
                  <span v-if="$store.getters.user.email">{{ $store.getters.user.email }}</span>
                  <span v-else>-</span>
                </p>
                <el-button class="primary_btn" @click="$store.dispatch('logout')">Выйти</el-button>
              </el-card>
            </el-col>
          </el-row>
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
    margin-top: 20px;
  }
  
  #real_account {
    h1 {
      font-size: 28px;
      color: $color-primary;
    }
    #account_info_card {
      width: 100%;
      height: 300px;
      #uid {
        font-size: 13px;
        color: $color-info;
        img {
          margin-bottom: -6px;
        }
      }
      #name {
        color: $color-secondary;
        font-weight: 500;
        img {
          margin-bottom: -5px;
        }
      }
      #email {
        color: $color-secondary;
        img {
          margin-bottom: -6px;
        }
        span {
          padding-left: 3px;
        }
      }
      button {
        position: absolute;
        right: 40px;
        bottom: 20px;
      }
    }
  }
</style>
