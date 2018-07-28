importScripts('/assets/workbox.3de3418b.js')

const workboxSW = new self.WorkboxSW({
  "cacheId": "nuxt-ssr-firebase-source",
  "clientsClaim": true,
  "directoryIndex": "/"
})

workboxSW.precache([
  {
    "url": "/assets/26.2126e8219f1b241b1f51.js",
    "revision": "ee6e63eefa11b93267a643a9c165d2ae"
  },
  {
    "url": "/assets/27.bfac52610c2366633b5c.js",
    "revision": "bc91fbf358d1dda73d674b960ce0ccf3"
  },
  {
    "url": "/assets/28.d75ac66742968d97ee60.js",
    "revision": "7a6416948323544f853d7f0bf818818e"
  },
  {
    "url": "/assets/app.75c9f988d806394a77c8.js",
    "revision": "907ba2b0bada4be9c3cfe8f7d4866089"
  },
  {
    "url": "/assets/below-slider.d1ab5e03348e1bc78e70.js",
    "revision": "3fc242fbe5711e7e3ea551ac0eb39a28"
  },
  {
    "url": "/assets/common.0c3b66ec0d08bf8fb29e.js",
    "revision": "2ab92db097ed8d8facdb9809f9554a41"
  },
  {
    "url": "/assets/common.e97852012acbc306d6031c7d87403e71.css",
    "revision": "c9005c9260447609fa664e657faf89f7"
  },
  {
    "url": "/assets/layouts/admin.85e7d68121240c0e4b15.js",
    "revision": "a9ea407bde41c0ba42b68166da944bd8"
  },
  {
    "url": "/assets/layouts/default.7aa9a8401f29adb14ade.js",
    "revision": "aed713de057544f6ee9b8ac9dda144d7"
  },
  {
    "url": "/assets/manifest.290c643eb872dd972ece.js",
    "revision": "9f2ce3534199a60ef04818f62aed680f"
  },
  {
    "url": "/assets/modal.888e250548e22562acb5.js",
    "revision": "a910fefdbe74e6d01279a7f097f73ddf"
  },
  {
    "url": "/assets/pages/about/index.a774a1e75787f2b3b84d.js",
    "revision": "4378940787a9cd054d3d26a3f9668f09"
  },
  {
    "url": "/assets/pages/account/index.26962afb09bfdb67dcb4.js",
    "revision": "a1cef7e39be63167d189e2610899caa0"
  },
  {
    "url": "/assets/pages/account/signin.469174452e099de3ac29.js",
    "revision": "bbf710538ffb1c9ace3096e52aff9deb"
  },
  {
    "url": "/assets/pages/account/signup.d00d43541870737ec958.js",
    "revision": "0894cf0a6b8bb4e5128eb155deaaf3a2"
  },
  {
    "url": "/assets/pages/admin/company/index.6db4cd90f3831780fd3a.js",
    "revision": "e807d5edd8f849d4797043a0a25aa5df"
  },
  {
    "url": "/assets/pages/admin/dictionaries/index.3fe1193d28058233b027.js",
    "revision": "ee63af635f7329790520350f0dd13001"
  },
  {
    "url": "/assets/pages/admin/index.53c9afb16a96c0b49b19.js",
    "revision": "462fa3a33a6795c73685476c8fa6e481"
  },
  {
    "url": "/assets/pages/admin/orders/index.5ebdc5cd5997dd0fb2d4.js",
    "revision": "4f30456e589aafe44bd46c2e25ef6e40"
  },
  {
    "url": "/assets/pages/admin/products/index.68e6a11b6754833ec4e5.js",
    "revision": "332a15889d7b64e7dd029794da82a1a2"
  },
  {
    "url": "/assets/pages/admin/questions/index.f855c947706de9f2b794.js",
    "revision": "dcede9057a171c2617f5b1b38ef24bb4"
  },
  {
    "url": "/assets/pages/admin/requests/index.5e7452adf6f26b1551db.js",
    "revision": "de53e27e7ff6e2a46c21bbc185e12173"
  },
  {
    "url": "/assets/pages/admin/reviews/index.2ddf4668140aba384838.js",
    "revision": "2e3f0af33d7ae75f9dc74f8b4fb0b5af"
  },
  {
    "url": "/assets/pages/admin/system/index.eec87194e9df2a893134.js",
    "revision": "0fd27287c359df64e886844c57fcf570"
  },
  {
    "url": "/assets/pages/admin/users/index.978ed28a207234c848b2.js",
    "revision": "1d1964410a8f8ab5443314a557b29529"
  },
  {
    "url": "/assets/pages/cart/index.6a983ce63be962db0a04.js",
    "revision": "2d85d5236a05ce4b4a018239a6669a9c"
  },
  {
    "url": "/assets/pages/catalog/_group/_category/_id.2d1efbfef524f96be482.js",
    "revision": "81c1636a15747672b5d9cc2f65e153a8"
  },
  {
    "url": "/assets/pages/catalog/_group/_category/index.fd20591431371d3cdd1d.js",
    "revision": "b0053339831922c7161cb162af61508a"
  },
  {
    "url": "/assets/pages/catalog/_group/index.05841e15bbe300ba4968.js",
    "revision": "03e9db1c83ad680ba6638cb3a870a9d0"
  },
  {
    "url": "/assets/pages/catalog/index.cb80bbf7dd610c1f7656.js",
    "revision": "ec787ad90aa79f318a079d5ad0e2c8f4"
  },
  {
    "url": "/assets/pages/index.f9623167568c14643801.js",
    "revision": "6f73e1dc9dad6f9f3958e7ac47169290"
  }
])


workboxSW.router.registerRoute(new RegExp('/assets/.*'), workboxSW.strategies.cacheFirst({}), 'GET')

workboxSW.router.registerRoute(new RegExp('/.*'), workboxSW.strategies.networkFirst({}), 'GET')

