import Vue from 'vue'
import Vuex from 'vuex'
import users from './modules/users'
import events from './modules/events'
import notifications from './modules/notifications'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    categories: [
      'sustainability',
      'nature',
      'animal welfare',
      'housing',
      'education',
      'food',
      'community'
    ]
  },
  modules: { users, events, notifications }
})
