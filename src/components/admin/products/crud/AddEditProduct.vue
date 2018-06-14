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
                ref="catalog"
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
            <el-form-item label="Артикул" prop="SKU">
              <el-input v-model="product.SKU" placeholder="( < 32 символов )" :maxlength="32"></el-input>
            </el-form-item>
            <el-form-item label="Цена" prop="price">
              <el-input-number v-model="product.price" :min="0" :max="1000000"></el-input-number>
              <i> RUB</i>
            </el-form-item>
            <el-form-item label="Количество" prop="totalQty">
              <el-input-number v-model="product.totalQty" :min="0" :max="1000000"></el-input-number>
            </el-form-item>
            <el-form-item>
              <hr>
              <i id="additional_props">Дополнительные свойства указанной категории товара:</i>
            </el-form-item>
            <el-form-item label-width="0">
              <div :span="24" v-for="filter in dynamicFilters" :key="filter">
                <el-form-item
                  v-if="$store.getters.DYNAMIC_PROPS[filter].type === 'Number'"
                  :label="$store.getters.DYNAMIC_PROPS[filter].label"
                  :prop="filter" label-width="400px">
                  <el-input-number v-model="product[filter]" :min="0" :max="1000000"></el-input-number>
                </el-form-item>
                <el-form-item
                  v-else-if="$store.getters.DYNAMIC_PROPS[filter].type === 'String'"
                  :label="$store.getters.DYNAMIC_PROPS[filter].label"
                  :prop="filter" label-width="400px">
                  <el-select
                    v-model="product[filter]"
                    value="" filterable allow-create
                    default-first-option placeholder="Выбрать">
                    <el-option v-for="val in dictionaries[filter]" :key="val" :label="val" :value="val"></el-option>
                  </el-select>
                </el-form-item>
              </div>
            </el-form-item>
          </el-form>
          <el-row type="flex" justify="center" class="mt-3">
            <el-button v-if="operation === 'add'" @click="addNewProduct" type="success" :disabled="!isValidForm">
              Создать товар
            </el-button>
            <el-button v-else @click="editProduct" type="success" :disabled="!isValidForm">
              Сохранить
            </el-button>
            <el-button v-if="operation === 'add'" type="warning" @click="resetForm">Очистить форму</el-button>
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
        option: ['', ''],
        product: {
          title: '',
          description: '',
          SKU: '',
          price: 100,
          currency: 'RUB',
          totalQty: 50,
          qty: 1, // for user cart
          // DYNAMIC PROPERTIES
          country: '',
          brand: '',
          corpus_material: '',
          corpus_diameter: '',
          product_type: '',
          conditional_diameter: '',
          inner_diameter: '',
          outer_diameter: '',
          symbol: '',
          drive: '',
          pressure: '',
          handle_type: '',
          thread_diameter: '',
          thread_type: '',
          thickness: '',
          wall_thickness: '',
          angle_of_bending: '',
          length: '',
          series: '',
          volume: '',
          connecting_size: '',
          connection_type: '',
          control: '',
          installation: '',
          mixer_type: '',
          locks: '',
          rated_load: '',
          pump_type: '',
          section_number: '',
          section_depth: '',
          center_spacing: '',
          heat_one_section: '',
          coating: ''
        },
        rules: {
          title: [
            {required: true, message: 'Укажите название', trigger: 'blur'},
            {min: 4, max: 128, message: '(от 4 до 128 символов)', trigger: 'blur'}
          ],
          description: [{required: true, message: 'Заполните описание', trigger: 'blur'}],
          SKU: [{required: true, message: 'Укажите артикул', trigger: 'change'}],
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
        console.log(this.product)
        let data = {}
        for (let prop in this.product) {
          if (this.product[prop]) {
            data[prop] = this.product[prop]
          }
        }
        data.group = this.option[0]
        data.category = this.option[1]
        data.price = parseFloat(this.product.price)
        data.creationDate = new Date().getTime()
        console.log(data)
        this.dialog = false
        this.$store.dispatch('addNewProduct', data).then(() => {
          this.$refs.form.resetFields()
        })
      },
      resetForm() {
        this.$refs.form.resetFields();
      },
      openDialog() {
        this.dialog = true
        if (this.operation === 'edit') {
          this.product = this.$store.getters.products[this.productId]
        }
        if (this.operation === 'add') {
          this.option = [this.group, this.category]
        }
      }
    },
    computed: {
      isValidForm() {
        return this.product.title && this.product.description && this.product.SKU && this.product.price
      },
      dictionaries() {
        return this.$store.getters.dictionaries
      },
      dynamicFilters() {
        if (this.option[0]) {
          let filters
          this.$store.getters.PRODUCT_TREE.forEach(el => {
            if (el.value === this.option[0]) {
              el.children.forEach(item => {
                if (item.value === this.option[1]) {
                  filters = item.filters
                }
              })
            }
          })
          return filters
        } else {
          return ''
        }
      }
    }
  }
</script>

<style scoped lang="scss">
  #add_product {
    margin-left: 6px;
  }

  #additional_props {
    color: darkgrey;
    font-size: 12px;
  }
</style>
