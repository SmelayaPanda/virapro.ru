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
      <el-radio-group v-model="order.status" id="order_status" size="small">
        <el-radio-button
          v-for="status in $store.getters.ORDER_STATUSES"
          :key="status.value"
          :label="status.value">{{ status.label }}
        </el-radio-button>
      </el-radio-group>
      <p align="center">Оплата</p>
      <el-radio-group v-model="order.payment.ending" id="payment_status" size="small">
        <el-radio-button
          v-for="ending in $store.getters.PAYMENT_ENDING"
          :key="ending.value"
          :label="ending.value">{{ ending.label }}
        </el-radio-button>
      </el-radio-group>
      <p>Коментарии (не обязательно):</p>
      <section class="container">
        <div class="quill-editor"
             v-model="order.comments.admin"
             v-quill:myQuillEditor="editorOption">
        </div>
      </section>
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
        oldStatus: '',
        editorOption: {
          // some quill options
          modules: {
            toolbar: [
              ['bold', 'italic', 'underline', 'strike'],
              ['blockquote', 'code-block'],
              [{'list': 'ordered'}, {'list': 'bullet'}],
              [{'script': 'sub'}, {'script': 'super'}],
              [{'indent': '-1'}, {'indent': '+1'}],
              ['clean'],
              ['link'],
              [{'align': []}],
              [{'color': []}, {'background': []}],
              [{'header': [2, 3, 4, 5, 6, false]}]
            ]
          }
        }
      }
    },
    methods: {
      changeStatus() {
        this.dialog = false
        let obj = {
          status: this.order.status,
          'comments.admin': this.order.comments.admin,
          'payment.ending': this.order.payment.ending,
          ['history.' + this.order.status]: new Date().getTime()
        }
        if (this.oldStatus !== this.order.status) {
          obj.isChangedStatus = true
        }
        this.$store.dispatch('updateOrder', {id: this.orderId, updateData: obj})
      },
      openDialog () {
        this.oldStatus = this.order.status
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

<style scoped lang="scss">
  #order_status,
  #payment_status {
    display: flex;
    justify-content: center;
  }

  .container {
    width: 100%;
    margin: 0 auto;
    .quill-editor {
      min-height: 200px;
      max-height: 400px;
      overflow-y: auto;
    }
  }
</style>
