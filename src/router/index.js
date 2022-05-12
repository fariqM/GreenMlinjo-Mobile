// import { Plugins } from '@capacitor/core';

// const { Storage } = Plugins;
import { Storage } from '@capacitor/storage';

import Vue from 'vue'
import VueRouter from 'vue-router'
import Error404 from '../views/errors/404.vue'
// guest
import Login from '../views/guest/Login.vue'
import Register from '../views/guest/Register.vue'
import Landing from '../views/guest/Landing.vue'
// main-page
import LayoutMenu from '../views/layouts/MenuLayout.vue'
import Home from '../views/Home.vue'
import Notification from '../views/Notification.vue'
import Pesanan from '../views/Pesanan.vue'
import Profile from '../views/Profile.vue'

// other page
import TestingPage from "../views/components/Testing.vue"

import Favourites from "../views/pages/Favourites.vue"
import Carts from "../views/pages/Cart.vue"
import Chat from "../views/pages/Chat.vue"
import MapsExample from "../views/components/Maps"
import Shipping from "../views/pages/Shipping.vue"
import Address from "../views/pages/Address.vue"
import AddAddress from "../views/pages/AddAddress.vue"
import Delivery from "../views/pages/Ordering.vue"




Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'landing',
    component: Landing
  },
  {
    path: '/login',
    name: 'login',
    component: Login
  },
  {
    path: '/register',
    name: 'register',
    component: Register
  },
  {
    path: '/my-favourites',
    name: 'favourites',
    component: Favourites
  },
  {
    path: '/my-carts',
    name: 'carts',
    component: Carts
  },
  {
    path: '/chat-list',
    name: 'chat',
    component: Chat
  },
  {
    path: '/maps-example',
    name: 'example',
    component: MapsExample
  },
  {
    path: '/order/shipping',
    name: 'shipping',
    component: Shipping
  },
  {
    path: '/address',
    name: 'address',
    component: Address
  },
  {
    path: '/address/new',
    name: 'address.new',
    component: AddAddress
  },
  {
    path: '/order/delivery',
    name: 'delivery',
    component: Delivery
  },

  {
    path: '/testing-devs',
    name: 'testing',
    component: TestingPage
  },

  {
    path: '/app',
    name: 'app-menu',
    component: LayoutMenu,
    children: [{
      path: 'home',
      name: 'home',
      component: Home,
    },
    {
      path: 'notification',
      name: 'notification',
      component: Notification,
    },
    {
      path: 'pesanan',
      name: 'pesanan',
      component: Pesanan,
    },
    {
      path: 'profile',
      name: 'profile',
      component: Profile,
    },
      // {
      //   path: 'chat',
      //   name: 'chat',
      //   component: Profile,
      // }
    ],
  },
  {
    path: '*',
    name: 'error.404',
    component: Error404
  },

]

const router = new VueRouter({
  mode: 'history',
  routes
})

async function getToken() {
  const { value } = await Storage.get({ key: 'mlinjo_token' });
  return value;
};

// set the default header of axios a bearer token 
router.beforeEach((to, from, next) => {
  getToken().then(token => {
    console.log("ganti route token => " + token);

    if (token === null) {
      next();
    } else {
      axios.defaults.headers.Authorization = `Bearer ${token}`;
      next();
    }
  })
})

export default router
