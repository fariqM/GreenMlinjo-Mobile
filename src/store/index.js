import Vue from 'vue'
import Vuex from 'vuex'
import Favourites from './fav/store'
import Auth from './auth'
import Product from './product/store'
import Cart from './cart/store'
import Order from './order'
import Voucher from "./voucher"
import Other from "./other"
import Transaction from "./transaction"

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
    markets: null,
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
    setMarkets(state, payload) {
      state.markets = payload
    }
  },
  actions: {
    fetchMarkets(state) {
      return new Promise((resolve, reject) => {
        axios_open.get("markets-index").then(r => {
          state.commit("setMarkets", r.data.data)
          resolve(r)
        }).catch(e => {
          reject(e)
        })
      })
    }
  },
  getters: {
    getcheckOut: state => state.checkOut,
    getTextMapAddress: state => state.textMapAddress,
    getAddressForm: state => state.addressForm,
    getMarkets: state => state.markets
  },
  modules: {
    products: Product,
    favourites: Favourites,
    auth: Auth,
    carts: Cart,
    orders: Order,
    vouchers: Voucher,
    others: Other,
    transactions: Transaction,
  }
})
