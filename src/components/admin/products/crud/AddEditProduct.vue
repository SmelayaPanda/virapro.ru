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
          <el-form ref="form" :model="product" :rules="rules" label-width="150px">
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
              <section class="container">
                <div class="quill-editor"
                     v-model="product.description"
                     v-quill:myQuillEditor="editorOption">
                </div>
              </section>
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
            <el-button v-if="operation === 'add'" @click="writeProduct('add')" type="success" :disabled="!isValidForm">
              Создать товар
            </el-button>
            <el-button v-if="operation === 'edit'" @click="writeProduct('edit')" type="success" :disabled="!isValidForm">
              Сохранить
            </el-button>
            <el-button v-if="operation === 'add'" type="warning" @click="resetForm">Очистить форму</el-button>
            <el-tooltip placement="top">
              <div slot="content">Операция создает новый товар!<br/>
                Изображения у созданного клона будут ссылаться на изображения родителя (будут общие),<br>
                так что при смене изображений родителя они так же поменяется у всех клонов. <br>
                Обратное неверно: при смене изображения клона изображение родителя останется прежним.</div>
              <el-button v-if="operation === 'edit'" type="info" @click="writeProduct('clone')">
                Клонировать товар
                <img id="clone" src="~/assets/icons/admin/flip.svg" alt="">
              </el-button>
            </el-tooltip>
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
        editorOption: {
          // some quill options
          modules: {
            toolbar: [
              ['bold', 'italic', 'underline', 'strike'],
              ['blockquote', 'code-block'],
              [{ 'list': 'ordered' }, { 'list': 'bullet' }],
              [{ 'script': 'sub' }, { 'script': 'super' }],
              [{ 'indent': '-1' }, { 'indent': '+1' }],
              ['clean'],
              ['link'],
              [{ 'align': [] }],
              [{ 'color': [] }, { 'background': [] }],
              [{ 'header': [2, 3, 4, 5, 6, false] }]
            ]
          }
        },
        option: ['', ''],
        product: {
          title: '',
          description: '',
          SKU: '',
          price: 100,
          currency: 'RUB',
          totalQty: 10,
          qty: 1, // for user cart
          // DYNAMIC PROPERTIES
          // String props:
          series: '',
          drive: '',
          coating: '',
          material: '',
          control: '',
          brand: '',
          locks: '',
          pump_type: '',
          thread_type: '',
          installation: '',
          handle_type: '',
          product_type: '',
          mixer_type: '',
          protection: '',
          reinforcement: '',
          country: '',
          connection_type: '',
          corpus_material: '',
          seal_material: '',
          symbol: '',
          thread_diameter: '',
          // Number props:
          length: '',
          volume: '',
          weight: '',
          height: '',
          power: '',
          thickness: '',
          consumption: '',
          service_live: '',
          accuracy_class: '',
          angle_of_bending: '',
          pressure: '',
          section_depth: '',
          section_number: '',
          wall_thickness: '',
          outer_diameter: '',
          avg_resource: '',
          corpus_diameter: '',
          rated_load: '',
          inner_diameter: '',
          center_spacing: '',
          connecting_size: '',
          nominal_diameter: '',
          conditional_diameter: '',
          nominal_pressure: '',
          construction_length: '',
          heat_one_section: '',
          max_temp_work_env: '',
          guarantee_period: ''
        },
        rules: {
          title: [
            {required: true, message: 'Укажите название', trigger: 'blur'},
            {min: 4, max: 128, message: '(от 4 до 128 символов)', trigger: 'blur'}
          ],
          option: [{required: true, message: 'Выберите категорию', trigger: 'blur'}],
          SKU: [{required: true, message: 'Укажите артикул', trigger: 'change'}],
          price: [{required: true, message: 'Укажите цену', trigger: 'change'}],
          totalQty: [{required: true, message: 'Укажите количество', trigger: 'change'}],
        },
        labelWidth: '140px'
      }
    },
    methods: {
      async writeProduct(operation) {
        let data = {}
        for (let prop in this.product) {
          if (this.product[prop]) {
            data[prop] = this.product[prop]
          }
        }
        data.group = this.option[0]
        data.category = this.option[1]
        data.price = parseFloat(this.product.price)

        this.dialog = false
        if (operation === 'add' || operation === 'clone') {
          if (operation === 'add') {
            data.creationDate = new Date().getTime()
          }
          if (operation === 'clone') {
            await delete data.productId
          }
          await this.$store.dispatch('addNewProduct', data)
        }
        if (operation === 'edit') {
          await this.$store.dispatch('editProduct', data)
        }
        await this.$refs.form.resetFields()
      },
      resetForm() {
        this.$refs.form.resetFields();
      },
      openDialog() {
        this.dialog = true
        if (this.operation === 'edit') {
          this.product = this.$store.getters.products[this.productId]
          this.option = [this.product.group, this.product.category]
        }
        if (this.operation === 'add') {
          this.option = [this.group, this.category]
        }
      }
    },
    computed: {
      isValidForm() {
        return this.option[0] && this.option[1] && this.product.title && this.product.SKU && this.product.price
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
    width: 55px;
  }

  #additional_props {
    color: darkgrey;
    font-size: 12px;
  }

  .container {
    width: 100%;
    margin: 0 auto;
    .quill-editor {
      min-height: 200px;
      max-height: 400px;
      overflow-y: auto;
    }
  }

  #clone {
    height: 16px;
    margin-bottom: -4px;
  }
</style>
