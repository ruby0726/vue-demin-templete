// 重写el-form-item
// 用法:    :rules="{type:'phone',required:true,max:11,type:'number'}   rule-type="number"
<script>
import { buildRule } from '@/utils/buildRule'
import { FormItem } from 'element-ui'

export default {
  name: 'el-form-item', // eslint-disable-line
  functional: true,
  components: {
    FormItem
  },
  props: {
    required: [Boolean, String, Function], // eslint-disable-line
    hideLabel: Boolean,
    ruleType: String // eslint-disable-line
    // rules: [Array, Object]
  },
  render (h, { parent, props, data, children }) {
    const _formItem = FormItem
    let { trigger = 'change', len, max, min, validator, ...attrs } = data.attrs || {}
    const { label, rules } = attrs

    const newRules = []
    if (min !== undefined) min = Number(min)
    if (props.ruleType || len || max !== undefined || min !== undefined) {
      newRules.push({ type: props.ruleType || props.required, len: Number(len), max: Number(max), min: min, trigger })
    }
    // 自定义校验规则
    if (validator) {
      newRules.push({ validator, trigger })
    }
    const isIgnore = !props.required && (!rules || rules.length || rules.message) && newRules.length === 0
    // todo: rules处理
    if (!isIgnore) {
      let config = rules || {}
      if (config.trigger || config.validator) {
        newRules.push({ trigger, ...rules })
        config = {}
      }
      const type = typeof props.required === 'string' ? props.required : undefined
      const validator = typeof props.required === 'function' ? props.required : undefined
      config.trigger = config.trigger || trigger

      if (!type || !config.type || config.type === type) {
        config.required = !!props.required || config.required
        config.type = config.type || type
        if (validator) {
          config.validator = validator
        }
        // if (!config.required) {
        //   config.trigger = config.trigger || 'change'
        // }
        newRules.unshift(config)
      } else {
        newRules.unshift({ required: true, type, trigger })
        config.required = false
        newRules.push(config)
      }
      let _rules = []
      newRules.forEach(item => {
        _rules = _rules.concat(buildRule(item, label))
      })
      attrs.rules = _rules
    }
    if (props.hideLabel) {
      delete attrs.label
      attrs.labelWidth = '0'
    }
    data.attrs = attrs
    return h(_formItem, data, children)
  }
}
</script>
