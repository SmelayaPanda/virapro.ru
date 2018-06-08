<template>
  <div align="left">
    <p id="dictionary_info">* Статические, расширяемые, общие для всей системы данные</p>
    <dictionary-subject title="Бренд" name="brands" key="brands"/>
    <dictionary-subject title="Цвет" name="colors" key="colors"/>
    <dictionary-subject title="Страна" name="countries" key="countries"/>
    <dictionary-subject title="Материал" name="materials" key="materials"/>
  </div>
</template>

<script>
  import DictionarySubject from "@/components/admin/dictionaries/DictionarySubject";
  export default {
    name: "index",
    components: {DictionarySubject},
    layout: 'admin',
    created () {
      this.$store.dispatch('fetchDictionaries')
    }
  }
</script>

<style scoped>
  #dictionary_info {
    font-size: 12px;
    margin-top: 0;
  }
</style>
