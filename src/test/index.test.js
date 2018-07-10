import test from 'ava'
import express from 'express'
import { Nuxt, Builder } from 'nuxt'
import { resolve } from 'path'

const port = 4000
let nuxt = null
let server = null

test.before('Init Nuxt.js', async t => {
  const app = express()
  const rootDir = resolve(__dirname, '..')
  let config = {}

  try {
    config = require(resolve(rootDir, 'nuxt.config.js'))
  } catch (e) {
    console.log('Unable to locate nuxt config!')
  }

  config.rootDir = rootDir
  config.dev = false

  nuxt = new Nuxt(config)

  await new Builder(nuxt).build()

  app.use(nuxt.render)

  server = app.listen(port)
})

test('Route / exits and render HTML', async t => {
  let context = {}
  const { html } = await nuxt.renderRoute('/', context)
  t.true(html.includes('Главная'))
})

test('Route / exits and render HTML with CSS applied', async t => {
  const window = await nuxt.renderAndGetWindow('http://localhost:4000/')
  const element = window.document.querySelector('.nuxt-link-active')
  t.not(element, null)
  t.is(element.textContent, 'Главная')
  // t.is(element.className, 'nuxt-link-exact-active')
  t.is(window.getComputedStyle(element).color, 'rgb(9, 118, 212)')
})

test.after('Closing server and nuxt.js', t => {
  server.close()
  nuxt.close()
})
