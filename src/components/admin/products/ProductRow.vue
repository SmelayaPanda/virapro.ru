<template>
  <div id="product_row_wrap">
    <el-row id="product_row">
      <el-col style="width: 64px">
        <el-button
          :icon="openInfo ? 'el-icon-arrow-down' : 'el-icon-arrow-right'"
          circle plain @click="openInfo = !openInfo">
        </el-button>
      </el-col>
      <el-col style="width: 74px"><img :src="p.img_0.thumbnail" height="40px" width="auto"></el-col>
      <el-col style="width: 100px">
        <el-tag size="small" type="success">{{ p.SKU }}</el-tag>
      </el-col>
      <el-col :span="10" class="product_title">{{ p.title }}</el-col>
      <el-col :span="2">{{ p.price }} &nbsp;&#8381</el-col>
      <el-col :span="2">{{ p.totalQty }}</el-col>
      <AddEditProduct :productId="p.productId" operation="edit" :group="p.group" :category="p.category"/>
      <EditProductImage :productId="p.productId"/>
      <DeleteProduct :productId="p.productId"/>
    </el-row>
    <el-row v-if="openInfo" id="expand_description">
      <p>ИД:
        <el-tag type="success" size="small">{{ p.productId }}</el-tag>
      </p>
      <p>Описание: {{ p.description }}</p>
      <p>Цвет: {{ p.color }}</p>
      <p>Материал: {{ p.material }}</p>
    </el-row>
  </div>
</template>
<script>
  import DeleteProduct from "./crud/DeleteProduct";
  import AddEditProduct from "./crud/AddEditProduct";
  import EditProductImage from "./crud/EditProductImage";

  export default {
    name: 'ProductRow',
    components: {EditProductImage, AddEditProduct, DeleteProduct},
    props: {
      p: {type: Object, required: true}
    },
    data() {
      return {
        openInfo: false
      }
    }
  }
</script>
<style scoped lang="scss">
  #product_row_wrap {
    font-size: 14px;
    color: $color-secondary
  }

  #product_row {
    display: flex;
    justify-content: start;
    align-items: center;
  }

  .product_title {
    padding-right: 5px;
  }

  #expand_description {
    margin-top: 20px;
    margin-left: 10px;
  }
</style>
