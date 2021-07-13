import Vue from 'vue'

import 'normalize.css/normalize.css' // A modern alternative to CSS resets

import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'

// global css
import '@/styles/index.scss' 
// global components
import '@/components'

// 全局引入工具类
import * as utils from '@/utils'
Vue.prototype.$utils = utils

// 注册全局自定义指令
import Directives from '@/utils/directives'
// 全局注册指令
Vue.use(Directives)

import App from './App'
import store from './store'
import router from './router'

import '@/icons' // icon
import '@/permission' // permission control
const constant = require('@/constant')

Vue.use(ElementUI)

Vue.config.productionTip = false
Vue.prototype.$constant = constant

new Vue({
  el: '#app',
  router,
  store,
  render: h => h(App)
})
