<script>
import {Form} from 'element-ui'

function buildStyle (cols, colspan = 1) {
  var colSize = 100 / cols // 平均每列大小
  var colWidth = colSize * colspan
  return {
    width: (colWidth > 100 ? 100 : colWidth) + '%'
  }
}
export default {
  name:"el-form", // eslint-disable-line
  functional: true,
  // components: {
  //   Form
  // },
  props: {
    // 列数
    cols: [Number, String],   // eslint-disable-line
    // 紧凑排列
    compact: [Boolean] 
  },
  render (h, {parent, props, data, children}) {
    const _Form = Form
    if (props.compact) {
      data.staticClass = (data.staticClass || '') + ' compact-el-form'
    }
    if (!props.cols) {
      return h(_Form, data, children)
    }

    const newChildrens = []
    let groupNode
    let i = 0
    children.forEach(node => {
      if (!node.tag) return
      // const tag = (node.fnOptions && node.fnOptions.name) || node.tag
      const attrs = node.data.attrs || {}
      // 独占一行
      if ('nowrap' in attrs) {
        newChildrens.push(node)
        i = 0
      } else {
        const colspan = Number(attrs.colspan) || 1
        const isBreak = 'wrap-break' in attrs
        node.data.style = node.data.style || {}
        Object.assign(node.data.style, { float: 'left', width: 90 / props.cols * colspan + '%' })

        if (i === 0 || isBreak) {
          groupNode = h('div', {staticClass: 'grid'}, [])
          newChildrens.push(groupNode)
        }
        groupNode.children.push(node)
        i += colspan
        if (i >= props.cols || isBreak) i = 0
      }
    })
    return h(_Form, data, newChildrens)
  }
}
</script>
<style>
  .el-form.compact-el-form .el-form-item {
    margin-right: 0;
    margin-bottom: 0;
  }
  .compact-el-form label {
    color: #99a9bf;
  }

</style>

