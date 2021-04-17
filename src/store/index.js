import { createStore } from 'vuex'

export default createStore({
  state: {
    sign_state:true
  },
  mutations: {
    changeStatetoFalse(state){
      state.sign_state=false
    },
    changeStatetoTrue(state){
      state.sign_state=true
    }
  },
  actions: {
  },
  modules: {
  }
})
