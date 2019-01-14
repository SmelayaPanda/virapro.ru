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
    "url": "/assets/app.46bae90496ac3f9d63d1.js",
    "revision": "7daa9900f00c19a208c22c2fffcaeabc"
  },
  {
    "url": "/assets/below-slider.4af04bbb602d7faf2165.js",
    "revision": "1f360f3db320fe060c17c0c7b19c6c47"
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
    "url": "/assets/layouts/admin.7130b7ca87562bb642d2.js",
    "revision": "086d918ba1ba1b3d5ef33339a3dc229d"
  },
  {
    "url": "/assets/layouts/default.1a10a16d7a1fb550ea45.js",
    "revision": "14fcaf7035a21cc4166cc7fad1a6e5bd"
  },
  {
    "url": "/assets/manifest.530a80728c4642f51f0a.js",
    "revision": "739efddc1c2487c1d7e1e0120381b467"
  },
  {
    "url": "/assets/modal.888e250548e22562acb5.js",
    "revision": "a910fefdbe74e6d01279a7f097f73ddf"
  },
  {
    "url": "/assets/pages/about/index.f596fadbd57bb436a58a.js",
    "revision": "53fa876f974a710237588ba4283a2012"
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
    "url": "/assets/pages/admin/index.54b389b34a358e27b35b.js",
    "revision": "3073e6abd74dd08b456a7862b88ae1d1"
  },
  {
    "url": "/assets/pages/admin/orders/index.5ebdc5cd5997dd0fb2d4.js",
    "revision": "4f30456e589aafe44bd46c2e25ef6e40"
  },
  {
    "url": "/assets/pages/admin/products/index.5a89a2e5ccb7bbdd1136.js",
    "revision": "f66d48b1808375a63b78ceef64e909ed"
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
    "url": "/assets/pages/cart/index.21f5b5d8866c7fcf4472.js",
    "revision": "59cf002c95ce5cd999f18ee8b32872f0"
  },
  {
    "url": "/assets/pages/catalog/_group/_category/_id.46e0dbbe201a2d0f81e7.js",
    "revision": "689215f57209e3fdcc85e8b3f831e85f"
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
    "url": "/assets/pages/catalog/index.a83c4a496fe75d1e6e49.js",
    "revision": "dbb3bb3ddacc9c9f66fa212eb4b9a5f7"
  },
  {
    "url": "/assets/pages/index.f9623167568c14643801.js",
    "revision": "6f73e1dc9dad6f9f3958e7ac47169290"
  }
])


workboxSW.router.registerRoute(new RegExp('/assets/.*'), workboxSW.strategies.cacheFirst({}), 'GET')

workboxSW.router.registerRoute(new RegExp('/.*'), workboxSW.strategies.networkFirst({}), 'GET')

