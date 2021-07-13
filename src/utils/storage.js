export default class storage {
    /**
     *
     * @param {*} storage window.localStorage | window.sessionStorage
     */
    constructor (storage) {
      this.storage = storage
    }
  
    /**
    * 存储一个键值对到本地存储中
    * @param {string} key - 存储的key值
    * @param {object} value - 存储的对象，内部会转化为JSON字符串存储
    */
    set (key, value) {
      if (typeof (key) !== 'string') {
        console.error('key mast to be a string')
        return
      }
      var strVal = JSON.stringify(value)
      this.storage[key] = strVal
    }
  
    /**
      根据key从已经存储的数据中取出对应的值
      * @param {string} key - 存储的key值
      * @return {object} value - 根据key值获取到的对象，如果没有则为null
      */
    get (key) {
      if (typeof (key) !== 'string') {
        console.error('key mast to be a string')
        return null
      }
      var strVal = this.storage[key]
      if (!strVal || strVal === 'undefined') {
        strVal = null
      }
      var jsonVal = JSON.parse(strVal)
      return jsonVal
    }
  
    /**
    * 根据key移除已经存储的对应值
    * @param {string} key - 有则移除，无则不做任何操作
    */
    remove (key) {
      this.storage.removeItem(key)
    }
  
    /**
    * 清除当前域名下所有的本地存储信息
    */
    clear () {
      this.storage.clear()
    }
  }
  