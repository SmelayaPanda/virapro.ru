<template>
  <div>
    <el-button id="add_product" @click="openDialog">
      <i :class="operation === 'add' ? 'el-icon-plus' : 'el-icon-edit'"></i>
    </el-button>

    <el-dialog
      id="update_product_dialog"
      :title="operation === 'add' ? 'Новый товар' : 'Редактировать товар'"
      :visible.sync="dialog"
      width="100%"
      :fullscreen="true">
      <el-row type="flex" justify="center">
        <el-col :span="20">
          <el-form ref="form" :model="product" :rules="rules" label-width="140px">
            <el-form-item label="Категория/Группа" prop="option">
              <el-cascader
                :options="$store.getters.PRODUCT_TREE"
                filterable
                placeholder="Выберите категорию"
                v-model="option">
              </el-cascader>
            </el-form-item>
            <el-form-item label="Название" prop="title">
              <el-input v-model="product.title" placeholder="( < 128 символов )" :maxlength="128"></el-input>
            </el-form-item>
            <el-form-item label="Описание" prop="description">
              <el-input
                v-model="product.description"
                type="textarea"
                placeholder="( < 1024 символов )"
                :autosize="{ minRows: 3, maxRows: 10}"
                :maxlength="1024">
              </el-input>
            </el-form-item>
            <!--SKU-->
            <el-form-item label-width="0">
              <el-col :span="12">
                <el-form-item label="Артикул" prop="SKU">
                  <el-input v-model="product.SKU" placeholder="( < 32 символов )" :maxlength="32"></el-input>
                </el-form-item>
                <el-form-item label="Размер" prop="size">
                  <el-input v-model="product.size" placeholder="( < 32 символов )" :maxlength="32">
                  </el-input>
                </el-form-item>
                <!--PRICE-->
                <el-form-item label="Цена" prop="price">
                  <el-input-number v-model="product.price" :min="0" :max="1000000"></el-input-number>
                  <b> RUB</b>
                </el-form-item>
                <el-form-item label="Количество" prop="totalQty">
                  <el-input-number v-model="product.totalQty" :min="0" :max="1000000"></el-input-number>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item label="Бренд" prop="brand">
                  <el-col type="flex" style="flex-wrap: wrap">
                    <el-select
                      value=""
                      filterable
                      no-match-text="Бренд отсутствует"
                      v-model="product.brand"
                      placeholder="Выберите бренд"
                      v-if="dictionaries.brands">
                      <el-option v-for="val in dictionaries.brands" :key="val" :label="val" :value="val"></el-option>
                    </el-select>
                  </el-col>
                </el-form-item>
                <!--COLOR-->
                <el-form-item label="Цвет" prop="color">
                  <el-select
                    value=""
                    filterable
                    no-match-text="Цвет отсутствует"
                    v-model="product.color"
                    placeholder="Выберите цвет"
                    v-if="dictionaries.colors">
                    <el-option v-for="val in dictionaries.colors" :key="val" :label="val" :value="val"></el-option>
                  </el-select>
                </el-form-item>
                <!--Origin Country-->
                <el-form-item label="Страна" prop="originCountry">
                  <el-select
                    value=""
                    filterable
                    no-match-text="Страна отсутствует"
                    v-model="product.originCountry"
                    placeholder="Выберите страну"
                    v-if="dictionaries.countries">
                    <el-option v-for="val in dictionaries.countries" :key="val" :label="val" :value="val"></el-option>
                  </el-select>
                </el-form-item>
                <!--Material-->
                <el-form-item label="Материал" prop="material">
                  <el-select
                    v-if="dictionaries.materials"
                    v-model="product.material"
                    value=""
                    filterable clearable
                    no-match-text="Материал отсутствует"
                    placeholder="Выберите материал">
                    <el-option v-for="val in dictionaries.materials" :key="val" :label="val" :value="val"></el-option>
                  </el-select>
                </el-form-item>
              </el-col>
            </el-form-item>
          </el-form>
          <el-row type="flex" justify="center" class="mt-3">
            <el-button v-if="operation === 'add'" @click="addNewProduct" type="success" :disabled="!isValidForm">
              Создать товар
            </el-button>
            <el-button v-else @click="editProduct" type="success" :disabled="!isValidForm">
              Сохранить
            </el-button>
            <el-button type="warning" @click="resetForm">Очистить форму</el-button>
            <el-button type="danger" @click="dialog = false">Отмена</el-button>
          </el-row>
        </el-col>
      </el-row>
    </el-dialog>
  </div>
</template>

<script>

  export default {
    name: 'AddProduct',
    props: {
      operation: {type: String, required: true},
      group: {type: String, required: true},
      category: {type: String, required: true},
      productId: {type: String}
    },
    data() {
      return {
        dialog: false,
        option: [this.group, this.category],
        product: {
          title: '',
          description: '',
          SKU: '',
          originCountry: '',
          material: '',
          size: '',
          brand: '',
          currency: 'RUB',
          price: 100,
          totalQty: 50,
          color: ''
        },
        rules: {
          title: [
            {required: true, message: 'Укажите название', trigger: 'blur'},
            {min: 4, max: 128, message: '(от 4 до 128 символов)', trigger: 'blur'}
          ],
          description: [{required: true, message: 'Заполните описание', trigger: 'blur'}],
          SKU: [{required: true, message: 'Укажите артикул', trigger: 'change'}],
          // size: [{ required: true, message: 'Укажите размер', trigger: 'change' }],
          brand: [{required: true, message: 'Укажите брэнд', trigger: 'change'}],
          color: [{required: true, message: 'Укажите цвет', trigger: 'change'}],
          originCountry: [{required: true, message: 'Укажите страну', trigger: 'change'}],
          material: [{required: true, message: 'Укажите материал', trigger: 'change'}],
          price: [{required: true, message: 'Укажите цену', trigger: 'change'}],
          totalQty: [{required: true, message: 'Укажите количество', trigger: 'change'}],
        },
        labelWidth: '140px'
      }
    },
    methods: {
      editProduct() {
        this.dialog = false
        this.$store.dispatch('editProduct', {...this.product}).then(() => {
          this.$refs.form.resetFields()
        })
      },
      addNewProduct() {
        let p = this.product;
        let data = {
          group: this.option[0],
          category: this.option[1],
          title: p.title,
          description: p.description,
          SKU: p.SKU,
          originCountry: p.originCountry,
          material: p.material ? p.material : '',
          size: p.size ? p.size : '',
          brand: p.brand,
          price: parseFloat(p.price),
          currency: p.currency,
          qty: 1, // for user cart
          totalQty: p.totalQty,
          color: p.color,
          creationDate: new Date()
        }
        console.log(data)
        this.dialog = false
        this.$store.dispatch('addNewProduct', data).then(() => {
            this.$refs.form.resetFields()
          })
      },
      resetForm() {
        this.$refs.form.resetFields();
      },
      openDialog () {
        this.dialog = true
        if (this.operation === 'edit') {
          this.product = this.$store.getters.products[this.productId]
        }
      }
    },
    computed: {
      isValidForm() {
        return this.product.title && this.product.description &&
          this.product.color && this.product.SKU && this.product.brand &&
          this.product.originCountry
      },
      dictionaries() {
        return this.$store.getters.dictionaries
      }
    }
  }
</script>

<style scoped lang="scss">
  #add_product {
    margin-left: 6px;
  }
</style>
