<template>
  <div id="about">
    <RouterHeader>
      <div slot="title">О НАС И НАШИХ ВОЗМОЖНОСТЯХ</div>
    </RouterHeader>
    <el-row id="about_content">
      <el-col :xs="24" :sm="16" :md="13" :lg="11" :xl="10" :offset="2">
        <el-row type="flex">
          <el-col style="width: 40px">
            <div class="pulsing_wrap">
              <div class="pulsing-circle"></div>
            </div>
          </el-col>
          <el-col :span="10">
            <h2>О компании</h2>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="24">
            <p>
              Здравствуйте!
              Мы рады приветствовать Вас в нашем интернет-магазине сантехники, электрики .
              Наш магазин основан группой единомышленников желающих предложить качественную сантехнику по недорогим
              ценам.
              Проработав много времени в сантехнических магазинах и зная все проблемы возникающие у клиентов при покупке
              сантехники, мы учли их и организовали свой магазин.
            </p>
            Наши цели:
            <ul>
              <li>Стать лидером на рынке сантехники.</li>
              <li>Соответствовать высоким требованиям по качеству товаров и <br> оказываемым услугам.</li>
              <li>Быть достойным партнером.</li>
            </ul>
          </el-col>
        </el-row>
        <el-row type="flex" style="margin-top: 30px;">
          <el-col style="width: 40px">
            <div class="pulsing_wrap">
              <div class="pulsing-circle"></div>
            </div>
          </el-col>
          <el-col :span="14">
            <h2>Почему мы?</h2>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="24">
            <p>
              Мы предлагаем довольно широкий ассортимент как импортной, так и российской сантехники и аксессуаров, а так
              же светового оборудования. Мы предлагаем только, проверенную временем, качественную и функциональную
              сантехническую продукцию от известных фирм-производителей современной сантехники разных марок и брендов.
              На виртуальных полках нашего интернет-магазина вы найдёт лучшее сочетание цены и качества товаров. Если вы
              желаете купить сантехнику по недорогой цене, обращайтесь к нам, и, гарантируем, что останетесь довольны.
              Все товары продаются с гарантией. У нас есть собственная служба доставки, так что делая покупки в нашем
              магазине, вы получаете услугу "доставка на дом", а мы, в свою очередь, позаботимся, что ваши покупки
              "дошли" до вашего дома в целостности и сохранности.
            </p>
            <p>
              Чтобы сантехника в полной мере проявила свою функциональность и отменное качество исполнения, необходимо
              выполнить качественный монтаж. Обращайтесь к специалистам нашей компании, которые осуществят установку
              сантехники по выгодной цене. Широкий спектр услуг по монтажу различного сантехнического оборудования
              поможет сделать ваш дом тёплым, уютным и комфортным.
              Наши консультанты - команда профессионалов, знающих о сантехнике все. Они подробно расскажут о любом
              изделии, подберут сантехнику по стилю или функционалу, предоставят необходимую техническую документацию,
              дадут рекомендации по уходу и эксплуатации. С каждым посетителем мы работаем индивидуально, с учетом всех
              предпочтений и столько времени, сколько нужно.
            </p>
          </el-col>
        </el-row>
      </el-col>
      <el-col :xs="1" :sm="1" :md="9" :lg="11" :xl="11">
        <!-- EMPTY-->
      </el-col>
    </el-row>
    <el-row type="flex" justify="start">
      <el-col :xs="24" :sm="20" :md="18" :lg="16" :xl="15" :offset="3">
        <Reviews id="reviews"></Reviews>
      </el-col>
    </el-row>
  </div>
</template>

<script>
  import RouterHeader from "@/components/RouterHeader";

  const Reviews = () => import("@/components/about/Reviews");

  export default {
    components: {RouterHeader, Reviews},
    async fetch({store, params}) {
      await store.dispatch('ANCHOR', params.ANCHOR)
      await store.dispatch('USER_EVENT', 'Страница: О нас')
    },
    methods: {
      reloadPage() {
        window.location.reload()
      }
    },
    mounted() {
      if (this.$store.getters.ANCHOR === '#reviews') { // stupid solution for scrolling to services
        this.$scrollTo('#reviews')
        this.$store.dispatch('ANCHOR', '')
      }
    }
  }
</script>

<style scoped lang="scss">
  #about {
    background: url("~/static/about/plumb.png") no-repeat top right;
    background-size: 570px;
  }

  #about_content {
    display: flex;
    justify-content: start;
    align-items: center;
    margin-top: 30px;
    h2 {
      position: relative;
      color: $color-primary;
      padding-left: 64px;
    }
    p {
      font-weight: 300;
      line-height: 22px;
    }
    ul {
      color: $color-secondary;
      font-weight: 300;
    }
  }

  .pulsing_wrap {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 45px;
    height: 45px;
    margin-top: 10px;
    position: relative;
    border: 1px solid $color-primary-light;
    border-radius: 50%;
    &:after {
      content: "";
      position: absolute;
      top: 20px;
      left: 45px;
      width: 50px;
      height: 2px;
      border-bottom: 1px solid $color-primary;
    }
  }

  .pulsing-circle {
    position: absolute;
    width: 15px;
    height: 15px;
    top: 15px;
    &:before {
      content: "";
      position: relative;
      display: block;
      width: 300%;
      height: 300%;
      box-sizing: border-box;
      margin-left: -100%;
      margin-top: -100%;
      border-radius: 45px;
      border: 5px solid $color-primary-light;
      animation: pulse-ring 2s cubic-bezier(0.215, 0.61, 0.355, 1) infinite;
    }
    &:after {
      content: "";
      position: absolute;
      left: 0;
      top: 0;
      display: block;
      width: 100%;
      height: 100%;
      background-color: #FFF;
      border-radius: 15px;
      box-shadow: 0px 0px 0px 4px $color-primary, 0px 0px 2px 6px #fff;
      animation: pulse-dot 2s cubic-bezier(0.455, 0.03, 0.515, 0.955) -0.4s infinite;
    }
  }

  @keyframes pulse-ring {
    0% {
      transform: scale(0.5);
    }
    80%,
    100% {
      opacity: 0;
    }
  }

  @keyframes pulse-dot {
    0% {
      transform: scale(0.8);
    }
    50% {
      transform: scale(1);
    }
    100% {
      transform: scale(0.8);
    }
  }

  #reviews {
    margin-top: 20px;
  }

  @media only screen and (max-width: $sm-screen) {
    #reviews {
      display: none;
    }
    #about {
      background: none;
    }
  }
</style>
