<template>
  <div id="form">
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
  </div>
</template>
<script>
  export default {
    name: 'RequestForm',
    data() {
      return {
        form: {
          user: {firstname: '', phone: ''},
          comments: {user: '', admin: ''}
        }
      }
    },
    methods: {
      async sendRequestForm(service) {
        if (!this.form.user.firstname) {
          this.$message({type: 'info', showClose: true, message: 'Укажите имя', duration: 5000})
          return
        }
        if (!this.isValidPhone) {
          this.$message({type: 'info', showClose: true, message: 'Укажите телефон', duration: 5000})
          return
        }
        if (service) {
          this.form.service = service
        }
        console.log(this.form)
        await this.$store.dispatch('sendCallRequests', this.form)
        await this.$refs.form.resetFields()
        if (service) {
          this.$bus.$emit('isSentServiceForm')
        }
      }
    },
    computed: {
      isValidPhone() {
        return this.form.user.phone.replace(/[^0-9]/g, '').length === 11
      }
    },
    created () {
      this.$bus.$on('sendRequestForm', (service) => {
        this.sendRequestForm(service)
      })
    }
  }
</script>

<style lang="scss" scoped>
  #form {
  }

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
</style>
