import Vue from 'vue'
import { Loading } from 'element-ui'
export default {
  start () {
    return Loading.service({ text: '加载中...' })
  },
  end () {
    const loadingInstance = this.start()
    Vue.nextTick(() => {
      loadingInstance.close()
    })
  }
}
