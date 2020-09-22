import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [

    {
    path: '/',
    redirect: '/home',
  },
  {
    path: '/home',
    name: 'Home',
    component: () => import('@/views/Home.vue'),
  },
  {
    path: '/robotlist',
    name: 'CourseList',
    component: () => import('@/views/CourseList.vue'),
  },
  {
    path: '/user/:userId',
    name: 'UserDetail',
    component: () => import('@/views/UserDetail.vue'),
  },
  {
    path: '/robot/:robotId',
    redirect: '/course/:courseId/intro'
  },
  {
    path: '/robot/:robotId/:robotPos/',
    name: 'Course',
    component: () => import('@/views/Course.vue'),
  },
  {
    path: '/Login',
    name: 'Login',
    component: () =>
      import('@/components/LoginTemp.vue'),
  },
  {
    path: '/test',
    name: 'FriendList',
    component: () => import('@/components/FriendList.vue'),
  },

]

const router = new VueRouter({
  routes
})

export default router