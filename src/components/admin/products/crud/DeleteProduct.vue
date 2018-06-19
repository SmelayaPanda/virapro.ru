<template>
  <el-col style="width: 55px">
    <el-popover
      placement="top"
      width="220"
      v-model="deletePopover">
      <div style="margin: 12px;">
        <p style="text-align:left;">Вы действительно хотите удалить товар?</p>
        <div style="text-align: right; margin: 0">
          <el-button size="mini" type="text" @click="deletePopover = false">Отмена</el-button>
          <el-button type="danger" size="mini" @click="deleteProduct">Удалить</el-button>
        </div>
      </div>
      <el-button slot="reference" icon="el-icon-delete"></el-button>
    </el-popover>
  </el-col>
</template>
<script>
  export default {
    name: 'DeleteProduct',
    props: {
      productId: {type: String, required: true}
    },
    data() {
      return {
        deletePopover: false
      }
    },
    methods: {
      deleteProduct() {
        this.$store.dispatch('deleteProduct', this.productId)
      }
    }
  }
</script>
