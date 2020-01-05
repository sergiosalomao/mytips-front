import Vue from 'vue'
import App from './App.vue'
import vuetify from './plugins/vuetify';
import './plugins/toasted'

import router from './config/router'


import axios from 'axios'
Vue.prototype.$http = axios


new Vue({
  
  router,
  vuetify,

  render: h => h(App)
}).$mount('#app')
