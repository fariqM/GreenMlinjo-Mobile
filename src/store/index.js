import Vue from 'vue'
import Vuex from 'vuex'
import Favourites from './fav/store'
import Auth from './auth'
import Product from './product/store'
import { Plugins } from '@capacitor/core';
const { Storage } = Plugins;

async function setItem(key, value) {
  await Storage.set({
      key: key,
      value: token
  });
};

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
  },
  mutations: {
  },
  actions: {
  },
  modules: {
    products:Product,
    favourites: Favourites,
    auth: Auth
  }
})
