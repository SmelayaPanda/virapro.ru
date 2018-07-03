<template>
  <div>
    <el-dialog
      title="Заказать услугу"
      center
      close-on-press-escape
      :visible.sync="dialog"
      width="500px">
      <h3>{{ service.title }}</h3>
      <p>{{ service.description }}</p>
      <request-form></request-form>
      <el-row type="flex" justify="center">
        <el-button @click="$bus.$emit('sendRequestForm', service.value)" class="secondary_btn">
          Отправить
        </el-button>
      </el-row>
    </el-dialog>
  </div>
</template>

<script>
  import RequestForm from "../home/RequestForm";

  export default {
    name: "OrderServiceDialog",
    components: {RequestForm},
    data() {
      return {
        dialog: false,
        service: ''
      }
    },
    methods: {
      sendRequestForm(service) {
        this.$bus.$emit('sendRequestForm', service)
      }
    },
    created() {
      this.$bus.$on('openOrderServiceDialog', (val) => {
        if (this.$store.getters.SERVICE_TYPES[val]) {
          this.service = this.$store.getters.SERVICE_TYPES[val]
        }
        this.dialog = true
      })
      this.$bus.$on('isSentServiceForm', () => {
        this.dialog = false
      })
    }
  }
</script>

<style scoped>
</style>
