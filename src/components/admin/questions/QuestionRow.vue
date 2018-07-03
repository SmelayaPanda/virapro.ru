<template>
  <el-card style="margin-bottom: 3px;" :body-style="{padding: '10px'}">
    <el-row class="question">
      <el-col style="width: 90px" align="center">
        <el-progress :width="74" type="circle"
                     :percentage="q.counters.yes.length * 100 / (q.counters.yes.length + q.counters.no.length)">
        </el-progress>
        <el-popover
          placement="top"
          trigger="hover"
          width="220"
          v-model="popover">
          <div style="margin: 12px;">
            <p>{{ q.counters.yes.length }} - да / {{ q.counters.no.length }} - нет</p>
          </div>
          <div slot="reference">
            <el-tag slot="reference" type="success" size="small">
              {{ q.counters.yes.length }} / {{ q.counters.no.length }}</el-tag>
          </div>
        </el-popover>
      </el-col>
      <el-col :span="6" :offset="1">
        <p>{{ q.title }}</p>
        <el-tag type="success" size="small">{{ q.id }}</el-tag>
      </el-col>
      <el-col :span="14">{{ q.description }}</el-col>
      <el-col :span="3">
        <!--OPERATION-->
      </el-col>
    </el-row>
  </el-card>
</template>
<script>
  export default {
    name: 'QuestionRow',
    props: {
      q: {type: Object, required: true}
    },
    data() {
      return {
        popover: false
      }
    }
  }
</script>
<style scoped lang="scss">

  .question {
    display: flex;
    justify-content: center;
    align-items: center;
  }
</style>
