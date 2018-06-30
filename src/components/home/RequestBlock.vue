<template>
  <div id="request_wrap">
    <img src="~/static/home/mozaika_1.png" alt="Мозаика 1" id="mozaika_1">
    <img src="~/static/home/mozaika_2.png" alt="Мозаика 1" id="mozaika_2">
    <el-row id="request_form">
      <el-col :span="7">
        <h3>Вы всегда можете оставить заявку</h3>
        <p>Мы свяжемся с Вами в ближайшее время</p>
        <el-card id="request_card">
          <el-form :model="form" ref="form">
            <el-form-item prop="user.firstname">
              <el-input type="text" placeholder="Ваше имя" v-model="form.user.firstname">
                <img slot="suffix" src="~/assets/icons/home/avatar.svg" alt="Имя" id="avatar_img">
              </el-input>
            </el-form-item>
            <el-form-item prop="user.phone">
              <no-ssr>
                <masked-input
                  v-model="form.user.phone"
                  class="el-input__inner"
                  required
                  mask="\+\7 (111) 111-11-11"
                  placeholder="Номер телефона"/>
              </no-ssr>
              <img src="~/assets/icons/home/phone_blue.svg" alt="Телефон" id="phone_img">
            </el-form-item>
            <el-form-item prop="comments.user">
              <el-input
                placeholder="Комментарий или вопрос"
                type="textarea"
                :autosize="{ minRows: 7, maxRows: 7}"
                v-model="form.comments.user">
              </el-input>
              <img src="~/assets/icons/home/two_speech.svg" alt="Комментарий" id="comments_img">
            </el-form-item>
          </el-form>
          <el-button @click="sendRequestForm" class="secondary_btn">Отправить</el-button>
        </el-card>
      </el-col>
      <el-col :span="6" align="left" style="position: relative">
        <div id="round_2"></div>
        <div id="round_1"></div>
        <img src="~/static/home/man.png" alt="Мозаика 1" id="man_img">
      </el-col>
    </el-row>
  </div>
</template>

<script>
  export default {
    name: 'RequestBlock',
    data() {
      return {
        form: {
          user: {firstname: '', phone: ''},
          comments: {user: '', admin: ''}
        }
      }
    },
    methods: {
      async sendRequestForm() {
        if (!this.form.user.firstname) {
          this.$message({type: 'info', showClose: true, message: 'Укажите имя', duration: 5000})
          return
        }
        if (!this.isValidPhone) {
          this.$message({type: 'info', showClose: true, message: 'Укажите телефон', duration: 5000})
          return
        }
        await this.$store.dispatch('sendCallRequests', this.form)
        await this.$refs.form.resetFields()
      }
    },
    computed: {
      isValidPhone() {
        return this.form.user.phone.replace(/[^0-9]/g, '').length === 11
      }
    }
  }
</script>

<style scoped lang="scss">
  #request_wrap {
    position: relative;
    height: 600px;
  }

  #mozaika_1 {
    height: 300px;
    position: absolute;
    right: 0;
    top: -5px;
  }

  #mozaika_2 {
    height: 300px;
    position: absolute;
    left: 0;
    bottom: -60px;
  }

  #request_form {
    display: flex;
    justify-content: center;
    text-align: center;
    padding-top: 20px;

    h3 {
      font-size: 24px;
      color: $color-primary;
    }
    p {
      color: $color-primary;
      font-size: 13px;
      font-weight: 300;
      margin-top: -15px;
    }

    #request_card {
      background: $color-primary-light;
      height: 400px;
      width: 340px;
      margin: 0 auto;
      padding-top: 15px;
      @include primaryShadow;
      #avatar_img {
        height: 16px;
        width: 40px;
        margin-top: 12px;
      }
      #phone_img, #comments_img {
        z-index: 10;
        position: absolute;
        height: 15px;
        width: 40px;
        top: 13px;
        right: 5px;
      }
      #comments_img {
        height: 18px;
      }
      #chat_img {
        height: 18px;
        width: 40px;
        margin-top: 11px;
      }
    }
  }

  #man_img {
    position: absolute;
    bottom: -150px;
    left: -8vw;
    height: 600px;
  }

  #round_1 {
    position: absolute;
    top: 60px;
    width: 400px;
    height: 400px;
    border-radius: 50%;
    background: $color-primary;
    -webkit-box-shadow: 0px 10px 12px 0px rgba(1, 94, 172, .7);
    -moz-box-shadow: 0px 10px 12px 0px rgba(1, 94, 172, .7);
    box-shadow: 0px 10px 12px 0px rgba(1, 94, 172, .7);
  }

  #round_2 {
    position: absolute;
    bottom: -100px;
    margin-left: 170px;
    width: 300px;
    height: 300px;
    border-radius: 50%;
    background: $color-primary-light;
    -webkit-box-shadow: 10px 13px 21px -9px rgba(99,185,250,0.56);
    -moz-box-shadow: 10px 13px 21px -9px rgba(99,185,250,0.56);
    box-shadow: 10px 13px 21px -9px rgba(99,185,250,0.56);
  }
</style>
