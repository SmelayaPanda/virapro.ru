const functions = require('firebase-functions');
const { Nuxt } = require('nuxt');
const express = require('express');
const app = express();

const config = {
  dev: false,
  plugins: [
      '../../src/plugins/element-ui'
  ],
  css: [
      {src: 'element-ui/lib/theme-chalk/index.css'}
  ],
  buildDir: 'nuxt',
  build: {
    vendor: ['element-ui'],
    publicPath: '/assets/'
  }
}
const nuxt = new Nuxt(config);

function handleRequest(req, res) {
  res.set('Cache-Control', 'public, max-age=150, s-maxage=150');
  return new Promise((resolve, reject) => {
    nuxt.render(req, res, promise => {
      promise.then(resolve).catch(reject)
    })
  });
}

app.use(handleRequest);
exports.nuxtssr = functions.https.onRequest(app);
