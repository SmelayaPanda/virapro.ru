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
    "url": "/assets/27.65e5de29a878802027b0.js",
    "revision": "22c909d1302b4fd11c6f965911a27773"
  },
  {
    "url": "/assets/28.d75ac66742968d97ee60.js",
    "revision": "7a6416948323544f853d7f0bf818818e"
  },
  {
    "url": "/assets/app.af1cc8d20f3064d44b18.js",
    "revision": "c012d517c9fe39e7115dac5ddb63d590"
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
    "url": "/assets/common.33dcb42f9287439bec5b48ff44a4b935.css",
    "revision": "e3df35783bfe0021b09d4d2aee9b5121"
  },
  {
    "url": "/assets/layouts/admin.dc6dbc6ccbe61bd7f4d6.js",
    "revision": "26add39f40f8f140e93edbca31447cc4"
  },
  {
    "url": "/assets/layouts/default.3db74c3d6435574e31b1.js",
    "revision": "7ff46bc29137d9fc9c8d27f856e1d8d8"
  },
  {
    "url": "/assets/manifest.963e17a7a0c3f0c13c73.js",
    "revision": "3230d1750e1b2faf291e7ca8870d6458"
  },
  {
    "url": "/assets/modal.888e250548e22562acb5.js",
    "revision": "a910fefdbe74e6d01279a7f097f73ddf"
  },
  {
    "url": "/assets/pages/about/index.bce9aed5d01fcde38fc6.js",
    "revision": "e9b6a7ac95a88910b2433092484d8e58"
  },
  {
    "url": "/assets/pages/account/index.5a8208a2b813ede68e16.js",
    "revision": "3cdccd2765550ebec4db818da10c7419"
  },
  {
    "url": "/assets/pages/account/signin.d982c6b56871f56d04d2.js",
    "revision": "64cd9a456eff9948527276c3a41f3ca4"
  },
  {
    "url": "/assets/pages/account/signup.d00d43541870737ec958.js",
    "revision": "0894cf0a6b8bb4e5128eb155deaaf3a2"
  },
  {
    "url": "/assets/pages/admin/company/index.5a2eb066a462c5ca1e2a.js",
    "revision": "e4f938a2f04d7481442ba3cd78511a24"
  },
  {
    "url": "/assets/pages/admin/dictionaries/index.0d674205373c8357fe00.js",
    "revision": "cbb6b6719242f65d4629ba8c6473c2bc"
  },
  {
    "url": "/assets/pages/admin/index.3af8b7b43304ac815be5.js",
    "revision": "be429034df51e79d392ba49675cba4f9"
  },
  {
    "url": "/assets/pages/admin/orders/index.e8a4bf9b1d5410d36089.js",
    "revision": "5e012c57c44982814fea861663af29b0"
  },
  {
    "url": "/assets/pages/admin/products/index.a66d1769c03d82c61740.js",
    "revision": "034bc71a1c27acd18df7d6e2ce347dcb"
  },
  {
    "url": "/assets/pages/admin/questions/index.8fb7598a1bb6b2db0469.js",
    "revision": "a49bf64a02b523f338af1a88ac7ea62a"
  },
  {
    "url": "/assets/pages/admin/requests/index.d6550031e4ceb3c122e1.js",
    "revision": "1a140637f40a9febcc44af62e6549aee"
  },
  {
    "url": "/assets/pages/admin/reviews/index.35d839c9970d7b758d06.js",
    "revision": "38ed67a072ba322c9c934f382cb347af"
  },
  {
    "url": "/assets/pages/admin/system/index.ca3907c9e2505a6c2846.js",
    "revision": "6836f6d12c3cfab89c283d01b4fbc9ae"
  },
  {
    "url": "/assets/pages/admin/users/index.bd84dfbb268453b37194.js",
    "revision": "96a1c655161b0c30d6818bedc800eb77"
  },
  {
    "url": "/assets/pages/cart/index.16a6d95cad10d8c984b3.js",
    "revision": "4d571de9380732aa25f53fa6b4e539da"
  },
  {
    "url": "/assets/pages/catalog/_group/_category/_id.281b47abf74b44ba00b4.js",
    "revision": "92be8358f0e5ae0f44d3b0d3bef8c5ac"
  },
  {
    "url": "/assets/pages/catalog/_group/_category/index.cc5ff9805c0161293fc4.js",
    "revision": "6802543972ea12315f31d3e2586edc1c"
  },
  {
    "url": "/assets/pages/catalog/_group/index.719978821214b33022e8.js",
    "revision": "48fd6843bed9d1b53e5a9bc2a3e19a0d"
  },
  {
    "url": "/assets/pages/catalog/index.5069d41830d1ca51b7d2.js",
    "revision": "71715bd1678b5140b73ce2d0f1947d12"
  },
  {
    "url": "/assets/pages/index.94a64e2f45d3f0f1a292.js",
    "revision": "02c443b3ec42b0e53b6cb716ab9bade4"
  }
])


workboxSW.router.registerRoute(new RegExp('/assets/.*'), workboxSW.strategies.cacheFirst({}), 'GET')

workboxSW.router.registerRoute(new RegExp('/.*'), workboxSW.strategies.networkFirst({}), 'GET')

