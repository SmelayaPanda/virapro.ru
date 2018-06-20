<template>
  <el-row type="flex" justify="start">
    <el-button @click="openDialog">
      <i class="el-icon-edit-outline"></i>
    </el-button>
    <el-dialog
      title="Изменить ордер"
      :visible.sync="dialog"
      width="100%"
      center>
      <p align="center">Статус ордера</p>
      <el-radio-group v-model="newStatus" id="order_status">
        <el-radio-button
          v-for="status in $store.getters.ORDER_STATUSES"
          :key="status.value"
          :label="status.value">{{ status.label }}</el-radio-button>
      </el-radio-group>
      <p align="center">Оплата</p>
      <el-radio-group v-model="paymentEnding" id="payment_status">
        <el-radio-button
          v-for="ending in $store.getters.PAYMENT_ENDING"
          :key="ending.value"
          :label="ending.value">{{ ending.label }}</el-radio-button>
      </el-radio-group>
      <!-- TODO: quill editor -->
      <p>Коментарии (не обязательно):</p>
      <el-input v-model="order.comments.admin"
                type="textarea"
                placeholder="( < 400 символов )"
                :autosize="{ minRows: 3, maxRows: 7}"
                :maxlength="400">
      </el-input>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialog = false">Отмена</el-button>
        <el-button type="danger" @click="changeStatus">Подтвердить</el-button>
      </span>
    </el-dialog>
  </el-row>
</template>

<script>
  export default {
    name: 'ChangeOrder',
    props: {
      orderId: {type: String, required: true}
    },
    data() {
      return {
        dialog: false,
        newStatus: '',
        paymentEnding: ''
      }
    },
    methods: {
      changeStatus() {
        this.dialog = false
        let obj = {
          status: this.newStatus,
          'comments.admin': this.order.comments.admin,
          'payment.ending': this.paymentEnding,
          ['history.' + this.newStatus]: new Date().getTime()
        }
        console.log(obj)
        this.$store.dispatch('updateOrder', {id: this.orderId, updateData: obj})
      },
      openDialog () {
        this.newStatus = this.order.status
        this.paymentEnding = this.order.payment.ending
        this.dialog = true
      }
    },
    computed: {
      order() {
        return this.$store.getters.orders[this.orderId]
      }
    }
  }
</script>

<style scoped>
  #order_status,
  #payment_status {
    display: flex;
    justify-content: center;
  }


</style>
