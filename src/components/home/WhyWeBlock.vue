<template>
  <div id="why_we">
    <span id="experience"><span id="ten">10</span><br> лет <br> опыта</span>
    <img src="~/static/home/tools.png" alt="Инструменты" id="tools_img">
    <el-row :span="24">
      <h3>Почему мы?</h3>
    </el-row>
    <el-row id="sergey_wrap">
      <el-col :span="6" :offset="3">
        <img src="~/static/home/sergey.png" alt="Сергей Порываев">
        <p id="sergey_name">Порываев <br> Сергей</p>
      </el-col>
      <el-col :xs="24" :sm="14" :md="12" :lg="10" :xl="10" id="why_we_text">
        <ul>
          <li> Представлены только проверенные мировые бренды сантехники</li>
          <li>Квалифицированный персонал прошедший обучение у производителей и готовый помочь клиентам выбрать самый
            выгодный для него товар по цене и качеству
          </li>
          <li>Качественный монтаж различного сантехнического оборудования</li>
          <li>Быстрая доставка по Новосибирску и Новосибирской области</li>
        </ul>
      </el-col>
    </el-row>
    <el-row id="guarantee_wrap">
      <el-col v-for="(item, idx) in guaranties" :key="idx" :span="4" class="guarantee">
        <div class="guarantee_number">{{ idx + 1 }}</div>
        <h4>{{ item.title }}</h4>
        <p>{{ item.description }}</p>
      </el-col>
    </el-row>
    <el-row id="show_more">
      <a class="button" @click="$nuxt.$router.push('/about')">
        <svg>
          <g>
            <line x2="227.62" y1="31.28" y2="31.28"></line>
            <polyline points="222.62 25.78 228.12 31.28 222.62 36.78"></polyline>
            <circle cx="224.67" cy="30.94" r="30.5" transform="rotate(180 224.67 30.94) scale(1, -1) translate(0, -61)">
            </circle>
          </g>
        </svg>
        <span>Подробнее</span></a>
    </el-row>
  </div>
</template>
<script>
  export default {
    name: 'WhyWeBlock',
    data() {
      return {
        guaranties: [{
          title: 'Профессионализм',
          description: 'Мы стараемся быть профессионалами во всем, что делаем! Для того,чтобы предлагать вам самую лучшую сантехнику, сотрудники нашей компании проходят обучение на заводах-производителях и знают о товаре всё.'
        }, {
          title: 'Ответственность',
          description: 'Все наши сотрудники ориентированы на качественный результат, поэтому ответственно относятся к оказываемым услугам. Мы всегда выполняем то, что обещали, так как доверие наших партнеров является самым ценным достижением для нас.'
        }, {
          title: 'Сотрудничество',
          description: 'В отношениях с партнерами, заказчиками и коллегами мы придерживаемся принципов признания и уважения личности и нацелены на долгосрочное и взаимовыгодное сотрудничество.'
        }, {
          title: 'Развитие',
          description: 'В отношениях с партнерами, заказчиками и коллегами мы придерживаемся принципов признания и уважения личности и нацелены на долгосрочное и взаимовыгодное сотрудничество.'
        }
        ]
      }
    }
  }
</script>
<style scoped lang="scss">
  #why_we {
    position: relative;
    background: linear-gradient($color-primary, $color-primary-light);
    height: 940px;
    margin-top: 80px;
    color: white;
    h3 {
      text-align: center;
      margin-top: 40px;
      font-size: 26px;
      font-weight: 500;
      &:after {
        content: "";
        position: absolute;
        width: 90px;
        height: 2px;
        margin-left: -122px;
        margin-top: 40px;
        border-bottom: 1px solid $color-success;
      }
    }
    i {
      color: white;
      font-weight: 100;
    }
  }

  #tools_img {
    position: absolute;
    right: 0;
    top: 30px;
    height: 800px;
  }

  #experience {
    position: absolute;
    left: -20px;
    top: 50px;
    color: white;
    font-size: 160px;
    line-height: 120px;
    font-weight: 600;
    opacity: .07;
    h3 {
      color: white;
    }
  }

  #ten {
    font-size: 220px;
    margin-left: -3px;
  }

  #sergey_wrap {
    display: flex;
    justify-content: start;
    img {
      height: 300px;
      margin-top: -20px;
    }
    #sergey_name {
      position: relative;
      font-weight: 500;
      font-size: 18px;;
      bottom: 80px;
      right: -260px;
      &:after {
        content: "";
        position: absolute;
        width: 150px;
        height: 2px;
        margin-left: 32px;
        margin-top: -1px;
        border-bottom: 1px solid $color-success;
      }
    }
    #why_we_text {
      font-weight: 300;
      margin-top: 30px;
      margin-left: -50px;
      line-height: 22px;
    }
  }

  #guarantee_wrap {
    display: flex;
    justify-content: center;
    .guarantee {
      height: 190px;
      width: 210px;
      margin-left: 50px;
      margin-right: 50px;
      background: $color-primary-light;
      border-radius: 5px;
      -webkit-box-shadow: 0px 6px 10px 4px rgba(1, 94, 172, 0.25);
      -moz-box-shadow: 0px 6px 10px 4px rgba(1, 94, 172, 0.25);
      box-shadow: 0px 6px 10px 4px rgba(1, 94, 172, 0.25);
      h4 {
        font-size: 18px;
        font-weight: 400;
        margin-top: 34px;
        text-align: center;
        text-shadow: 0px 0px 1px rgba(99, 185, 250, 0.95), 0 0 8px #ffffff;
      }
      p {
        margin-top: 120px;
        font-size: 12px;
        font-weight: 300;
        padding-left: 8px;
        &:before {
          content: "";
          position: absolute;
          width: 100px;
          height: 2px;
          margin-left: 46px;
          margin-top: -16px;
          border-bottom: 1px solid $color-success;
        }
      }
    }

    .guarantee_number {
      display: flex;
      justify-content: center;
      align-items: center;
      padding: 8px;
      position: relative;
      top: -22px;
      left: -22px;
      width: 30px;
      height: 30px;
      font-size: 30px;
      color: $color-success;
      font-weight: 500;
      border: 1px solid white;
      border-radius: 50%;
      box-shadow: inset 0 0 5px rgba(255, 255, 255, 0.9), 0 0 1px rgba(255, 255, 255, 0.7);
    }
  }

  #show_more {
    display: flex;
    justify-content: center;
    margin-top: 200px;
    a.button {
      width: 300px;
      height: 80px;
      overflow: hidden;
      vertical-align: middle;
      text-align: left;
      text-decoration: none;
      line-height: 3em;
      font-size: 1rem;
      color: #fff;
      cursor: pointer;
      -webkit-transform: translateZ(0);
      transform: translateZ(0);
      transition: -webkit-transform 0.5s;
      transition: transform 0.5s;
    }
    a.button svg {
      z-index: 1;
      position: absolute;
      top: 0;
      left: 0;
    }

    a.button svg g line,
    a.button svg g polyline,
    a.button svg g circle {
      fill: none;
      stroke: white;
    }
    a.button svg g line,
    a.button svg g polyline {
      stroke-miterlimit: 10;
      stroke: $color-success;
    }
    a.button svg g circle {
      display: block;
      stroke-linecap: round;
      stroke-linejoin: round;
      stroke-width: 1px;
      stroke-dasharray: 200;
      stroke-dashoffset: 0;
      transition: stroke-dashoffset ease-out 0.5s;
    }
    a.button span {
      z-index: 2;
      position: relative;
      display: inline-block;
      bottom: 4px;
    }
    a.button:hover {
      -webkit-transform: translateZ(0) translateX(0.5em);
      transform: translateZ(0) translateX(0.5em);
    }
    a.button:hover svg g circle {
      stroke-dashoffset: 200;
    }
  }

  @media only screen and (max-width: $md-screen) {
    .guarantee {
      margin-left: 30px !important;
      margin-right: 30px !important;
    }
    #why_we_text {
      margin-left: 0 !important;
    }
  }
</style>
