<template>
  <el-row id="why_we">
    <span id="experience"><span id="ten">10</span><br> лет <br> опыта</span>
    <el-col :span="24">
      <h3>Почему мы?</h3>
    </el-col>
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
    <el-col :span="24">
      <div v-for="i in 4" :key="i">
        <div id="guarantee"></div>
      </div>
    </el-col>
  </el-row>
</template>
<script>
  export default {
    name: 'WhyWeBlock'
  }
</script>
<style scoped lang="scss">
  #why_we {
    display: flex;
    justify-content: start;
    flex-wrap: wrap;
    background: linear-gradient($color-primary, $color-primary-light);
    height: 700px;
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

  #sergey_img {
    height: 300px;
    margin-top: -180px;
  }

  #sergey_name {
    position: absolute;
    top: 270px;
    left: 30%;
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
    margin-top: -90px;
  }
</style>
