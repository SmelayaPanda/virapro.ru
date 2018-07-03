<template>
  <el-col style="width: 55px">
    <el-popover
      placement="top"
      width="220"
      v-model="deletePopover">
      <div style="margin: 12px;">
        <p style="text-align:left;">Вы действительно хотите удалить вопрос?</p>
        <div style="text-align: right; margin: 0">
          <el-button size="mini" type="text" @click="deletePopover = false">Отмена</el-button>
          <el-button type="danger" size="mini" @click="deleteQuestion">Удалить</el-button>
        </div>
      </div>
      <el-button slot="reference" icon="el-icon-delete"></el-button>
    </el-popover>
  </el-col>
</template>
<script>
  export default {
    name: 'DeleteQuestion',
    props: {
      id: {type: String, required: true}
    },
    data() {
      return {
        deletePopover: false
      }
    },
    methods: {
      deleteQuestion() {
        this.$store.dispatch('deleteQuestion', this.id)
      }
    }
  }
</script>
