<template>
    <el-pagination
        background
        layout="total, prev, pager, next,sizes,jumper"
        :style="pagerStyle"
        :total="total"
        :current-page="currentPage"
        :page-size="pageSize"
        :page-sizes="[15, 30, 45, 60]"
        @current-change="currentChange"
        @size-change="sizeChange"
    />
</template>

<script>
export default {
  name: 'BasePager',
  props: {
    total: {
      type: Number,
      default: 0
    },
    currentPage: {
      type: Number,
      default: 1
    },
    pageSize: {
      type: Number,
      default: 15
    }
  },
  data () {
    return {
      pagerStyle: {
        'margin-top': '60px',
        'margin-bottom': '20px',
        'text-align': 'center'
      }
    }
  },
  methods: {
    currentChange (currentPage) {
      this.$emit('update:currentPage', currentPage)
      this.$emit('search')
    },
    sizeChange (pageSize) {
      this.$emit('update:pageSize', pageSize)
      this.$emit('search')
    }
  }
}
</script>
