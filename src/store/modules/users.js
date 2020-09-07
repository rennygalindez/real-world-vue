export default {
  namespaced: true,
  state: {
    user: { id: 'abc123', name: 'Adam Jahr' },
    istrue: false
  },
  getters: {
    istrue: state => {
      return state.istrue
    }
  }
  /* mutations: {
    updateValue(state, payload) {
      state.value = payload
    }
  },
  actions: {
    updateValue({ commit }, payload) {
      commit('updateValue', payload)
    }
  } */
}
