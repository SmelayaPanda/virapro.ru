const functions = require('firebase-functions');
const { Nuxt } = require('nuxt');
const express = require('express');
const app = express();

const config = {
  dev: false,
  debug: true,
  plugins: [
      '../../src/plugins/element-ui',
      '../../src/plugins/vuetify'
  ],
  css: [
      {src: 'element-ui/lib/theme-chalk/index.css'},
      {src: 'vuetify/dist/vuetify.min.css'}
  ],
  buildDir: 'nuxt',
  build: {
    vendor: ['element-ui', 'vuetify', 'firebase'],
    publicPath: '/assets/',
    presets: ['es2015', 'stage-0'],
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
