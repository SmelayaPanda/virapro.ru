<template>
  <div align="left" :key="dictinaryKey">
    <el-row style="display: flex; justify-content: start; flex-wrap: wrap">
      <el-col :span="12" v-for="(prop, idx) in $store.getters.DYNAMIC_PROPS" :key="idx">
        <dictionary-subject v-if="prop.type === 'String'" :title="prop.label" :name="idx" :key="idx"/>
      </el-col>
    </el-row>
    <p id="dictionary_info">* Словари - статические данные (общие для всей системы)</p>
  </div>
</template>

<script>
  import DictionarySubject from "@/components/admin/dictionaries/DictionarySubject";

  export default {
    name: "index",
    components: {DictionarySubject},
    layout: 'admin',
    data() {
      return {
        dictinaryKey: '1'
      }
    },
    created() {
      this.$store.dispatch('fetchDictionaries').then(() => {
        this.dictinaryKey = new Date().getTime()
      })
    }
  }
</script>

<style scoped lang="scss">
  #dictionary_info {
    font-size: 12px;
    margin-top: 10px;
    color: $color-info;
  }
</style>
