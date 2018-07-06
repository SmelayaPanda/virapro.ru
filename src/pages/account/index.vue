<template>
  <no-ssr>
    <div>
      <RouterHeader>
        <div slot="title">АККАУНТ</div>
      </RouterHeader>
      <el-row id="account">
        <el-col :xs="23" :sm="20" :md="18" :lg="16" :xl="14">
          <div v-if="$store.getters.user && $store.getters.user.isAnonymous">
            <AnonymousAccount/>
          </div>
          <div v-if="$store.getters.user && !$store.getters.user.isAnonymous" id="real_account">
            <el-row type="flex" justify="start" style="flex-wrap: wrap">
              <el-col :xs="24" :sm="7" :md="7" :lg="7" :xl="7" align="center">
                <el-card id="user_avatar">
                  <img src="~/assets/icons/account/account.svg" height="200px" alt="Пользователь">
                </el-card>
              </el-col>
              <el-col :xs="24" :sm="17" :md="17" :lg="17" :xl="17">
                <el-card id="account_info_card">
                  <h4>Личные данные</h4>
                  <p>
                    <img src="~/assets/icons/account/fingerprint.svg" height="34px" alt="ИД">
                    <span class="user_prop">ИД:</span>
                    <span id="user_id">{{ $store.getters.user.uid }}</span>
                  </p>
                  <p>
                    <img src="~/assets/icons/account/profile.svg" height="32px" alt="Имя Фамилия">
                    <span class="user_prop">ФИО:</span>
                    <span v-if="$store.getters.user.firstname">
                      {{ $store.getters.user.firstname }} {{ $store.getters.user.lastname }}
                    </span>
                    <span v-else>-</span>
                  </p>
                  <p>
                    <img src="~/assets/icons/account/at.svg" height="32px" alt="Почта">
                    <span class="user_prop">E-mail:</span>
                    <span v-if="$store.getters.user.email">{{ $store.getters.user.email }}</span>
                    <span v-else>-</span>
                  </p>
                </el-card>
              </el-col>
            </el-row>
            <el-row type="flex" justify="start" style="flex-wrap: wrap">
              <el-col :xs="24" :sm="7" :md="7" :lg="7" :xl="7" align="center">
                <el-button style="margin-top: 20px;" class="primary_btn" @click="$store.dispatch('logout')">
                  Выйти
                </el-button>
              </el-col>
            </el-row>
          </div>
        </el-col>
      </el-row>
    </div>
  </no-ssr>
</template>

<script>
  import AnonymousAccount from "@/components/account/AnonymousAccount";
  import RouterHeader from "@/components/RouterHeader";

  export default {
    components: {RouterHeader, AnonymousAccount},
    async fetch({store, params}) {
      await store.dispatch('USER_EVENT', 'Страница: Аккаунт')
    }
  }
</script>

<style lang="scss" scoped>
  #account {
    display: flex;
    justify-content: center;
    flex-wrap: wrap;
    margin-top: 40px;
    margin-bottom: 40px;
  }

  #real_account {
    h1 {
      font-size: 28px;
      color: $color-primary;
    }
    #account_info_card {
      padding-left: 30px;
      width: 100%;
      height: 300px;
      font-size: 14px;
      font-weight: 300;
      @include primaryShadow;
      p {
        line-height: 32px;
      }
      img {
        margin-bottom: -10px;
      }
    }
  }

  .user_prop {
    font-size: 16px;
    font-weight: 500;
    padding-left: 8px;
    padding-right: 5px;
  }

  #user_avatar {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    height: 300px;
    @include primaryShadow;
  }

  #user_id {
    background: $color-primary-light-2;
    padding: 5px 10px;
    border-radius: 3px;
  }
</style>
