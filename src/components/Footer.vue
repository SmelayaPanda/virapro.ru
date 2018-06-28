<template>
  <footer>
    <el-row id="footer-row">
      <el-col :span="5">
        <div id="logo">ЛОГО</div>
      </el-col>
      <el-col :span="4" :offset="1">
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
      <el-col :span="4" :offset="2">
        <p>
          <nuxt-link to="/about">О нас</nuxt-link>
        </p>
        <p>
          <nuxt-link to="/">Услуги</nuxt-link>
        </p>
        <p>
          <nuxt-link to="/">Оплата</nuxt-link>
        </p>
        <p>
          <nuxt-link to="/about">Отзывы</nuxt-link>
        </p>
      </el-col>
      <el-col :span="4" :offset="1">
        <p>
          <nuxt-link to="/">Доставка</nuxt-link>
        </p>
        <p>
          <nuxt-link to="/">Документы</nuxt-link>
        </p>
        <p>
          <nuxt-link to="/">Оставить отзыв</nuxt-link>
        </p>
        <p>
          <nuxt-link to="/">Гарантии и возврат</nuxt-link>
        </p>
      </el-col>
      <el-col :span="4" :offset="1" id="work_time">
        <p>
          <img src="~/assets/icons/home/calendar.svg" id="work_time_icon" alt="Рабочее время">
          <time>Пн-Пт: 10:00 - 18:00, <br><span id="rest">Сб-Вс: Выходной</span></time>
        </p>
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
  #footer-row {
    display: flex;
    justify-content: center;
    padding: 30px;
    background: $color-primary-dark;
    color: white;
    #logo {
      display: flex;
      justify-content: center;
      align-items: center;
      border: 1px solid white;
      padding: 40px;
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
    font-weight: 300;
    font-size: 14px;
  }
</style>
