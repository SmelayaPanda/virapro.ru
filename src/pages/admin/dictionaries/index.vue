<template>
  <div align="left" :key="dictinaryKey">
    <p id="dictionary_info">* Статические данные общие для всей системы</p>
    <div v-for="(prop, idx) in $store.getters.DYNAMIC_PROPS" :key="idx">
      <dictionary-subject :title="prop.label" :name="idx" :key="idx" :type="prop.type"/>
    </div>
  </div>
</template>

<script>
  import DictionarySubject from "@/components/admin/dictionaries/DictionarySubject";
  export default {
    name: "index",
    components: {DictionarySubject},
    layout: 'admin',
    data () {
      return {
        dictinaryKey: '1'
      }
    },
    created () {
      this.$store.dispatch('fetchDictionaries').then(() => {
        this.dictinaryKey = new Date().getTime()
      })
    }
  }
</script>

<style scoped>
  #dictionary_info {
    font-size: 12px;
    margin-top: 0;
  }
</style>
