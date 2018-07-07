<template>
  <div style="margin: 10px;">
    <el-row type="flex" justify="center" align="middle">
      <el-button @click="onPickFile">
        <p>Ваше фото</p>
        <i class="el-icon-picture-outline" style="transform: scale(1.7)"></i>
      </el-button>
    </el-row>
    <input type="file" style="display: none;" ref="fileInput" accept="image/*" @change="onFilePicked">
    <el-row type="flex" justify="center">
      <img v-if="imageUrl" :src="imageUrl" alt="Ваш аватар" height="120" style="margin-top: 7px;">
    </el-row>
  </div>
</template>
<script>
export default {
  name: 'UploadReviewAvatar',
  data () {
    return {
      imageUrl: '',
      image: null
    }
  },
  methods: {
    onPickFile () {
      this.$refs.fileInput.click()
    },
    onFilePicked (event) {
      const files = event.target.files // files[0] because it may be multiselect of files, take first
      if (files[0].name.indexOf('.') <= 0) { // file have an extension
        return alert('Вы добавляете файл без расширения!')
      }
      if (files[0].size > 1500000) {
        return alert('Размер файла не может превышать 1.5 MB!')
      }
      const fileReader = new FileReader() // native js future for client file work
      fileReader.addEventListener('load', () => {
        this.imageUrl = fileReader.result
      })
      fileReader.readAsDataURL(files[0])
      this.image = files[0]
      this.$emit('fileUploaded', this.image)
    }
  }
}
</script>
