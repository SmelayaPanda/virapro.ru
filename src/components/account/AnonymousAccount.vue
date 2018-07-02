<template>
  <el-row type="flex" justify="center">
    <el-col :xs="23" :sm="20" :md="15" :lg="13" :xl="12" type="flex" align="center">
      <div id="anonymous_card">
        <p id="greeting">
          Приветствуем!
        </p>
        <p>Вы зашли как анонимный пользователь</p>
        <p id="register_please">
          Войдите в аккаунт или зарегистрируйтесь для того чтобы управлять своими данными на других устройствах. <br>
          <span style="font-size: 12px;">( При регистрации все ваши текущие данные сохранятся )</span>
        </p>
        <br>
        <nuxt-link to="/account/signup">
          <el-button class="secondary_btn" style="width: 180px">
            Зарегистрироваться
          </el-button>
        </nuxt-link>
        <nuxt-link to="/account/signin">
          <el-button class="primary_btn" id="sign_in">
            Войти
          </el-button>
        </nuxt-link>
      </div>
    </el-col>
  </el-row>
</template>

<script>
  export default {
    name: 'AnonymousAccount'
  }
</script>

<style scoped lang="scss">
  #greeting {
    font-size: 20px;
    letter-spacing: 1px;
    background: linear-gradient(to right, $color-secondary-light 43%, $color-secondary 51%);
    color: $color-primary;
    -webkit-background-clip: text;
    margin-top: 20px;
    &:after {
      content: '';
      display: block;
      width: 120px;
      height: 3px;
      border-bottom: 2px solid $color-primary;
    }
  }

  #anonymous_card {
    padding: 15px;
    border-radius: 8px;
    color: $color-secondary;
  }

  #anonymous_icon {
    height: 80px;
    margin-top: 10px;
  }
  #sign_in {
    margin-left: 10px;
  }

  #register_please {
    font-weight: 300;
  }
</style>
