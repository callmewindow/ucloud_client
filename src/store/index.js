import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    userId: 1, // -1代表没有登录
    username: "123",
  },
  mutations: {
  },
  actions: {
  },
  modules: {
  }
})
