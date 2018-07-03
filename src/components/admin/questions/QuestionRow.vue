<template>
  <el-card style="margin-bottom: 3px;" :body-style="{padding: '10px'}">
    <el-row class="question">
      <el-col style="width: 90px" align="center">
        <el-progress
          :width="74" type="circle"
          :percentage="q.counters.yes.length + q.counters.no.length ?
                      q.counters.yes.length * 100 / (q.counters.yes.length + q.counters.no.length) : 0">
        </el-progress>
        <el-popover
          trigger="hover"
          width="400"
          v-model="popover">
          <div style="margin: 12px;">
            <p>{{ q.counters.yes.length }} - да / {{ q.counters.no.length }} - нет</p>
            <br>
            <div style="font-size: 12px;">
              <p>ИД Пользователей:</p>
              <hr>
              <i class="el-icon-plus"></i>
              <ul key="yes">
                <li v-for="userId in q.counters.yes" :key="userId">{{ userId }}</li>
              </ul>
              <hr>
              <i class="el-icon-minus"></i>
              <ul key="no">
                <li v-for="userId in q.counters.no" :key="userId">{{ userId }}</li>
              </ul>
            </div>
          </div>
          <div slot="reference">
            <el-tag slot="reference" type="success" size="small">
              {{ q.counters.yes.length }} / {{ q.counters.no.length }}
            </el-tag>
          </div>
        </el-popover>
      </el-col>
      <el-col :span="6" :offset="1">
        <p>{{ q.title }}</p>
        <el-tag type="success" size="small">{{ q.id }}</el-tag>
      </el-col>
      <el-col :span="13">{{ q.description }}</el-col>
      <el-col :span="2">
        <AddEditQuestion operation="edit" :question="q"></AddEditQuestion>
        <DeleteQuestion :id="q.id"></DeleteQuestion>
      </el-col>
    </el-row>
  </el-card>
</template>
<script>
  import AddEditQuestion from "./AddEditQuestion";
  import DeleteQuestion from "./DeleteQuestion";

  export default {
    name: 'QuestionRow',
    components: {DeleteQuestion, AddEditQuestion},
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
