import Vue from "vue";
import VueRouter from "vue-router";
// import Home from "../views/Home.vue";
import Landing from "../views/guest/Landing.vue";
import Login from "../views/guest/Login.vue";
import Register from "../views/guest/Register.vue";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "landing",
    component: Landing,
  },

  {
    path: "/login",
    name: "login",
    component: Login,
  },
  {
    path: "/register",
    name: "register",
    component: Register,
  },
];

const router = new VueRouter({
  routes,
});

export default router;
