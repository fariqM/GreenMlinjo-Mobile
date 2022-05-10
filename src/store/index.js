import Vue from 'vue'
import Vuex from 'vuex'
import Favourites from './fav/store'
import Auth from './auth'
import Product from './product/store'
import Cart from './cart/store'
import Order from './order'
import Voucher from "./voucher"

// import { Plugins } from '@capacitor/core';
// const { Storage } = Plugins;

// async function setItem(key, value) {
//   await Storage.set({
//       key: key,
//       value: token
//   });
// };

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    mapAddress: null,
    textMapAddress: "",
    checkOut: null,
    addressForm: {
      contact: "",
      phone: "",
      fullAddress: "",
      road: "",
      details: "",
    },
  },
  mutations: {
    setMapAddress(state, payload) {
      state.mapAddress = payload.fullAddress
      state.textMapAddress = payload.text
    },
    setcheckOut(state, payload) {
      state.checkOut = payload
    },
    setAddressForm(state, payload) {
      state.addressForm = payload
    },
  },
  actions: {},
  getters: {
    getcheckOut: state => state.checkOut,
    getTextMapAddress: state => state.textMapAddress,
    getAddressForm: state => state.addressForm,
  },
  modules: {
    products: Product,
    favourites: Favourites,
    auth: Auth,
    carts: Cart,
    orders: Order,
    vouchers: Voucher
  }
})
