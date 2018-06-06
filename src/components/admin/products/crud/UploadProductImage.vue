<template>
  <div style="margin: 10px;">
    <el-row type="flex" justify="center" align="middle" class="mb-2">
      <el-button @click="onPickFile">
        <p>
          {{ this.imgBtnName }}
        </p>
        <i class="el-icon-picture-outline ml-2" style="transform: scale(1.7)"></i>
      </el-button>
    </el-row>
    <el-row style="text-align: center">
      <img :src="curImg" height="40px" width="auto" style="border-radius: 20px">
      <p v-if="curImg"><i class="el-icon-download"></i></p>
    </el-row>
    <input
      type="file"
      style="display: none;"
      ref="fileInput"
      accept="image/*"
      @change="onFilePicked">
    <el-row>
      <img :src="imageUrl" :width="150">
    </el-row>
  </div>
</template>
<script>
export default {
  name: 'AddProductImage',
  props: ['imgName', 'imgBtnName', 'curImg'],
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
        return alert('File name without extension!')
      }
      if (files[0].size > 1500000) {
        return alert('File size must be less than 1.5 MB!')
      }
      const fileReader = new FileReader() // native js future for client file work
      fileReader.addEventListener('load', () => {
        this.imageUrl = fileReader.result
      })
      fileReader.readAsDataURL(files[0])
      this.image = files[0]
      this.$emit('fileUploaded', {imgName: this.imgName, image: this.image})
    }
  }
}
</script>
