import Vue from 'vue'
import App from './App.vue'
import router from './router'
import vuetify from './plugins/vuetify';
import axios from 'axios'
import store from './store'

Vue.config.productionTip = false
axios.defaults.baseURL = 'http://localhost:3000/api/'
axios.interceptors.request.use(function (config) {
  const token = window.localStorage.getItem('token')
  config.headers.token =  token
  return config
})

new Vue({
  vuetify,
  router,
  store,
  render: h => h(App)
}).$mount('#app')
