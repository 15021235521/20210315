import Vue from 'vue'
import Router from 'vue-router'
import store from '../store/index'
import HelloWorld from '@/components/HelloWorld'
import login from '@/pages/login/index'
import register from '@/pages/register/index'
Vue.use(Router)

const router = new Router({
  mode: 'history',
  routes: [{
    path: '/',
    name: 'home',
    component: HelloWorld,
    meta: {
      requiresAuth: true
    }
  }, {
    path: '/HelloWorld',
    name: 'HelloWorld',
    component: HelloWorld
  }, {
    path: '/login',
    name: 'login',
    component: login
  }, {
    path: '/register',
    name: 'register',
    component: register
  }]
})
//注册全局钩子用来拦截导航
router.beforeEach((to, from, next) => {
  //获取store里面的token
  let token = store.state.token;
  //判断要去的路由有没有requiresAuth
  if (to.meta.requiresAuth) {
    if (token) {
      next()
    } else {
      next({
        path: '/login',
        query: {
          redirect: to.fullPath
        } // 将刚刚要去的路由path作为参数，方便登录成功后直接跳转到该路由
      });
    }
  } else {
    next();
  }
})
export default router
