<template>
  <el-radio-group v-model="answer" @change="getAnswer" size="small">
    <el-radio-button :label="true">Да</el-radio-button>
    <el-radio-button :label="false">Нет</el-radio-button>
  </el-radio-group>
</template>
<script>
  export default {
    name: 'OneQuestionAnswer',
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
        let cnt = this.item.counters;
        let userId = this.$store.getters.user.uid;
        if (val) {
          if (cnt.yes.indexOf(userId) === -1) cnt.yes.push(userId)
          if (cnt.no.indexOf(userId) !== -1) cnt.no.splice(cnt.no.indexOf(userId), 1)
        } else {
          if (cnt.no.indexOf(userId) === -1) cnt.no.push(userId)
          if (cnt.yes.indexOf(userId) !== -1) cnt.yes.splice(cnt.yes.indexOf(userId), 1)
        }
        console.log(this.item)
        this.$store.dispatch('updateQuestion', {
          id: this.item.id,
          updateData: this.item
        })
      }
    },
    created() {
      console.log(this.item);
      if (this.item.counters.yes.indexOf(this.$store.getters.user.uid) !== -1) {
        this.answer = true
      } else if (this.item.counters.no.indexOf(this.$store.getters.user.uid) !== -1) {
        this.answer = false
      } else {
        this.answer = ''
      }
    }
  }
</script>
