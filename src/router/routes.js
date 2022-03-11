const Login = () => import( /* webpackChunkName:"login_home_welcome" */ '../views/login/Login.vue')
const Home = () => import( /* webpackChunkName:"login_home_welcome" */ '../components/Home.vue')
const Welcome = () => import( /* webpackChunkName:"login_home_welcome" */ '../components/Welcome.vue')

const Cate = () => import( /* webpackChunkName:"Cate_Info_Plan" */ '../components/course/Cate.vue')
const Info = () => import( /* webpackChunkName:"Cate_Info_Plan" */ '../components/course/Info.vue')
const Plan = () => import( /* webpackChunkName:"Cate_Info_Plan" */ '../components/course/Plan.vue')


const TeacherList = () => import( /* webpackChunkName:"TeacherList_AddTeacher" */ '../components/teacher/TeacherList.vue')
const AddTeacher = () => import( /* webpackChunkName:"TeacherList_AddTeacher" */ '../components/teacher/AddTeacher.vue')

const Course = () => import( /* webpackChunkName:"Course" */ '../components/teacher/Course.vue')

const CourseMarket = () => import( /* webpackChunkName:"CourseMarket" */ '../components/market/CourseMarket.vue')

export default [{
    path: '/',
    redirect: '/welcome'
  },
  {
    path: '/login',
    component: Login
  }, {
    path: '/home',
    component: Home,
    redirect: '/welcome',
    children: [{
      path: '/welcome',
      component: Welcome
    }, ]
  },

  // 课程管理
  {
    path: '/home',
    component: Home,
    children: [{
        path: '/course/cate',
        component: Cate
      },
      {
        path: '/course/info',
        component: Info
      },
      {
        path: '/course/info/:id',
        component: Info,
        hidden: true
      }, {
        path: '/course/plan',
        component: Plan,
      },
      {
        path: '/course/plan/:id',
        component: Plan,
      }
    ]
  },
  // 讲师管理
  {
    path: '/home',
    component: Home,
    children: [{
        path: '/teacher/list',
        component: TeacherList
      },
      {
        path: '/teacher/course/:id',
        component: Course
      }, {
        path: '/teacher/add',
        component: AddTeacher
      },
      {
        path: '/teacher/edit/:id',
        component: AddTeacher,
        hidden: true
      },
    ]
  },
  // 营销管理
  {
    path: '/home',
    component: Home,
    children: [{
      path: '/market/course',
      component: CourseMarket
    }, ]
  },
]
