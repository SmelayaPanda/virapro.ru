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
    "url": "/assets/app.da56ed6c95c7fa4f5520.js",
    "revision": "0c565dd0a207aaa08d5af9ffb25e6da8"
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
    "url": "/assets/common.aaa4b39b3638796ee106150fa074eab3.css",
    "revision": "310f727e20879eaef51b180c591906d5"
  },
  {
    "url": "/assets/layouts/admin.85e7d68121240c0e4b15.js",
    "revision": "a9ea407bde41c0ba42b68166da944bd8"
  },
  {
    "url": "/assets/layouts/default.f23b0d07722fb96e43c5.js",
    "revision": "45d46dec593695e990d878f9c8e4493a"
  },
  {
    "url": "/assets/manifest.6bcc66fa94cea9b00ec1.js",
    "revision": "b18612500dc758343b9c9654849a05a3"
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
    "url": "/assets/pages/admin/index.2b7ba9239995ca8fe363.js",
    "revision": "bea52c1592ef76e5352473d16a770285"
  },
  {
    "url": "/assets/pages/admin/orders/index.5ebdc5cd5997dd0fb2d4.js",
    "revision": "4f30456e589aafe44bd46c2e25ef6e40"
  },
  {
    "url": "/assets/pages/admin/products/index.a0003b4698034c2e9e76.js",
    "revision": "a1551367bcacd47ac7774f64ce3446fe"
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
    "url": "/assets/pages/catalog/_group/_category/_id.0aee195341f80c086aa7.js",
    "revision": "cb653185665b7ab6ad17d6f817fcc174"
  },
  {
    "url": "/assets/pages/catalog/_group/_category/index.188ecdb12de49d2ced8b.js",
    "revision": "0663fb018938923112c00d24a3feaeeb"
  },
  {
    "url": "/assets/pages/catalog/_group/index.3e5ca356dcac5a6144d1.js",
    "revision": "4e89ab65303842006b77d7e4ba790489"
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

