import Vue from 'vue'

Vue.filter('price', val => val.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ' '))

Vue.filter('date', val => {
  const date = new Date(val)
  let options = {
    // year: 'numeric',
    month: 'long',
    day: 'numeric',
    weekday: 'long',
    // timezone: 'UTC'
    hour: 'numeric',
    minute: 'numeric'
  }
  return date.toLocaleString('ru', options)
})
