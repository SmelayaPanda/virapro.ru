module.exports = {
  /*
   ** Headers of the page
   */
  head: {
    title: 'ViraPro / Сантехника Новосибирск',
    meta: [
      {charset: 'utf-8'},
      {name: 'viewport', content: 'width=device-width, initial-scale=1'},
      {name: 'google-site-verification', content: 'a5vJ3KAwgtVY82UOrzKTKEFePCgI2BSOt08GLa9GDZ4'},
      {name: 'yandex-verification', content: '0f23212358a51ff0'},
      {hid: 'description', name: 'description', content: 'Интернет-магазин товаров сантехники и комплексного сервиса ViraPro в Новосибирске. Доступные цены, доставка, консультация специалиста и монтажные работы.'},
      {name: 'keywords', content: 'интернет-магазины сантехники в новосибирске, интернет-магазин сантехники новосибирск, магазин сантехники новосибирск, интернет-магазин сантехники, сантехника в новосибирске, сантехника для ванной комнаты, магазин сантехники'}
    ],
    link: [
      {rel: 'icon', type: 'image/x-icon', href: '/favicon.ico'},
      {rel: 'stylesheet', href: 'https://fonts.googleapis.com/css?family=Roboto:100i,300,400,500,700,900&amp;subset=cyrillic,cyrillic-ext'}
    ]
  },
  manifest: {  // PWA meta
    name: 'Сантехника в Новосибирске. Консультация, замерочные работы и установка.',
    short_name: 'ViraPro'
  },
  router: {
    middleware: 'router-auth'
  },
  loading: { // Customize the progress bar color
    color: '#b1ff00'
  },
  modules: [
    '@nuxtjs/pwa',
    'nuxt-sass-resources-loader'
  ],
  sassResources: [
    '@/assets/styles/global.scss'
  ],
  plugins: [
    '@/plugins/element-ui',
    '@/plugins/fireauth.js',
    '@/plugins/filters.js',
    '@/plugins/event-bus.js',
    {src: '@/plugins/scroll-to.js', ssr: false},
    {src: '@/plugins/masked-input.js', ssr: false},
    {src: '@/plugins/back-to-top.js', ssr: false},
    {src: '@/plugins/quill-editor.js', ssr: false}
  ],
  css: [
    {src: 'element-ui/lib/theme-chalk/index.css'},
    {src: '@/assets/styles/element-variables.scss', lang: 'sass'},
    'quill/dist/quill.snow.css',
    'quill/dist/quill.bubble.css',
    'quill/dist/quill.core.css'
  ],
  /*
   ** Build configuration
   */
  buildDir: '../prod/server/nuxt',
  build: {
    vendor: ['element-ui', 'firebase'],
    publicPath: '/assets/',
    extractCSS: true,
    babel: {
      presets: ['es2015', 'stage-0'],
      plugins: [
        ["transform-runtime", {
          "polyfill": true,
          "regenerator": true
        }],
      ]
    },
    /*
     ** Run ESLint on save
     */
    extend(config, ctx) {
      if (ctx.dev && ctx.isClient) {
        // config.module.rules.push({
        //   enforce: 'pre',
        //   test: /\.(js|vue)$/,
        //   loader: 'eslint-loader',
        //   exclude: /(node_modules)/
        // })
      }
    }
  }
}
