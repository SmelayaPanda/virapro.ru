<template>
  <div align="left">
    <p>* Статические, расширяемые, общие для всей системы данные</p>
    <dictionary-subject title="Бренд" name="brands" key="brands"></dictionary-subject>
    <dictionary-subject title="Цвет" name="colors" key="colors"></dictionary-subject>
    <dictionary-subject title="Страна" name="countries" key="countries"></dictionary-subject>
    <dictionary-subject title="Материал" name="materials" key="materials"></dictionary-subject>
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

</style>
