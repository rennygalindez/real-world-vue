import Vue from 'vue'
import Vuex from 'vuex'
import EventsService from '@/services/EventsService'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    user: { id: 'abc123', name: 'Adam Jahr' },
    events: [],
    categories: [
      'sustainability',
      'nature',
      'animal welfare',
      'housing',
      'education',
      'food',
      'community'
    ],
    eventsTotal: 0,
    event: {}
  },
  getters: {
    catLength: state => state.categories.length,
    getEvent: state => id => state.events.find(event => event.id === id)
  },

  mutations: {
    ADD_EVENT(state, event) {
      state.events.push(event)
    },
    ADD_EVENTS(state, events) {
      state.events = events
    },
    UPDATE_EVENTS_TOTAL(state, eventsTotal) {
      state.eventsTotal = eventsTotal
    },
    UPDATE_EVENT(state, event) {
      state.event = event
    }
  },
  actions: {
    createEvent({ commit }, event) {
      return EventsService.postEvent(event).then(() =>
        commit('ADD_EVENT', event)
      )
    },
    fetchEvents({ commit }, { limit, page }) {
      return EventsService.getEvents(limit, page)
        .then(response => {
          console.log(response.headers)
          commit('ADD_EVENTS', response.data)
          commit(
            'UPDATE_EVENTS_TOTAL',
            parseInt(response.headers['x-total-count'])
          )
        })
        .catch(console.log)
    },
    fetchEvent({ commit, getters }, id) {
      const event = getters.getEvent(id)
      if (!event) {
        EventsService.getEvent(id).then(({ data }) =>
          commit('UPDATE_EVENT', data)
        )
      } else {
        commit('UPDATE_EVENT', event)
      }
    }
  },
  modules: {}
})
