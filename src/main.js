import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import vuetify from './plugins/vuetify'
import AXIOS from "axios";
import { Capacitor } from '@capacitor/core';



Vue.config.productionTip = false;

window.axios = AXIOS;
window.axios_api = AXIOS;
window.axios_api.defaults.headers.common['X-Requested-With'] = 'XMLHttpRequest';
axios_api.defaults.withCredentials = true;
axios_api.defaults.baseURL = 'http://192.168.1.9:8888/api/';


const http = AXIOS.create({
  baseURL: 'http://192.168.1.9:8888/api/',
  headers: {
    Authorization: `Bearer ${localStorage.getItem("mlinjo_token")}`,
  }
});

const open_http = AXIOS.create({
  baseURL: 'http://192.168.1.9:8888/api/',
});

Vue.prototype.$http = http;
Vue.prototype.$open_http = open_http;
Vue.prototype.$platform = Capacitor.getPlatform();



new Vue({
  router,
  store,
  vuetify,
  render: h => h(App)
}).$mount('#app')
