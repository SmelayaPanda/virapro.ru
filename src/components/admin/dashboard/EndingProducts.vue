<template>
  <el-card style="height: 100%" :body-style="{ padding: '20px'}">
    <div slot="header" class="clearfix">
      <h3>Заканчивающиеся товары</h3>
    </div>
    <el-row type="flex" v-for="p in products" :key="p.productId">
      <el-col :span="17">
        <nuxt-link :to="`/catalog/${p.group}/${p.category}/${p.productId}`">
          <p><span style="color: grey; margin-right: 10px;">{{ p.totalQty }} ед. </span>{{ p.title }}</p>
        </nuxt-link>
      </el-col>
    </el-row>
  </el-card>
</template>

<script>
  import {db, fs} from '@/services/fireinit'

  export default {
    name: "EndingProducts",
    data() {
      return {
        products: []
      }
    },
    created() {
      let arr = []
      fs.collection('products').where('totalQty', '<', 2).get()
        .then(snap => {
          snap.docs.forEach(doc => {
            arr.push(doc.data())
          })
          this.products = arr
        })
    }
  }
</script>

<style scoped>
  h3 {
    margin: 0;
  }

  p {
    margin: 10px;
  }
</style>
