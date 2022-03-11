/**
 * @description 使用vuex模块化管理课程相关
 * @author zsy
 */


import {
  SAVE_COURSE_LIST
} from '../mutations-type'

import {
  getCoursesList
} from '../../api/index'


const state = {
  initTest: '模块化的初始化数据',
  courseList: [], // 课程分类列表
}

const mutations = {
  // 保存课程分类列表
  [SAVE_COURSE_LIST](state, courseList) {
    state.courseList = courseList
  },
}

const actions = {
  async getCoursesListAction({
    commit
  }) {
    const result = await getCoursesList()
    // 删除掉第一项
    result.children.splice(0, 1);
    // this.coursesCategoryList = result.children;
    commit(SAVE_COURSE_LIST, result.children)
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
