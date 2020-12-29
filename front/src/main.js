import Vue from 'vue'
import App from './App.vue'
import router from './router'
import vuetify from './plugins/vuetify';
import axios from 'axios'

Vue.config.productionTip = false
axios.defaults.baseURL = 'http://localhost:3000/api/'

new Vue({
  vuetify,
  router,
  render: h => h(App)
}).$mount('#app')
