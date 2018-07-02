<template>
  <footer>
    <el-row id="footer_row">
      <el-col :xs="24" :sm="4" :md="4" :lg="4" :xl="4" id="company_logo">
        <div id="logo">ЛОГО</div>
      </el-col>
      <el-col :xs="12" :sm="7" :md="4" :lg="4" :xl="4" :offset="1">
        <p id="phone">
          <img src="~/assets/icons/home/phone.svg" id="phone_icon" alt="Телефон">
          {{ $store.getters.companyInfo.contacts.phone }}
        </p>
        <p id="location">
          <img src="~/assets/icons/home/location.svg" id="location_icon" alt="Местоположение">
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
        <el-row type="flex" style="margin-top: 10px; flex-wrap: wrap">
          <el-col :xs="10" :sm="10" :md="3" :lg="4" :xl="3">
            <nuxt-link to="/about">О нас</nuxt-link>
          </el-col>
          <el-col :xs="10" :sm="10" :md="4" :lg="4" :xl="4">
            <nuxt-link to="/">Услуги</nuxt-link>
          </el-col>
          <el-col :xs="10" :sm="10" :md="8" :lg="7" :xl="8">
            <nuxt-link to="/">Оплата и доставка</nuxt-link>
          </el-col>
          <el-col :xs="10" :sm="10" :md="4" :lg="4" :xl="4">
            <nuxt-link to="/about">Отзывы</nuxt-link>
          </el-col>
        </el-row>
      </el-col>
      <el-col :xs="12" :sm="6" :md="4" :lg="4" :xl="4" id="work_time">
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
  export default {
    name: 'AppFooter'
  }
</script>

<style scoped lang="scss">
  footer {
    position: absolute;
    right: 0;
    bottom: 0;
    left: 0;
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
    #phone {
      position: relative;
      font-size: 16px;
    }
    #phone_icon {
      position: absolute;
      left: -28px;
      height: 18px;
    }
    #location {
      position: relative;
      margin-top: 32px;
      #location_icon {
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
    #work_time {
      padding-top: 5px;
      position: relative;
      font-size: 14px;
      font-weight: 300;
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
    #phone, #street_build, #work_time {
      font-size: 12px !important;
    }
  }
</style>
