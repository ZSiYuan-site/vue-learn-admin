import Vue from "vue";
import VeeValidate from 'vee-validate'

// 解决vee-validate和elementui同时使用的冲突
const config = {
  fieldsBagName: 'vee-fields'
}
Vue.use(VeeValidate, config)



// 手机号的自定义验证规则
VeeValidate.Validator.extend('mobile', {
  validate: value => {
    return /^1(3|4|5|6|7|8|9)\d{9}$/.test(value)
  },
  getMessage: field => field + '必须是11位'
})

// 密码的自定义验证规则
VeeValidate.Validator.extend('pwd', {
  validate: value => {
    return /^\w{5,17}$/.test(value)
  },
  getMessage: field => field + '必须是5-17位'
})

// 验证码的自定义验证规则
VeeValidate.Validator.extend('code', {
  validate: value => {
    return /^\w{4,17}$/.test(value)
  },
  getMessage: field => field + '必须是4-17位'
})


import zh_CN from 'vee-validate/dist/locale/zh_CN'
VeeValidate.Validator.localize('zh_CN', {
  messages: zh_CN.messages,
  attributes: {
    mobile: '手机号',
    code: '验证码',
    pwd: '密码',
  }
})
