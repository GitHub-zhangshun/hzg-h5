import Vue from 'vue'
import Vuex from 'vuex'
// import createPersistedState from 'vuex-persistedstate'

Vue.use(Vuex)
export default new Vuex.Store({
  state: {
    loginPwd: false
  },

  mutations: {
    loginPwd (state, obj) {
      state.loginPwd = obj
    }
  },
  actions: {},
  getters: {
    loginPwd: state => {
      return state.loginPwd
    }
  }
  // plugins: [
  //   createPersistedState({
  //     storage: window.sessionStorage,
  //     reducer (val) {
  //       return {
  //         form: val.form
  //       }
  //     }
  //   })
  // ]
})
