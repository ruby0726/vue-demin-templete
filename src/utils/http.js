import axios from 'axios'
import {MessageBox, Message} from 'element-ui'
import Loading from './loading'
import {resetRouter} from '@/router'
import Storage from '@/utils/storage'

const storage = new Storage(window.sessionStorage)

class Http {
  constructor() {
    this.axiosInstance = axios.create({
      timeout: 5000
    })

    this.axiosInstance.interceptors.request.use(
      async config => {
        // 请求头设置token
        const accessToken = JSON.parse(sessionStorage.getItem('token'))
        if (accessToken) {
          config.headers.Authorization = 'Bearer ' + accessToken
        }
        return config
      },
      error => {
        return Promise.reject(error)
      }
    )

    this.axiosInstance.interceptors.response.use(res => {
        const data = res.data;
        const type = Object.prototype.toString.call(data);
        if (res.status === 200) {
          if (data.code !== 200) {
            if (type === "[object Blob]") {
              return res
            } else {
              Message({
                message: data.mes || 'Error',
                type: 'error',
                duration: 5000
              })
              if (data.code === 201 || data.code === 600) {
                // 退出登录
                storage.clear()
                resetRouter()
                // window.$vue.$router.push(`/login?redirect=${window.$vue.$route.fullPath}`)
                window.$vue.$router.push(`/login`)
              }
            }
          } else {
            //更新token
            if (data.data && data.data.newToken) {
              storage.set('token', data.data.newToken);
              let value = res.config
              value.headers.Authorization = 'Bearer ' + data.data.newToken;
              return this.request(value);
            } else {
              return data
            }

          }
        } else {
          return Promise.reject(new Error(data.mes || 'Error'))
        }

      },
      error => {
        Message({
          message: error.message,
          type: 'error',
          duration: 5000
        })
        return Promise.reject(error)
      }
    )
  }

  /**
   * 通用请求
   *
   * @param {*} config
   * @param {boolean}
   * @returns
   * @memberof Http
   */
  request(config, showLoading = false) {
    if (showLoading) Loading.start()
    return new Promise((resolve, reject) => {
      this.axiosInstance.request(config).then(res => {
        if (showLoading) Loading.end()
        if (config.responseType === 'blob') {
          return this.saveFile(res)
        }
        resolve(res)
      })
    })
  }

  get(url, data, showLoading, options) {
    return this.request({
      url,
      method: 'get',
      params: data,
      ...options
    }, showLoading)
  }

  post(url, data, showLoading, options) {
    return this.request({
      url,
      data,
      method: 'post',
      ...options
    }, showLoading)
  }

  delete(url, data, showLoading, options) {
    return this.request({
      url,
      method: 'delete',
      data,
      ...options
    }, showLoading)
  }

  put(url, data, showLoading, options) {
    return this.request({
      url,
      method: 'put',
      data,
      ...options
    }, showLoading)
  }

  /**
   * 适用于小文件下载，显示默认loading
   * @param url
   * @param data
   * @param options
   */
   getFile (url, data, showLoading,options) {
    return this.request({
      url,
      data,
      method: 'post',
      timeout: 600000,
      responseType: 'blob',
      ...options
    },showLoading)
  }

  /**
   * 保存文件
   * @param res
   */
   saveFile (res) {
    const { data } = res
    if (data.type === 'application/json') {
      const reader = new FileReader()
      reader.onload = function () {
        const { message } = JSON.parse(reader.result)
        Message({ message, type: 'error', duration: 2000 })
      }
      reader.readAsText(data)
      return
    }
    const blobData = new Blob([data], {type: 'application/vnd.ms-excel'});
    const str = res.headers['content-disposition']
    let filename
    if (str) {
      filename = str.match(/filename(\*)=utf-8''(\S*?)(;|$)/)[2]
    }
    filename = filename || '未命名'
    if (this.isIE()) {
      window.navigator.msSaveOrOpenBlob(data, filename)
    } else {
      const downloadElement = document.createElement('a') // 创建a标签
      const href = window.URL.createObjectURL(blobData) // 创建下载的链接
      downloadElement.href = href
      downloadElement.download = decodeURI(filename) // 下载后文件名
      document.body.appendChild(downloadElement)
      downloadElement.click() // 点击下载
      document.body.removeChild(downloadElement) // 下载完成移除元素
      window.URL.revokeObjectURL(href) // 释放掉blob对象
    }
  }
  isIE () {
    if (!!window.ActiveXObject || 'ActiveXObject' in window) {
      return true
    } else {
      return false
    }
  }

  //
  // exportPost(url, data) {
  //   return new Promise((resolve, reject) => {
  //     this.axiosInstance.request({
  //       url,
  //       method: 'post',
  //       data,
  //       responseType: 'blob',
  //     }).then(res => {
  //       resolve(res)
  //     }).catch(error => {
  //       reject(error)
  //     })
  //   })
  // }
}

export default new Http()
