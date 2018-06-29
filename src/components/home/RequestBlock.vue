<template>
  <div id="request_wrap">
    <img src="~/static/home/mozaika_1.png" alt="Мозаика 1" id="mozaika_1">
    <img src="~/static/home/mozaika_2.png" alt="Мозаика 1" id="mozaika_2">
    <el-row id="request_form">
      <el-col :span="7">
        <h3>Вы всегда можете оставить заявку</h3>
        <p>Мы свяжемся с Вами в ближайшее время</p>
        <el-card id="request_card">
          <el-form>
            <el-form-item>
              <el-input
                placeholder="Ваше имя"
                v-model="form.name">
                <img slot="suffix" src="~/assets/icons/home/avatar.svg" alt="" id="avatar_img">
              </el-input>
            </el-form-item>
            <el-form-item>
              <el-input
                placeholder="Номер телефона"
                v-model="form.name">
                <img slot="suffix" src="~/assets/icons/home/phone_blue.svg" alt="" id="phone_img">
              </el-input>
            </el-form-item>
            <el-form-item>
              <el-input
                placeholder="Комментарий или вопрос"
                type="textarea"
                :autosize="{ minRows: 7, maxRows: 7}"
                v-model="form.comments">
              </el-input>
            </el-form-item>
            <el-button type="primary">Отправить</el-button>
          </el-form>
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
          name: '',
          phone: '',
          comments: ''
        }
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
      #avatar_img {
        height: 16px;
        width: 40px;
        margin-top: 12px;
      }
      #phone_img {
        height: 15px;
        width: 40px;
        margin-top: 12px;
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
  }
</style>
