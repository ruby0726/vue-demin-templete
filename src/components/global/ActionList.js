  
  const normal = {
    add: {
        label: '新增',
        icon: 'xinzeng',
		auth: 'xz'
    },
    edit: {
        label: '修改',
        icon: 'xiugai',
		auth: 'bj'
    },
    delete: {
        label: '删除',
        icon: 'shanchu',
		auth: 'sc',
        color: 'red'
    },
    back: {
        label: '返回',
        icon: 'fanhui',
		color: 'grey-1'
    },
    cancel: {
        label: '取消',
        icon: 'quxiao',
        color: 'grey-1'
    },
    save: {
        label: '保存',
        icon: 'baocun1'
    },
    query: {
        label: '查询',
        icon: 'chaxun'
    },
    check: {
        icon: 'shenhe',
        label: '审核',
		color: 'orange'
    },
    printing: {
        label: '打印',
        icon: 'dayin'
    },
    export: {
        label: '导出',
        icon: 'daochu'
    }
  }
  
  const list = {
    ...normal
  }
  export function getGroup (partten) {
    return partten.map(val => {
      // 配置数组中可以添加自定义配置，预留！
      if (typeof val === 'object' && val.name) {
        return { ...val }
      } else {
        return { ...list[val], name: val }
      }
    })
  }
  
  export default list
  