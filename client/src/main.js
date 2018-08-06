// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import store from './store'

import VueLocalStorage from 'vue-localstorage'
import VueJWT from 'vuejs-jwt'
import Toasted from 'vue-toasted'

import VueGoodTablePlugin from 'vue-good-table'
import 'vue-good-table/dist/vue-good-table.css'

import vue2Dropzone from 'vue2-dropzone'
import 'vue2-dropzone/dist/vue2Dropzone.min.css'

import vSelect from 'vue-select'

import VueChartkick from 'vue-chartkick'
import Chart from 'chart.js'

import VeeValidate from 'vee-validate'

Vue.use(VueChartkick, {adapter: Chart})

Vue.use(VueJWT, {'keyName': 'jwt'})
Vue.use(VueLocalStorage, {name: 'ls', bind: true})
Vue.use(Toasted)
Vue.use(VueGoodTablePlugin)

Vue.use(require('vue-moment'))

Vue.component('v-select', vSelect)
Vue.component('v-dropzone', vue2Dropzone)

Vue.use(VeeValidate, {fieldsBagName: 'vvFieldsBag'})

Vue.config.productionTip = false

Vue.mixin({
  methods: {
    isAdmin: function () {
      var token = this.$jwt.decode()
      return token.data.admin
    }
  }
})

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: {App},
  template: '<App/>',
  methods: {}
})
