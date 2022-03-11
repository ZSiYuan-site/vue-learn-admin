import myAxios from './myAxios'

/**
 * 登录
 * @param {*} loginForm 登录表单数据对象
 * @returns 
 */
export const login = (loginForm) => myAxios({
  url: '/api/ucenter/member/login',
  method: 'post',
  data: loginForm
})

/**
 * 获取课程分类列表
 * @returns 
 */
export const getCoursesList = () => myAxios({
  url: '/course/coursecate/list',
  method: 'get'
})
