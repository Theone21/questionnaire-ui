import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'

Vue.use(VueRouter);

const VueRouterPush = VueRouter.prototype.push
VueRouter.prototype.push = function push (to) {
  return VueRouterPush.call(this, to).catch(err => err);
}

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
    path: '/test',
    name: 'test',
    component: () => import(/* webpackChunkName: "login" */ '../views/test/Test.vue')
  },
  {
    path: '/systemManagement',
    component: Home,
    children: [
      {
        path: 'user',
        name: 'user',
        component: () => import(/* webpackChunkName: "user" */ '../views/systemManagement/User.vue')
      }, {
        path: 'role',
        name: 'role',
        component: () => import(/* webpackChunkName: "role" */ '../views/systemManagement/Role.vue')
      }, {
        path: 'function',
        name: 'function',
        component: () => import(/* webpackChunkName: "role" */ '../views/systemManagement/Function.vue')
      }
    ]

  }
]

const router = new VueRouter({
  mode: 'history',
  routes
})

router.beforeEach((to, from, next) => {
  if(to.name === from.name) return;
  next();
})

export default router
