<template>
  <div>
    <h1>Системные функции</h1>
    <el-button @click="getData" type="success">
      Снять копию базы данных <br>
      <img src="~/assets/icons/admin/dns.svg" id="data_dump_icon" alt="Data Dump">
    </el-button>
    <el-button @click="generateSitemap" type="success">
      Сгенерировать Sitemap.xml <br>
      <img src="~/assets/icons/admin/map.svg" id="site_map_icon" alt="Site map icon">
    </el-button>
  </div>
</template>

<script>
  import {fs} from "@/services/fireinit";
  import JSZip from 'jszip'
  import FileSaver from 'file-saver'

  export default {
    name: "index",
    layout: 'admin',
    data () {
      return {
        collections: [
          'companyInfo',
          'dictionaries',
          'orders',
          'products',
          'reviews',
          'statistics',
          'users'
        ]
      }
    },
    methods: {
      getData () {
        let zip = new JSZip()
        this.$store.dispatch('LOADING', true)

        let getCollectionData = function (name) {
          return fs.collection(name).get()
            .then(snap => {
              let data = {}
              snap.docs.forEach(el => {
                data[el.id] = el.data()
              })
              zip.file(name + '.json', JSON.stringify(data))
            })
        }
        let actions = []
        this.collections.forEach(name => actions.push(getCollectionData(name)))

        Promise.all(actions)
          .then(() => {
            zip.generateAsync({type: 'blob'})
              .then((content) => {
                FileSaver.saveAs(content, 'santehnika_dump_' + new Date().toLocaleString() + '.zip')
                this.$store.dispatch('LOADING', false)
              })
              .catch(err => {
                console.log(err)
                this.$store.dispatch('LOADING', false)
              })
          })
          .catch(err => {
            console.log(err)
          })
      },
      generateSitemap () {
        this.$store.dispatch('LOADING', true)
        let zip = new JSZip()
        let xml = ''
        fs.collection('products').get()
          .then(snap => {
            xml = '<?xml version="1.0" encoding="UTF-8"?><urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">'
            let URL = 'https://nuxt-shop-205015.firebaseapp.com/' // TODO: replace by real domain
            let mainPages = ['', 'catalog', 'about']
            let lastmod = new Date().toISOString()
            mainPages.forEach(el => {
              xml += `<url><loc>${URL}${el}/</loc><lastmod>${lastmod}</lastmod></url>`
            })
            snap.docs.forEach(doc => {
              doc.data()
              xml += `<url><loc>${URL}catalog/${doc.data().group}/${doc.data().category}/${doc.id}/</loc></url>`
            })
            xml += '</urlset>'
            zip.file('sitemap.xml', xml)
            zip.generateAsync({type: 'blob'})
              .then((content) => {
                let date = new Date().toISOString().substring(0, 10)
                FileSaver.saveAs(content, 'sitemap_' + date + '.zip')
                this.$store.dispatch('LOADING', false)
              })
              .catch(err => {
                console.log(err)
                this.$store.dispatch('LOADING', false)
              })
          })
      }
    }
  }
</script>

<style scoped>
  #data_dump_icon,
  #site_map_icon{
    margin-top: 8px;
  }
</style>
