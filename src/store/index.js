import Vue from 'vue'
import Vuex from 'vuex'
import Favourites from './fav/store'
import Auth from './auth'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
  },
  mutations: {
  },
  actions: {
  },
  modules: {
    favourites: Favourites,
    auth: Auth
  }
})
