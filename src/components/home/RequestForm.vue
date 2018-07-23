<template>
  <div id="form">
    <el-form :model="form" ref="form">
      <el-form-item prop="user.firstname">
        <input title="Ваше имя" placeholder="Ваше имя" v-model="form.user.firstname" type="text"/>
        <img src="~/assets/icons/home/avatar.svg" alt="Имя" id="avatar_img">
      </el-form-item>
      <el-form-item prop="user.phone">
        <no-ssr>
          <masked-input
            title="Номер телефона"
            placeholder="Номер телефона"
            v-model="form.user.phone"
            class="el-input__inner"
            required
            mask="\+\7 (111) 111-11-11"/>
        </no-ssr>
        <img src="~/assets/icons/home/phone_blue.svg" alt="Телефон" id="phone_img">
      </el-form-item>
      <el-form-item prop="comments.user">
        <textarea
          title="Комментарий или вопрос"
          placeholder="Комментарий или вопрос"
          id="user_comments"
          rows="7"
          v-model="form.comments.user">
        </textarea>
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
      sendRequestForm(service) {
        if (!this.form.user.firstname) {
          this.$store.commit('ERR', 'Укажите имя')
          if (!service) {
            this.$message({showClose: true, message: 'Укажите имя', duration: 5000})
          }
          return
        }
        if (!this.isValidPhone) {
          this.$store.commit('ERR', 'Укажите телефон')
          if (!service) {
            this.$message({showClose: true, message: 'Укажите телефон', duration: 5000})
          }
          return
        }
        if (service) {
          this.form.service = service
          this.$store.dispatch('USER_EVENT', 'Успешный заявка с услугой')
        } else {
          this.$store.dispatch('USER_EVENT', 'Успешная заявка')
        }
        this.$store.dispatch('sendCallRequests', this.form)
        this.$refs.form.resetFields()
        if (service) {
          this.$bus.$emit('isSentServiceForm')
          this.$store.commit('ERR', '')
        }
      }
    },
    computed: {
      isValidPhone() {
        return this.form.user.phone.replace(/[^0-9]/g, '').length === 11
      }
    },
    created() {
      this.$bus.$on('sendRequestForm', (service) => {
        this.sendRequestForm(service)
      })
    }
  }
</script>

<style lang="scss" scoped>
  input, textarea {
    -webkit-appearance: none;
    border-radius: 4px;
    border: 1px solid #dcdfe6;
    -webkit-box-sizing: border-box;
    box-sizing: border-box;
    color: #606266;
    display: inline-block;
    font-size: inherit;
    height: 40px;
    line-height: 40px;
    outline: none;
    padding: 0 15px;
    -webkit-transition: border-color .2s cubic-bezier(.645,.045,.355,1);
    transition: border-color .2s cubic-bezier(.645,.045,.355,1);
    width: 100%;
    &::placeholder {
      font-size: 14px;
      color: rgba(79, 82, 89, 0.53);
      font-weight: 400;
    }
  }

  textarea {
    height: 150px;
  }

  #form {
  }

  #avatar_img {
    position: absolute;
    top: 1px;
    right: 5px;
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
