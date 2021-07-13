// 注册所有的全局指令

import auth from './v-auth'

const directives = {
  auth
}

export default {
  install (Vue) {
    Object.keys(directives).forEach(key => {
      Vue.directive(key, directives[key])
    })
  }
}
