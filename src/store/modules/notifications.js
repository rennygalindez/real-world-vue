let id = 1
export default {
  namespaced: true,
  state: {
    notifications: []
  },
  /*   getters: {
    value: state => {
      return state.value
    }
  }, */
  mutations: {
    UPDATE_ADD_NOTIFICATIONS(state, notification) {
      state.notifications.push({ ...notification, id: id++ })
    },
    UPDATE_REMOVE_NOTIFICATIONS(state, notificationIndex) {
      state.notifications.splice(notificationIndex, 1)
    }
  },
  actions: {
    addNotification({ commit }, notification) {
      commit('UPDATE_ADD_NOTIFICATIONS', notification)
    },
    removeNotification({ commit, state }, notificationId) {
      let notificationIndex = state.notifications.find(
        (notification, index) => {
          if (notification.id === notificationId) {
            return index
          }
        }
      )
      commit('UPDATE_REMOVE_NOTIFICATIONS', notificationIndex)
    }
  }
}
