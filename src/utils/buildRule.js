/**
 格式化字符串，两种调用方式
 var template1="我是{0}，今年{1}了";
 var result1=formatStr(template1,"abc",22);
 var template2="我是{name}，今年{age}了";
 var result2=formatStr(template2,{name:"abc",age:22});
 */

function formatStr (str, ...args) {
    if (args[0]) {
      const param = (typeof args[0] === 'object') ? args[0] : args
      const reg = new RegExp('{(\\w*)}', 'g')
      str = str.replace(reg, (match, key) => param[key] || typeof param[key] === 'number' ? param[key] : '')
    }
    return str
  }


/**
 * 表单校验规则
 */
const ruleTypeMap = {
  email: {
    type: 'email',
    message: '请输入正确的邮箱地址'
  },
  integer: {
    type: 'integer',
    message: '{label}必须为整数',
    transform: (value) => +value
  },
  number: {
    type: 'number',
    message: '{label}必须为数字',
    transform: (value) => +value
  },
  idcard: {
    pattern: /^[1-9]\d{5}(19[4-9]|20[0,1])\d(0[1-9]|1[0-2])([0-2][0-9]|30|31)\d{3}[\d|X|x]$/,
    message: '请输入正确的身份证号'
  },
  phone: {
    pattern: /^(\d{3,4}-?)?\d{7,8}$/,
    message: '请输入正确的电话号码'
  },
  // mobile: {
  //   pattern: /^1[3-9][0-9]\d{8}$/,
  //   message: '请输入正确的手机号'
  // },
  mobile: {
    pattern: /^1\d{10}$/,
    message: '请输入正确的手机号'
  },
  fourDecimal: {
    pattern: /^-?\d+(\.\d{1,4})?$/,
    message: '最多支持4位小数'
  },
  threeDecimal: {
    pattern: /^-?\d+(\.\d{1,3})?$/,
    message: '最多支持3位小数'
  },
  twoDecimal: {
    pattern: /^-?\d+(\.\d{1,2})?$/,
    message: '最多支持2位小数'
  },
  integerNonVal: {
    pattern: /^[+]{0,1}(\d+)$/,
    message: '{label}必须为整数'
  }
}
const rangeMsg = {
  string: {
    len: '{label}长度必须等于{len}',
    max: '{label}长度不能超过{max}',
    min: '{label}长度至少为{min}',
    range: '{label}长度必须{min}至{max}之间'
  },
  number: {
    len: '{label}需等于{len}',
    max: '{label}需小于{max}',
    min: '{label}需大于{min}',
    range: '{label}需在{min}至{max}之间'
  }
}
function getRangeRule (type, len, max, min) {
  let rule
  if (len) {
    rule = { type, len, message: 'len' }
  } else if (max !== undefined && min !== undefined) {
    rule = { type, max, min, message: 'range' }
  } else if (max !== undefined) {
    rule = { type, max, message: 'max' }
  } else if (min !== undefined) {
    rule = { type, min, message: 'min' }
  } else {
    return false
  }
  if (type === 'number') {
    rule.message = rangeMsg.number[rule.message]
    rule.transform = (value) => +value
  } else {
    rule.message = rangeMsg.string[rule.message]
  }
  return rule
}
export function buildRule (item = {}, label = '') {
  const { trigger, required, type = 'string', len, max, min, validator } = item
  const rules = []
  if (required) {
    rules.push({
      required,
      trigger,
      // validator: noEmpty,
      pattern: /^[\s\S]*.*[^\s][\s\S]*$/,
      // transform: (value) => value + '',
      // whitespace: true,
      message: `${label}不能为空`
    })
  }
  let typeRule
  if ((len || max !== undefined || min !== undefined) && (type === 'string' || type === 'number' || type === 'integer')) {
    typeRule = getRangeRule(type, len, max, min)
  }
  typeRule = typeRule || (ruleTypeMap[type] && { ...ruleTypeMap[type] })
  if (typeRule) {
    typeRule.trigger = trigger
    typeRule.message = formatStr(typeRule.message, { label, len, max, min })
    rules.push(typeRule)
  }
  if (validator) {
    rules.push({ validator, trigger })
  }
  return rules
}
