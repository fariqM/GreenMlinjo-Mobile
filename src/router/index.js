import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import Login from '../views/guest/Login.vue'
import Register from '../views/guest/Register.vue'
import Landing from '../views/guest/Landing.vue'



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
    component: Landing
  },
  {
    path: '/register',
    name: 'register',
    component: Landing
  },
  
]

const router = new VueRouter({
  routes
})

export default router
