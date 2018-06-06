<template>
  <div>
    <el-button @click="dialogFormVisible = true">
      <i class="el-icon-picture-outline"></i>
    </el-button>
    <!--Image-->
    <el-dialog title="Фото продукта" :visible.sync="dialogFormVisible" width="100%" :fullscreen="true" center>
      <el-row type="flex" justify="center" class="mb-3" style="flex-wrap: wrap">
        <!--Image-->
        <!-- fileUploaded custom event from UploadProductImage.vue-->
        <upload-product-image @fileUploaded="loadFileData" img-name="img_0" img-btn-name="Главное" :cur-img="product.img_0.thumbnail"/>
        <upload-product-image @fileUploaded="loadFileData" img-name="img_1" img-btn-name="Доп. 1" :cur-img="product.img_1.thumbnail"/>
        <upload-product-image @fileUploaded="loadFileData" img-name="img_2" img-btn-name="Доп. 2" :cur-img="product.img_2.thumbnail"/>
        <upload-product-image @fileUploaded="loadFileData" img-name="img_3" img-btn-name="Доп. 3" :cur-img="product.img_3.thumbnail"/>
        <upload-product-image @fileUploaded="loadFileData" img-name="img_4" img-btn-name="Доп. 4" :cur-img="product.img_4.thumbnail"/>
      </el-row>
      <el-row type="flex" justify="center">
        <el-button
          @click="edit"
          class="success_a white--text"
          :disabled="!isValidForm">
          Сохранить
        </el-button>
        <el-button @click="dialogFormVisible = false">Отмена</el-button>
      </el-row>
    </el-dialog>
  </div>
</template>

<script>
import UploadProductImage from './UploadProductImage'

export default {
  name: 'EditProductImage',
  components: {UploadProductImage},
  props: ['id'],
  data () {
    return {
      dialogFormVisible: false,
      images: {},
      imageUrl: ''
    }
  },
  methods: {
    loadFileData (val) {
      // val.imgName="img_0 ... 4"
      this.images[val.imgName] = val.image
    },
    edit () {
      let editObj = {
        productId: this.id,
        images: this.images
      }
      this.dialogFormVisible = false
      this.$store.dispatch('editProductImage', editObj)
        .then(() => { // clear
          this.images = {}
          this.imageUrl = ''
        })
    }
  },
  computed: {
    isValidForm () {
      return true
    },
    product () {
      return this.$store.getters.products[this.id]
    }
  }
}
</script>

<style scoped>

</style>
