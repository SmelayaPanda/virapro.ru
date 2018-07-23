<template>
  <el-radio-group v-model="answer" @change="getAnswer" size="small">
    <el-radio-button :label="true">Да</el-radio-button>
    <el-radio-button :label="false">Нет</el-radio-button>
  </el-radio-group>
</template>
<script>
  export default {
    name: 'OneQuestion',
    props: {
      item: {type: Object, required: true}
    },
    data() {
      return {
        answer: ''
      }
    },
    methods: {
      getAnswer(val) {
        if (val) {
          this.item.counters.yes.push(this.$store.getters.user.uid)
        } else {
          this.item.counters.no.push(this.$store.getters.user.uid)
        }
        console.log(this.item)
        this.$store.dispatch('updateQuestion', {
          id: this.item.id,
          updateData: this.item
        })
      }
    }
  }
</script>
