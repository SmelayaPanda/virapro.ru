<template>
  <div v-if="companyInfo">
    <el-row type="flex" justify="left" style="flex-wrap: wrap">
      <!--MAIN INFO-->
      <el-col :xs="24" :sm="12" :md="8" :lg="8" :xl="8">
        <el-card style="height: 100%">
          <div slot="header" class="clearfix">
            <img src="~/assets/icons/admin/account_balance.svg" alt="Компания">
            <h3>Компания:</h3>
          </div>
          <div>
            <p>
              <edit-company-info-field
                document="main" field="name" title="Название"
                :value="companyInfo.main.name"/>
              <el-tag>{{ companyInfo.main.name }}</el-tag>
            </p>
            <p>
              <edit-company-info-field
                document="main" field="INN" title="ИНН"
                :value="companyInfo.main.INN"/>
              <el-tag>{{ companyInfo.main.INN }}</el-tag>
            </p>
          </div>
        </el-card>
      </el-col>
      <!--ADDRESS-->
      <el-col :xs="24" :sm="12" :md="8" :lg="8" :xl="8">
        <el-card style="height: 100%">
          <div slot="header" class="clearfix">
            <img src="~/assets/icons/admin/location_on.svg" alt="">
            <h3>Адрес</h3>
          </div>
          <div>
            <p>
              <edit-company-info-field
                document="address" field="country" title="Страна"
                :value="companyInfo.address.country"/>
              <el-tag>{{ companyInfo.address.country }}</el-tag>
            </p>
            <p>
              <edit-company-info-field
                document="address" field="city" title="Город"
                :value="companyInfo.address.city"/>
              <el-tag>{{ companyInfo.address.city }}</el-tag>
            </p>
            <p>
              <edit-company-info-field
                document="address" field="street" title="Улица"
                :value="companyInfo.address.street"/>
              <el-tag>{{ companyInfo.address.street }}</el-tag>
            </p>
            <p>
              <edit-company-info-field
                document="address" field="build" title="Дом"
                :value="companyInfo.address.build"/>
              <el-tag>{{ companyInfo.address.build }}</el-tag>
            </p>
            <p>
              <edit-company-info-field
                document="address" field="house" title="Помещение"
                :value="companyInfo.address.house"/>
              <el-tag>{{ companyInfo.address.house }}</el-tag>
            </p>
            <p>
              <edit-company-info-field
                document="address" field="postCode" title="Почтовый индекс"
                :value="companyInfo.address.postCode"/>
              <el-tag>{{ companyInfo.address.postCode }}</el-tag>
            </p>
          </div>
        </el-card>
      </el-col>
      <!--CONTACTS-->
      <el-col :xs="24" :sm="12" :md="8" :lg="8" :xl="8">
        <el-card style="height: 100%">
          <div slot="header" class="clearfix">
            <img src="~/assets/icons/admin/contact_phone.svg" alt="">
            <h3>Контакты</h3>
          </div>
          <div>
            <p>
              <edit-company-info-field
                document="contacts" field="phone" title="Телефон"
                :value="companyInfo.contacts.phone"/>
              <el-tag>{{ companyInfo.contacts.phone }}</el-tag>
            </p>
            <p>
              <edit-company-info-field
                document="contacts" field="mobilePhone" title="Мобильный"
                :value="companyInfo.contacts.mobilePhone"/>
              <el-tag>{{ companyInfo.contacts.mobilePhone }}</el-tag>
            </p>
            <p>
              <edit-company-info-field
                document="contacts" field="email" title="Email"
                :value="companyInfo.contacts.email"/>
              <el-tag>{{ companyInfo.contacts.email }}</el-tag>
            </p>
          </div>
        </el-card>
      </el-col>
    </el-row>
  </div>
</template>

<script>
  import EditCompanyInfoField from './crud/EditCompanyInfoField'

  export default {
    name: 'CompanyInfo',
    components: {EditCompanyInfoField},
    computed: {
      companyInfo() {
        return this.$store.getters.companyInfo
      }
    }
  }
</script>

<style scoped>
  .el-tag {
    margin-left: 10px;
  }

  h3 {
    margin-bottom: 0;
    margin-top: 5px;
  }
</style>
