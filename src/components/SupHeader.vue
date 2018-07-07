<template>
  <el-row id="contacts_row">
    <el-col id="work_time_wrap" :md="9" :lg="12" :xl="12" :offset="2">
      <div id="work_time">
        <img src="~/assets/icons/home/calendar.svg" alt="Рабочее время">
        <time>7 дней в неделю с 10<sup>00</sup> до 18<sup>00</sup> часов</time>
      </div>
    </el-col>
    <el-col id="address" :md="6" :lg="4" :xl="4">
      <img src="~/assets/icons/home/location.svg" alt="Местоположение">
      г. {{ $store.getters.companyInfo.address.city }},
      ул. {{ $store.getters.companyInfo.address.street }},
      д. {{ $store.getters.companyInfo.address.build }}
    </el-col>
    <el-col :xs="22" :sm="22" :md="6" :lg="4" :xl="4" :offset="1" id="phone">
      <img src="~/assets/icons/home/phone.svg" alt="Телефон">
      {{ $store.getters.companyInfo.contacts.phone }}
    </el-col>
  </el-row>
</template>
<script>
  export default {
    name: 'ContactHeader'
  }
</script>
<style scoped lang="scss">

  #contacts_row {
    display: flex;
    justify-content: start;
    align-items: center;
    flex-wrap: wrap;
    background: $color-primary-dark;
    height: 44px;
    border-bottom: 2px solid $color-success;
    -webkit-box-shadow: 0px 4px 12px 0px rgba(161, 181, 204, 1);
    -moz-box-shadow: 0px 4px 12px 0px rgba(161, 181, 204, 1);
    box-shadow: 0px 4px 12px 0px rgba(161, 181, 204, 1);
  }

  #phone {
    color: white;
  }

  #work_time, #address, #phone {
    display: flex;
    align-items: center;
    color: white;
    font-size: 12px;
    letter-spacing: .5px;
    font-weight: 300;
    time {
      color: white;
      font-size: 12px;
      font-weight: 300;
    }
    sup {
      color: white;
      font-size: 8px;
      margin-bottom: 5px;
    }
  }

  #work_time {
    img {
      height: 20px;
      padding-right: 7px;
    }
  }

  #address {
    img {
      height: 18px;
      padding-right: 7px;
    }
  }

  #phone {
    font-weight: 400;
    font-size: 14px;
    letter-spacing: 1px;
    img {
      height: 18px;
      padding-right: 7px;
    }
  }

  @media only screen and (max-width: $sm-screen) {
    #work_time_wrap, #address {
      display: none;
    }
  }
</style>
