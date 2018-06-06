<template>
  <div id="product_row_wrap">
    <el-row id="product_row">
      <el-col style="width: 80px">
        <el-button
          :icon="openInfo ? 'el-icon-arrow-down' : 'el-icon-arrow-right'"
          circle plain @click="openInfo = !openInfo">
        </el-button>
      </el-col>
      <el-col style="width: 60px"><img :src="p.img_0.thumbnail" height="40px" width="auto"></el-col>
      <el-col style="width: 100px">
        <el-tag size="small" type="success">{{ p.SKU }}</el-tag>
      </el-col>
      <el-col :span="10" class="product_title">{{ p.title }}</el-col>
      <el-col :span="2">{{ p.price }} &nbsp;&#8381</el-col>
      <el-col :span="2">{{ p.totalQty }}</el-col>
      <el-col style="width: 57px">
        <el-button icon="el-icon-edit"></el-button>
      </el-col>
      <el-col style="width: 58px">
        <el-button icon="el-icon-picture-outline"></el-button>
      </el-col>
      <el-col style="width: 57px">
        <el-popover
          placement="top"
          width="160"
          v-model="deletePopover">
          <p style="text-align:left;">Вы действительно хотите удалить продукт?</p>
          <div style="text-align: right; margin: 0">
            <el-button size="mini" type="text" @click="deletePopover = false">cancel</el-button>
            <el-button type="primary" size="mini" @click="deletePopover = false">confirm</el-button>
          </div>
          <el-button slot="reference" icon="el-icon-delete"></el-button>
        </el-popover>
      </el-col>
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
  export default {
    name: 'ProductRow',
    props: {
      deletePopover: {},
      p: {}
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
