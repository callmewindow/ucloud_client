import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    email: '847590417@qq.com',
    userId: -1, // -1代表没有登录
    teacherID: 0,
    nickname: "稼轩",
    permission: 0, //-1==首陀罗，0==吠舍，1==刹帝利，2==婆罗门
    // permission仅针对用户-课程关系，0普通用户，1管理员，2创始人，3未加入课程
  },
  mutations: {
  },
  actions: {
  },
  modules: {
  }
})
