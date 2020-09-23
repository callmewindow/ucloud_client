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
    name: 'BotList',
    component: () => import('@/views/BotList.vue'),
  },
  {
    path: '/user/:userId',
    name: 'UserInfo',
    component: () => import('@/views/UserInfo.vue'),
  },
  {
    path: '/bot/:botId',
    redirect: '/bot/:botId/intro'
  },
  {
    path: '/bot/:botId/:botPos',
    name: 'Bot',
    component: () => import('@/views/Bot.vue'),
  },
  {
    path: '/Login',
    name: 'Login',
    component: () =>
      import('@/components/LoginTemp.vue'),
  },

]

const router = new VueRouter({
  routes
})

export default router