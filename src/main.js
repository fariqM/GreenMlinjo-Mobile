import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import vuetify from './plugins/vuetify'
import AXIOS from "axios";
import { Capacitor, Plugins } from '@capacitor/core';
import VueIziToast from "vue-izitoast";
import 'izitoast/dist/css/iziToast.css';
// import VueSkeletonLoader from 'skeleton-loader-vue';



const __BASE_URL_SERVER = 'http://192.168.1.9:8888/';
const __API_PREFIX = 'api'

window.platform = Capacitor.getPlatform();

// shared preference mobile
const { Storage } = Plugins;
async function getToken() {
  const { value } = await Storage.get({ key: 'mlinjo_token' });
  return value;
};

window.axios_open = AXIOS;
axios_open.defaults.baseURL = `${__BASE_URL_SERVER}${__API_PREFIX}`;
let mlinjo_key = null;

if (platform == 'android') {
  window.axios = AXIOS;
  getToken().then(token => {
    mlinjo_key = token
    axios.defaults.baseURL = `${__BASE_URL_SERVER}${__API_PREFIX}`;
    axios.defaults.headers.Authorization = `Bearer ${mlinjo_key}`
  }).catch(e => {
    axios.defaults.baseURL = `${__BASE_URL_SERVER}${__API_PREFIX}`;
    axios.defaults.headers.Authorization = `Bearer ${mlinjo_key}`
  })
} else {
  window.axios = AXIOS;
  axios.defaults.baseURL = `${__BASE_URL_SERVER}${__API_PREFIX}`;
  axios.defaults.headers.Authorization = `Bearer empty`;
}

Vue.config.productionTip = false;
Vue.use(VueIziToast);


Vue.component('skeleton', require("./views/components/skeleton/Skeleton.vue").default);

new Vue({
  router,
  store,
  vuetify,
  render: h => h(App)
}).$mount('#app')
