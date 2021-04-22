import { createStore } from 'vuex'

export default createStore({
  state: {
    sign_state:true,
    account:''
  },
  mutations: {
    changeStatetoFalse(state){
      state.sign_state=false
    },
    changeStatetoTrue(state){
      state.sign_state=true
    },
    saveAccount(state,account){
      state.account=account
    },
    clearAccount(state){
      state.account=''
    }
  },
  actions: {
  },
  modules: {
  }
})
