<template>
  <div>
    <el-button @click="dialogFormVisible = true">
      <i class="el-icon-edit"></i>
    </el-button>

    <el-dialog
      title="Редактировать товар"
      :visible.sync="dialogFormVisible"
      width="100%"
      center
      :fullscreen="true">
      <el-row type="flex" justify="center">
        <el-col :span="20">
          <el-form :model="product">
            <el-form-item label="Название" :label-width="formLabelWidth">
              <el-input
                v-model="product.title"
                placeholder="( < 100 символов)"
                :maxlength="100">
              </el-input>
            </el-form-item>
            <el-form-item label="Описание" :label-width="formLabelWidth">
              <el-input
                v-model="product.description"
                type="textarea"
                placeholder="( < 500 символов)"
                :autosize="{ minRows: 3, maxRows: 7}"
                :maxlength="500">
              </el-input>
            </el-form-item>
            <!--SKU-->
            <el-row type="flex">
              <el-col :span="12">
                <el-form-item label="Артикул" :label-width="formLabelWidth">
                  <el-input
                    v-model="product.SKU"
                    placeholder="( < 20 символов )"
                    :maxlength="20">
                  </el-input>
                </el-form-item>
              </el-col>
              <!--Size-->
              <el-col :span="12">
                <el-form-item label="Размер" :label-width="formLabelWidth">
                  <el-input
                    v-model="product.size"
                    placeholder="( < 30 символов, не обязательное )"
                    :maxlength="30">
                  </el-input>
                </el-form-item>
              </el-col>
            </el-row>
            <!--BRAND-->
            <el-row type="flex" style="flex-wrap: wrap">
              <el-form-item label="Бренд" :label-width="formLabelWidth">
                <el-select
                  filterable
                  no-match-text="Бренд отсутствует"
                  v-model="product.brand"
                  placeholder="Бренд"
                  v-if="dictionaries.brands">
                  <el-option
                    v-for="val in dictionaries.brands"
                    :key="val"
                    :label="val"
                    :value="val">
                  </el-option>
                </el-select>
              </el-form-item>
              <!--COLOR-->
              <el-form-item label="Цвет" :label-width="formLabelWidth">
                <el-select
                  filterable
                  no-match-text="Цвет отсутствует"
                  v-model="product.color"
                  placeholder="Цвет"
                  v-if="dictionaries.colors">
                  <el-option
                    v-for="val in dictionaries.colors"
                    :key="val"
                    :label="val"
                    :value="val">
                  </el-option>
                </el-select>
              </el-form-item>
            </el-row>
            <!--Origin Country-->
            <el-row type="flex" style="flex-wrap: wrap">
              <el-form-item label="Страна" :label-width="formLabelWidth">
                <el-select
                  filterable
                  no-match-text="Страна отсутствует"
                  v-model="product.originCountry"
                  placeholder="Страна"
                  v-if="dictionaries.countries">
                  <el-option
                    v-for="val in dictionaries.countries"
                    :key="val"
                    :label="val"
                    :value="val">
                  </el-option>
                </el-select>
              </el-form-item>
              <!--Matrial-->
              <el-form-item label="Материал" :label-width="formLabelWidth">
                <el-select
                  filterable
                  clearable
                  no-match-text="Материал отсутствует"
                  v-model="product.material"
                  placeholder="( не обязательное )"
                  v-if="dictionaries.materials">
                  <el-option
                    v-for="val in dictionaries.materials"
                    :key="val"
                    :label="val"
                    :value="val">
                  </el-option>
                </el-select>
              </el-form-item>
            </el-row>
            <el-row type="flex" style="flex-wrap: wrap">
              <el-form-item label="Цена" :label-width="formLabelWidth">
                <el-input-number v-model="product.price" :min="0" :max="1000000">
                </el-input-number>
                <span class="mt-2 ml-2">RUB</span>
              </el-form-item>
              <el-form-item label="Количество" :label-width="formLabelWidth">
                <el-input-number v-model="product.totalQty" :min="0" :max="1000000"></el-input-number>
              </el-form-item>
            </el-row>
          </el-form>
          <el-row type="flex" justify="center" class="mt-3">
            <el-button
              @click="edit"
              class="success_a white--text"
              :disabled="!isValidForm">
              Сохранить
            </el-button>
            <el-button @click="dialogFormVisible = false">Отмена</el-button>
          </el-row>
        </el-col>
      </el-row>
    </el-dialog>
  </div>
</template>

<script>
export default {
  name: 'EditProduct',
  props: ['id'],
  data () {
    return {
      dialogFormVisible: false,
      formLabelWidth: '130px'
    }
  },
  methods: {
    edit () {
      let editObj = {
        productId: this.id,
        title: this.product.title,
        description: this.product.description,
        SKU: this.product.SKU,
        originCountry: this.product.originCountry,
        material: this.product.material ? this.product.material : '',
        size: this.product.size ? this.product.size : '',
        brand: this.product.brand,
        price: parseFloat(this.product.price),
        currency: 'RUB',
        qty: 1, // for user cart
        totalQty: this.product.totalQty,
        color: this.product.color,
        editDate: new Date()
      }
      this.dialogFormVisible = false
      this.$store.dispatch('editProduct', editObj)
    }
  },
  computed: {
    isValidForm () {
      return this.product.title && this.product.description &&
          this.product.color && this.product.SKU && this.product.brand &&
          this.product.originCountry
    },
    dictionaries () {
      return this.$store.getters.dictionaries
    },
    product () {
      return this.$store.getters.products[this.id]
    }
  }
}
</script>

<style scoped>

</style>
