/** 功能组件
参数：
config: Array 功能操作名称数组
事件：
@on-click 返回{action:'save',label:'保存'}
*/
<template>
    <div v-if="viewList.length" class="title-bar">
        <h5 v-if="title" class="fw-b">
            {{ page==='info'?'':page==='add'?'新增':'编辑' }}{{ title }}{{ page==='info'?'详情':''
            }}
        </h5>
        <ul class="inline-group">
            <li
                v-for="(item,idx) in viewList"
                :key="idx"
                :disabled="item.disabled"
                @click="onClick(item)"
            >
                <span :class="[item.color? `btn-${item.color}`: 'btn-primary','btn']">{{ item.label }}</span>
            </li>
        </ul>
    </div>
</template>

<script>
  import {getGroup} from './ActionList'
  import Storage from '@/utils/storage'

  const storage = new Storage(window.sessionStorage)

  function isObject(o) {
    return Object.prototype.toString.call(o) === '[object Object]'
  }

  export default {
    name: 'ActionBar',
    props: {
      // 页面显示类型  info,add,edit
      page: {
        type: String,
        default: 'info'
      },
      // 标题
      title: {
        type: String,
        default: ''
      },
      // 显示类型 botton:按钮组, icon:仅图标,text:仅文本
      type: {
        type: String,
        default: ''
      },
      size: {
        type: String,
        default: ''
      },
      hideIcon: {
        type: Boolean,
        default() {
          return true
        }
      },
      hideLabel: Boolean,
      // 页面子目录名
      subName: String,  // eslint-disable-line
      // 当前可操作的功能列表
      current: {
        type: [Array, Object],
        default() {
          return []
        }
      }
    },
    data: function () {
      return {
        actions: []
      }
    },
    computed: {
      viewList() {
        let arr = []
        let current = this.current
        if (isObject(current)) {
          current = Object.keys(current).filter(key => {
            const result = current[key] || {}
            return result === true || result.show === true
          })
        }
        this.actions.forEach(item => {
          const permissionBtn = storage.get('userInfo').permissionBtn
          const routeName = this.$route.name
          const authName = routeName.replace(/Info/, '')
          let isAuth = true
          if (item.auth) {
            const authKey = `${authName}-${item.auth}`
            isAuth = permissionBtn.includes(authKey)
          }
          if (isAuth) {
            arr.push(item)
          }
        })
        return arr
      }
    },
    watch: {
      current: {
        immediate: true,
        handler(current) {
          let config = current
          if (isObject(current)) {
            config = Object.keys(current).map(key => {
              if (current[key] && typeof current[key] === 'object') {
                current[key].name = key
                return current[key]
              } else {
                return key
              }
            })
          }
          this.actions = getGroup(config)
        }
      }
    },
    methods: {
      onClick(item) {
        if (!item.disabled) {
          if (item.method) {
            item.method()
          }
          this.$emit('fns-click', {action: item.name, label: item.label})
        }
      },
    }
  }
</script>

<style lang="scss" scoped>
  .title-bar {
    padding: 0 15px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 15px;
    // border-bottom: 1px solid #e5e5e5;
    // box-shadow: 0 5px 5px rgba(0,0,0,.1);
    .inline-group {
      display: flex;

      li:not(:last-child) {
        margin-right: 5px;
      }
    }
  }
</style>
