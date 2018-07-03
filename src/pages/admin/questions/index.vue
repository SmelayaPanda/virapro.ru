<template>
  <div>
    <el-row type="flex" style="align-items: center">
      <span id="questions_title">Бинарный опросник</span>
      <AddEditQuestion operation="add"/>
    </el-row>
    <div style="margin-top: 20px;">
      <QuestionRow v-for="q in questions" :key="q.id" :q="q"/>
    </div>
  </div>
</template>

<script>
  import QuestionRow from "@/components/admin/questions/QuestionRow";
  import AddEditQuestion from "@/components/admin/questions/AddEditQuestion";

  export default {
    name: "index",
    components: {AddEditQuestion, QuestionRow},
    layout: 'admin',
    computed: {
      questions() {
        return this.$store.getters.questions
      }
    },
    created() {
      this.$store.dispatch('fetchQuestions')
    }
  }
</script>

<style scoped lang="scss">
  #questions_title {
    font-size: 16px;
    color: $color-info;
    padding-right: 10px;
  }

</style>
