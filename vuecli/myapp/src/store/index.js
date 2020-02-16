import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    bgcolor:['rgb(0, 150, 136)','rgb(121, 85, 72)', 'rgb(63, 81, 181)'],
    title:['剧集','音乐','书籍','聊天'],
  },
  mutations: {
    changeTitle(state,index){
      state.now_index=index;
    }
  },
  getters:{
    

  },
  actions: {
    now_title({commit}){
      commit('changeTitle')
    }
  },
  modules: {
  }
})
