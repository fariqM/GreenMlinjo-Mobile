import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import vuetify from './plugins/vuetify'
import AXIOS from "axios";
import { Storage } from '@capacitor/storage';
import { Capacitor } from '@capacitor/core';

// iziToast
import izi_Toast from 'izitoast'
import "./plugins/iziToast.min.css"
window.iziToast = izi_Toast

// tap n hold directive
var VueTouch = require('vue-touch')
Vue.use(VueTouch, {name: 'v-touch'})


// base server ip
// const { SplashScreen } = Plugins
window.platform = Capacitor.getPlatform();
const __BASE_URL_SERVER = 'http://192.168.1.7:8888/';
const __API_PREFIX = 'api'

// non-auth url
window.axios_open = AXIOS.create({
  baseURL: `${__BASE_URL_SERVER}${__API_PREFIX}`,
  timeout: 3000,
});
window.__BASE_URL__ = __BASE_URL_SERVER

// lodash
window._ = require('./plugins/lodash_plugins/lodash.min.js');

// get token from shared preference on mobile device
// const { Storage } = Plugins;
async function getToken() {
  const { value } = await Storage.get({ key: 'mlinjo_token' });
  return value;
};

// element.requestFullscreen()

// preparation for bearer key (if its exist)
let mlinjo_key = null;
async function prepare() {
  window.axios = AXIOS;
  await getToken().then(token => {
    console.log("my-token => " + token);
    // SplashScreen.hide();
    mlinjo_key = token
    axios.defaults.baseURL = `${__BASE_URL_SERVER}${__API_PREFIX}/v1/`;
    axios.defaults.headers.Authorization = `Bearer ${mlinjo_key}`;
    axios.defaults.timeout = 30000;
  }).catch(e => {
    SplashScreen.hide();
    axios.defaults.baseURL = `${__BASE_URL_SERVER}${__API_PREFIX}/v1/`;
    axios.defaults.headers.Authorization = `Bearer ${mlinjo_key}`;
    axios.defaults.timeout = 30000;
  })
  // if (platform == 'android') {

  // } else {
  //   window.axios = AXIOS;
  //   axios.defaults.baseURL = `${__BASE_URL_SERVER}${__API_PREFIX}/a/`;
  //   axios.defaults.headers.Authorization = `Bearer ${localStorage.getItem('_cap_mlinjo_token')}`;
  // }
}

window.__input_helper__ = ""

Vue.config.productionTip = false;

// another component
Vue.component('skeleton', require("./views/components/skeleton/Skeleton.vue").default);
Vue.component('mlj-toolbar', require("./views/components/Toolbar.vue").default)

// is preparation for bearer complete then render the app
prepare().then(() => {
  new Vue({
    router,
    store,
    vuetify,
    render: h => h(App),
  }).$mount('#app')
})


