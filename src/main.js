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
const { SplashScreen } = Plugins
const __BASE_URL_SERVER = 'http://192.168.1.9:8888/';
const __API_PREFIX = 'api'

window.axios_open = AXIOS.create({
  baseURL: `${__BASE_URL_SERVER}${__API_PREFIX}`
});

window.__BASE_URL__ = __BASE_URL_SERVER
window.platform = Capacitor.getPlatform();

// shared preference mobile
const { Storage } = Plugins;
async function getToken() {
  const { value } = await Storage.get({ key: 'mlinjo_token' });
  return value;
};


let mlinjo_key = null;



async function prepare() {
  if (platform == 'android') {
    window.axios = AXIOS;
    await getToken().then(token => {
    console.log("my-token => " + token);
      SplashScreen.hide();
      mlinjo_key = token
      axios.defaults.baseURL = `${__BASE_URL_SERVER}${__API_PREFIX}/a/`;
      axios.defaults.headers.Authorization = `Bearer ${mlinjo_key}`
    }).catch(e => {
      SplashScreen.hide();
      axios.defaults.baseURL = `${__BASE_URL_SERVER}${__API_PREFIX}/a/`;
      axios.defaults.headers.Authorization = `Bearer ${mlinjo_key}`
    })
  } else {
    window.axios = AXIOS;
    axios.defaults.baseURL = `${__BASE_URL_SERVER}${__API_PREFIX}`;
    axios.defaults.headers.Authorization = `Bearer empty`;
  }
}


Vue.config.productionTip = false;
Vue.use(VueIziToast);


Vue.component('skeleton', require("./views/components/skeleton/Skeleton.vue").default);

prepare().then(() => {
  new Vue({
    router,
    store,
    vuetify,
    render: h => h(App),
  }).$mount('#app')
})


