import EventsService from '@/services/EventsService'

export default {
  namespaced: true,
  state: {
    events: [],
    eventsTotal: 0,
    event: {},
    EventsPerPage: 3
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
    createEvent({ commit, dispatch }, event) {
      return EventsService.postEvent(event)
        .then(() => {
          commit('ADD_EVENT', event)
          dispatch(
            'notifications/addNotification',
            {
              type: 'success',
              message: 'Event sucessefuly added!'
            },
            { root: true }
          )
        })
        .catch(err => {
          dispatch(
            'notifications/addNotification',
            {
              type: 'error',
              message: `There was a problem creating your event: ${err.message}`
            },
            { root: true }
          )
          throw err
        })
    },
    fetchEvents({ commit, dispatch }, { limit, page }) {
      return EventsService.getEvents(limit, page)
        .then(response => {
          commit('ADD_EVENTS', response.data)
          commit(
            'UPDATE_EVENTS_TOTAL',
            parseInt(response.headers['x-total-count'])
          )
          return 1
        })
        .catch(err => {
          console.log(err)
          dispatch(
            'notifications/addNotification',
            {
              type: 'error',
              message: `There was a problem fetching the events: ${err.message}`
            },
            { root: true }
          )
          throw err
        })
    },
    fetchEvent({ commit, getters /*, dispatch */ }, id) {
      const event = getters.getEvent(id)
      if (!event) {
        return EventsService.getEvent(id).then(({ data }) => {
          commit('UPDATE_EVENT', data)
          return data
        })
      } else {
        commit('UPDATE_EVENT', event)
        return event
      }
    }
  }
}
