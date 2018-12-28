import Vue from 'vue'
import Router from 'vue-router'
import Login from '@/components/login'
import Home from '@/components/Home'
import Welcome from '@/components/Welcome'
import User from '@/components/user/User'
import RoleList from '@/components/right/RoleList'
Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      redirect: '/login'
    },
    {
      path: '/login',
      component: Login
    },
    {
      path: '/home',
      component: Home,
      redirect: '/home/welcome',
      children: [
        {
          path: '/home/welcome',
          component: Welcome
        },
        {
          path: '/home/users',
          component: User
        },
        {
          path: '/home/roles',
          component: RoleList
        }
      ]
    }
  ]
})
