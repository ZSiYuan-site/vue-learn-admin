/**
 * @description 使用vuex模块化管理用户相关
 * @author zsy
 */

import router from '../../router/index'

// elementui
import {
  Message
} from 'element-ui'

import {
  SAVE_USER_INFO,
  SAVE_TOKEN
} from '../mutations-type'

import {
  login,
} from '../../api/index'


const state = {
  initTest: '模块化的初始化数据',
  userInfo: {}, // 用户信息
  token: null, // token
}

const mutations = {
  // 保存用户信息
  [SAVE_USER_INFO](state, userInfo) {
    state.userInfo = userInfo
  },

  // 单独保存token到vuex中
  [SAVE_TOKEN](state, token) {
    state.token = token
  },
}

const actions = {
  // 用户信息
  async getUserInfoAction({
    commit
  }, loginForm) {
    const result = await login(loginForm)
    // console.log(result)
    if (result.token) {
      // 将token单独抽离出来保存到vuex
      commit(SAVE_TOKEN, result.token)
      // 将token存入到本地localStorage
      localStorage.setItem('token_key', result.token)
      delete result.token
      // 前端手动添加数据
      result.data = {
        username: 'peiqi'
      }
      // console.log(result)
      commit(SAVE_USER_INFO, result.data)
      Message.success("登录成功！！")
      router.push('/')
    } else {
      return Message.error("登录失败，请重新输入！！");
    }

  },

  // 课程分类列表
  async getCoursesListAction({
    commit
  }) {
    const result = await getCoursesList()

  }
}

const getters = {

}

export default {
  state,
  mutations,
  actions,
  getters
}
