import Vue from 'vue'
import App from './App.vue'
import router from './router'
import vuetify from './plugins/vuetify'
import axios from 'axios'

Vue.config.productionTip = false
axios.defaults.baseURL = 'https://resolved-grooves.000webhostapp.com/';

new Vue({
  router,
  vuetify,
  render: h => h(App)
}).$mount('#app')
