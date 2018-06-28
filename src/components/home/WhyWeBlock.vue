<template>
  <div id="why_we">
    <span id="experience"><span id="ten">10</span><br> лет <br> опыта</span>
    <el-row :span="24">
      <h3>Почему мы?</h3>
    </el-row>
    <el-row id="sergey_wrap">
      <el-col :span="6" :offset="3">
        <img src="~/static/home/sergey.png" alt="Сергей Порываев" id="sergey_img">
        <p id="sergey_name">Порываев <br> Сергей</p>
      </el-col>
      <el-col :span="10" id="why_we_text">
        <i>
          Мы гарантируем качество товаров реализуемых в нашем интернет магазине, все товары являются оригинальной
          продукцией и не являются подделкой. Все строительные материалы поставляются в оригинальной упаковке и
          могут
          снабжаться сертификатами от производителя. Являясь официальными распространителями стрйматериалов
          ведущих
          мировых производителей, мы отвечаем своей репутацией.
        </i>
      </el-col>
    </el-row>
    <el-row id="guarantee_wrap">
      <el-col v-for="i in 4" :key="i" :span="4" class="guarantee">
        <div class="guarantee_number">{{ i }}</div>
        <p>
          Мы гарантируем качество товаров реализуемых в нашем интернет магазине,
          все товары являются оригинальной продукцией и не являются подделкой.
        </p>
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
    name: 'WhyWeBlock'
  }
</script>
<style scoped lang="scss">
  #why_we {
    position: relative;
    background: linear-gradient($color-primary, $color-primary-light);
    height: 840px;
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
    #sergey_img {
      height: 300px;
    }
    #sergey_name {
      position: relative;
      font-weight: 500;
      font-size: 18px;;
      bottom: 90px;
      right: -240px;
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
      margin-top: 90px;
    }
  }

  #guarantee_wrap {
    display: flex;
    justify-content: center;

    p {
      margin-top: 160px;
      font-size: 12px;
      font-weight: 300;
      &:before {
        content: "";
        position: absolute;
        width: 100px;
        height: 2px;
        margin-left: 30px;
        margin-top: -20px;
        border-bottom: 1px solid $color-success;
      }
    }
    .guarantee {
      margin-top: -40px;
      height: 160px;
      width: 160px;
      margin-left: 60px;
      margin-right: 60px;
      background: $color-primary-light;
      border-radius: 5px;
      -webkit-box-shadow: 0px 6px 10px 4px rgba(1, 94, 172, 0.25);
      -moz-box-shadow: 0px 6px 10px 4px rgba(1, 94, 172, 0.25);
      box-shadow: 0px 6px 10px 4px rgba(1, 94, 172, 0.25);
    }

    .guarantee_number {
      display: flex;
      justify-content: center;
      align-items: center;
      padding: 5px;
      position: relative;
      top: -20px;
      left: -20px;
      width: 30px;
      height: 30px;
      font-size: 32px;
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
    margin-top: 160px;
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
</style>
