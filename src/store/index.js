import Vue from 'vue'
import Vuex from 'vuex'
import getters from './getters'
const path = require('path')

Vue.use(Vuex)

const files = require.context('./modules', false, /\.js$/)
// console.log(files,'==============>files');
let modules = {}
files.keys().forEach(key => {
  let name = path.basename(key, '.js')
  modules[name] = files(key).default || files(key)
})
// console.log(modules,'================>modules');
const store = new Vuex.Store({
  modules,
  getters
})

export default store
