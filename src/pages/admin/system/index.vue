<template>
  <div>
    <el-button @click="getData" type="success">
      Снять копию базы данных <br>
      <img src="~/assets/icons/admin/dns.svg" id="data_dump_icon" alt="Data Dump">
    </el-button>
    <el-button @click="generateSitemap" type="success">
      Сгенерировать Sitemap.xml <br>
      <img src="~/assets/icons/admin/map.svg" id="site_map_icon" alt="Site map icon">
    </el-button>
    <el-button @click="loadErrorLog" type="success">
      Загрузить логи ошибок <br>
      <img src="~/assets/icons/admin/history.svg" id="error_log_icon" alt="Load err log">
    </el-button>
    <div v-if="errLog">
      <hr>
      <el-popover
        placement="top"
        width="220"
        v-model="clearLogPopover">
        <div style="margin: 12px;">
          <p style="text-align:left;">Введите пароль:</p>
          <el-input type="password" v-model="password" auto-complete="off"></el-input>
          <div style="text-align: right; margin-top: 10px">
            <el-button size="mini" type="text" @click="clearLogPopover = false">Отмена</el-button>
            <el-button type="danger" size="mini" @click="clearErrorLog">Удалить</el-button>
          </div>
        </div>
        <el-button @click="clearLogPopover = true" type="warning" slot="reference">
          Очистить логи ошибок <br>
          <img src="~/assets/icons/admin/clear.svg" id="clear_log_icon" alt="Clear err log">
        </el-button>
      </el-popover>
      <el-collapse accordion id="error_accordion">
        <el-collapse-item
          v-for="(err, idx) in errLog" :key="idx" :name="idx"
          :title="`${new Date(err.time).toLocaleString()}: ${typeof err.data === 'string' ? ': ' + err.data.slice(0, 140) + '...' : 'Object error'}`">
          {{ err.data }}
        </el-collapse-item>
      </el-collapse>
    </div>
  </div>
</template>

<script>
  import {db, fs} from "@/services/fireinit";
  import JSZip from 'jszip'
  import FileSaver from 'file-saver'

  export default {
    name: "index",
    layout: 'admin',
    data() {
      return {
        errLog: '',
        clearLogPopover: false,
        password: '',
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
      getData() {
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
                this.$message({type: 'success', message: 'Архив базы данных создан. Сохраните его в надежном месте.'})
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
      generateSitemap() {
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
                FileSaver.saveAs(content, 'santehnika_sitemap_' + date + '.zip')
                this.$store.dispatch('LOADING', false)
                this.$message({type: 'success', message: 'Архив с файлом sitemap.xml создан.'})
              })
              .catch(err => {
                console.log(err)
                this.$store.dispatch('LOADING', false)
              })
          })
      },
      loadErrorLog() {
        db.ref('errLog').orderByKey().once('value', snap => {
          if (!snap.exists()) {
            return this.$message({type: 'success', message: 'Ошибки отсутствуют.'})
          }
          this.errLog = snap.val()
        })
      },
      async clearErrorLog() {
        this.clearLogPopover = false
        if (this.password !== 'panda') {
          return this.$message({type: 'danger', message: 'Неверный пароль'})
        }
        await db.ref('errLog').remove()
        this.errLog = ''
      }
    }
  }
</script>

<style scoped>
  #data_dump_icon,
  #site_map_icon,
  #error_log_icon,
  #clear_log_icon {
    margin-top: 8px;
  }

  #error_accordion {
    margin: 10px;
  }
</style>
