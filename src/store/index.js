import Vue from 'vue'
import Vuex from 'vuex'
import Favourites from './fav/store'
import Auth from './auth'
import Product from './product/store'
// import { PluginsStorage } from '@capacitor/core';

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
  },
  mutations: {
  },
  actions: {
  },
  modules: {
    product:Product,
    favourites: Favourites,
    auth: Auth
  }
})
