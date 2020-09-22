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
    path: '/botlist',
    name: 'CourseList',
    component: () => import('@/views/CourseList.vue'),
  },
  {
    path: '/user/:userId',
    name: 'UserDetail',
    component: () => import('@/views/UserDetail.vue'),
  },
  {
    path: '/bot/:botId',
    redirect: '/course/:courseId/intro'
  },
  {
    path: '/bot/:botId/:botPos/',
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