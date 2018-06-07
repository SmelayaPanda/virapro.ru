import Vue from 'vue'

Vue.filter('price', val => val.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ' '))
