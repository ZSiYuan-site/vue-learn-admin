import Vue from 'vue'
import App from './App.vue'
import router from './router/index'
import './plugins/element.js'

// 引入vuex核心管理对象
import store from './store/index'

// 引入表单验证
// import './vee-validate/index'

// 全局样式
import './assets/css/global.css'

// 导入treeTable
import TreeTable from 'vue-table-with-tree-grid'

// 引入 权限拦截 
import './permission'

// axios
import axios from 'axios'
Vue.prototype.$http = axios
// Vue.prototype.$API = axios

// 引入富文本编辑器
import VueQuillEditor from 'vue-quill-editor'
// 引入富文本编辑器的样式
import 'quill/dist/quill.core.css' // import styles
import 'quill/dist/quill.snow.css' // for snow theme
import 'quill/dist/quill.bubble.css' // for bubble theme

// 导入NProgress包对应的js和css
import NProgress from 'nprogress'
import 'nprogress/nprogress.css'

// 表单验证
import './vee-validate/index';

// 请求拦截器
// axios.interceptors.request.use(config => {
//   NProgress.start()
//   // console.log(config)
//   config.headers.Authorization = window.sessionStorage.getItem('token')
//   // 固定要返回config
//   return config
// })

// 响应拦截器
// axios.interceptors.response.use(config => {
//   NProgress.done()
//   return config
// })

// 下面是真正发送请求的
axios.defaults.baseURL = "/api"

Vue.use(VueQuillEditor)
Vue.component('tree-table', TreeTable)
Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
