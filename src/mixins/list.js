const list = {
  data() {
    return {
      loading: false, // 伴随loading状态
      page: 1, // 页码
      pageSize: 15, // 页长
      total: 0, // 总个数
      pageSizes: [1, 5, 15, 20, 25, 30], //页长数
      pageLayout: 'total, sizes, prev, pager, next, jumper', // 分页布局
      list: Object.freeze([])
    }
  },
  methods: {
    // 查询
    onSearch() {
			this.page = 1
			this.getList()
		},
    // 分页回调事件
    handleSizeChange(val) {
      this.pageSize = val
      this.getList()
    },
    handleCurrentChange(val) {
      this.page = val
      this.getList()
    },
    /**
     * 表格数据请求成功的回调 处理完公共的部分（分页，loading取消）之后把控制权交给页面
     * @param {*} apiResult
     * @returns {*} promise
     */
    listSuccessCb(apiResult = {}) {
      return new Promise((reslove, reject) => {
        let tempList = [] // 临时list
        try {
          this.loading = false
          // 直接抛出
          reslove(tempList)
        } catch (error) {
          reject(error)
        }
      })
    },
    /**
     * 处理异常情况
     * ==> 简单处理  仅仅是对表格处理为空以及取消loading
     */
    listExceptionCb(error) {
      this.loading = false
      console.error(error)
    }
  },
  created() {
    // 这个生命周期是在使用组件的生命周期之前
    this.$nextTick().then(() => {
      // todo

    })
  }
}
export default list
