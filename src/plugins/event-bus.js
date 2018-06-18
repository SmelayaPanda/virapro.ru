import Vue from 'vue'

const eventBus = {}

eventBus.install = function (Vue) {
  Vue.prototype.$bus = new Vue()
}

Vue.use(eventBus)


// this.$bus.$emit('event-name', data)
//
// this.$bus.$on('event-name', (data) => {
//     doSomething(data)
// })
