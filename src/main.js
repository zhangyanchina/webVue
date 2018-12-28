import Vue from 'vue'
import App from './App'
import router from './router'
import './assets/css/global.css'
import './assets/fonts/iconfont.css'
import ElementUI from 'element-ui'
// 导入axios
import axios from 'axios'

axios.defaults.baseURL = 'http://127.0.0.1:8888/api/private/v1/'
Vue.use(ElementUI)
Vue.config.productionTip = false

// 设置导航守卫

router.beforeEach((to, from, next) => {
  // 如果去是的login页面就让他去
  if (to.path === '/login') return next()
  // 如果去的不是login页面就要验证
  if (!sessionStorage.getItem('token')) return next('/login')
  next()
})

// 添加请求拦截器
axios.interceptors.request.use(
  function(config) {
    // 在发送请求之前做些什么
    const token = sessionStorage.getItem('token')
    config.headers.Authorization = token

    return config
  },
  function(error) {
    // 对请求错误做些什么
    return Promise.reject(error)
  }
)
Vue.prototype.$http = axios
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router, // 挂载路由
  render: h => h(App)
})
