/**
 * @description 权限拦截
 * @author zsy
 */

// 导入nprogress，及样式 进度条
import nprogress from 'nprogress'
import 'nprogress/nprogress.css'

import router from './router/index'
import store from './store/index'


const whiteList = ['/login']

/**
 * @description 前置路由守卫
 */
router.beforeEach((to, from, next) => {
  // 开启进度条
  nprogress.start()
  // vuex有token
  if (store.state.user.token) {
    //   想去登录页
    if (to.path === '/login') {
      // 直接去主页
      next('/')
    } else {
      // 不去主页，而去其他页面，直接放行
      next()
    }
  } else { // vuex没有token
    // 并且前往的页面在白名单内,即前往的页面是不需要token的
    if (whiteList.indexOf(to.path) > -1) {
      // 直接放行
      next()
    } else {
      // 前往的页面不在白名单内，直接回到登录页面
      next('/login')
    }
  }
  nprogress.done()
})


/**
 * @description 后置路由守卫
 */
router.afterEach(() => {
  // 关闭进度条
  nprogress.done()
})
