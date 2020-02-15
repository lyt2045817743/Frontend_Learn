import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)
const modulesA={
  state:{
    username:"小明"
  }
}
export default new Vuex.Store({
  state: {
    count:0
  },
  mutations: {
    add(state){
      ++state.count;
    },
    reduce(state){
      --state.count;
    }
  },
  getters:{
    newCount(state){
      return state.count+100;
    }
  },
  actions: {
    addActive({commit}){
      commit('add');
    }
  },
  modules: {
    user:modulesA
  }
})
