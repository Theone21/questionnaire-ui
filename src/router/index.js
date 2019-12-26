import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'

Vue.use(VueRouter);

const routes = [
  {
    path: '/',
    name: 'home',
    component: Home
  },
  {
    path: '/login',
    name: 'login',
    component: () => import(/* webpackChunkName: "login" */ '../views/Login.vue')
  },
  {
    path: '/systemManagement',
    component: Home,
    children: [
      {
        path: 'user',
        component: () => import(/* webpackChunkName: "user" */ '../views/systemManagement/User.vue')
      }, {
        path: 'role',
        component: () => import(/* webpackChunkName: "role" */ '../views/systemManagement/Role.vue')
      }
    ]

  }
]

const router = new VueRouter({
  mode: 'history',
  routes
})

export default router
