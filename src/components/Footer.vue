<template>
  <footer>
    <delivery-and-payment-dialog></delivery-and-payment-dialog>
    <order-service-dialog></order-service-dialog>
    <el-row id="footer_row">
      <el-col :xs="24" :sm="4" :md="4" :lg="4" :xl="4" id="company_logo">
        <img src="~/assets/icons/logo/virapro.svg" alt="Vira Pro Logo">
      </el-col>
      <el-col :xs="14" :sm="7" :md="4" :lg="4" :xl="4" :offset="1">
        <p id="footer_phone">
          <img src="~/assets/icons/home/phone.svg" alt="Телефон">
          {{ $store.getters.companyInfo.contacts.phone }}
        </p>
        <p id="email">
          <img src="~/assets/icons/home/email.svg" alt="Электронная почта">
          {{ $store.getters.companyInfo.contacts.email }}
        </p>
        <p id="location">
          <img src="~/assets/icons/home/location.svg" alt="Местоположение">
          <span id="city">г. {{ $store.getters.companyInfo.address.city }}</span> <br>
          <span id="street_build">
            ул. {{ $store.getters.companyInfo.address.street }},
            д. {{ $store.getters.companyInfo.address.build }}
          </span> <br>
          <span id="location_info">
            Пункт выдачи заказов
          </span>
        </p>
      </el-col>
      <el-col  :xs="12" :sm="12" :md="11" :lg="11" :xl="11" id="footer_links">
        <el-row type="flex" style="flex-wrap: wrap">
          <el-col :xs="10" :sm="10" :md="3" :lg="4" :xl="3">
            <nuxt-link to="/about">О нас</nuxt-link>
          </el-col>
          <el-col :xs="10" :sm="10" :md="4" :lg="4" :xl="4">
            <a @click="$nuxt.$router.push({name: 'catalog', params: {ANCHOR: '#service_title'}})">Услуги</a>
          </el-col>
          <el-col :xs="10" :sm="10" :md="8" :lg="7" :xl="8">
            <el-button
              style="color: white; font-size: 14px; font-weight: 400; padding-top: 8px;;"
              type="text" @click="$bus.$emit('openDeliveryAndPaymentDialog')" >Оплата и доставка
            </el-button>
          </el-col>
          <el-col :xs="10" :sm="10" :md="4" :lg="4" :xl="4">
            <a @click="$nuxt.$router.push({name: 'about', params: {ANCHOR: '#reviews'}})">Отзывы</a>
          </el-col>
        </el-row>
      </el-col>
      <el-col :xs="10" :sm="6" :md="4" :lg="4" :xl="4" id="footer_work_time">
        <p>
          <img src="~/assets/icons/home/calendar.svg" id="work_time_icon" alt="Рабочее время">
          <time>Пн-Пт: 10:00 - 18:00, <br><span id="rest">Сб-Вс: Выходной</span></time>
        </p>
        <div id="rehigh_logo">
          <p>сайт разработан</p>
          <img onclick="window.open('https://rehigh.pro/', '_blank')"
               src="~/assets/icons/rehigh/rehigh_string_white.svg" alt="Re:High Studio">
          <p>studio</p>
        </div>
      </el-col>
    </el-row>
  </footer>
</template>

<script>
  const DeliveryAndPaymentDialog = () => import(/* webpackChunkName: "modal" */ './dialogs/DeliveryAndPaymentDialog');
  const OrderServiceDialog = () => import(/* webpackChunkName: "modal" */ "./dialogs/OrderServiceDialog");

  export default {
    name: 'AppFooter',
    components: {OrderServiceDialog, DeliveryAndPaymentDialog}
  }
</script>

<style scoped lang="scss">
  footer {
    position: absolute;
    right: 0;
    bottom: 0;
    left: 0;
    -webkit-box-shadow: 0px -4px 12px 0px rgba(136, 189, 218, 0.4);
    -moz-box-shadow: 0px -4px 12px 0px rgba(136, 189, 218, 0.4);
    box-shadow: 0px -4px 12px 0px rgba(136, 189, 218, 0.4);
  }

  #footer_row {
    z-index: 10;
    display: flex;
    justify-content: start;
    padding: 30px;
    background: $color-primary-dark;
    color: white;
    #logo {
      display: flex;
      justify-content: center;
      align-items: center;
      border: 1px solid white;
      padding: 58px;
    }
    #footer_phone {
      position: relative;
      font-size: 16px;
      margin-top: 14px;
      img {
        position: absolute;
        left: -28px;
        height: 18px;
      }
    }
    #email {
      position: relative;
      font-size: 14px;
      font-weight: 300;
      img {
        position: absolute;
        left: -28px;
        height: 18px;
      }
    }
    #footer_links {
      padding-left: 40px;
      margin-top: 8px;
    }
    #location {
      position: relative;
      img {
        position: absolute;
        left: -28px;
        height: 20px;
      }
      #city {
        font-size: 16px;
      }
      #street_build {
        font-size: 14px;
        font-weight: 400;
      }
      #location_info {
        font-size: 12px;
        font-weight: 300;
      }
    }
    #footer_work_time {
      position: relative;
      font-size: 14px;
      font-weight: 300;
      padding-top: 5px;
      #work_time_icon {
        position: absolute;
        left: -28px;
        height: 22px;
      }
      #rest {
        line-height: 30px;
      }
    }
  }

  a {
    color: white;
    font-weight: 400;
    font-size: 14px;
    line-height: 32px;
    &:hover {
      cursor: pointer;
    }
  }

  #company_logo {
    img {
      margin-top: -7px;
      height: 70px;
    }
  }

  #rehigh_logo {
    p {
      margin: 0;
      font-size: 10px;
      font-weight: 300;
      &:first-child {
        padding-left: 7px;
        padding-bottom: 2px;
        letter-spacing: 1px;
      }
      &:nth-child(3) {
        font-weight: 400;
        padding-left: 37px;
        letter-spacing: 1px;
      }
    }
    img {
      height: 18px;
      &:hover {
        cursor: pointer;
      }
    }
  }

  @media only screen and (max-width: $md-screen) {
    #company_logo img{
      height: 56px;
      margin-top: -3px;
    }
  }

  @media only screen and (max-width: $sm-screen) {
    #company_logo{
      display: none;
    }
  }
    @media only screen and (max-width: $xs-screen) {
    #company_logo,
    #footer_links {
      display: none;
    }

    #city {
      font-size: 14px;
    }
    #footer_phone, #street_build, #footer_work_time, #email {
      font-size: 12px !important;
    }
  }
</style>
