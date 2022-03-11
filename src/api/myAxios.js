/**
 * axios的二次封装
 */

import axios from 'axios';

// 引入elementui
import {
  Message
} from 'element-ui'

export const baseURL = '/api'

// 生成 Axios 的伪实例
const instance = axios.create({
  baseURL,
  timeout: 5000
})

// 添加请求拦截器
instance.interceptors.request.use(config => {
  return config
})


// 设置响应拦截器
instance.interceptors.response.use(
  response => {
    const {
      success,
      message,
      data
    } = response.data
    if (success) {
      return data
    } else {
      Message.error(message)
      return Promise.reject(new Error(message))
    }
  },
  error => {
    Message.error(error.message)
    return Promise.reject(error)
  }
)
export default instance
