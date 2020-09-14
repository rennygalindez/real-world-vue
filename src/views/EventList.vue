<template>
  <div>
    <h3>{{ example | reply('Renny') | excla | capi }}</h3>
    <h1>Event list</h1>
    <EventCard v-for="event of events" :key="event.id" :event="event" />
    <paginator :page="page" />
  </div>
</template>

<script>
import EventCard from '@/components/EventCard.vue'
import Paginator from '@/components/Paginator.vue'
import { mapActions, mapState } from 'vuex'
import store from '@/store'
import NProgress from 'nprogress'
function getEvents(to, next) {
  const currentPage = to.query.page || 1
  store
    .dispatch('events/fetchEvents', {
      page: currentPage,
      limit: store.state.events.EventsPerPage
    })
    .then(() => next())
    .catch(err => {
      NProgress.done()
      next({ name: 'network-issue', params: { err: err.message } })
    })
}

export default {
  components: { EventCard, Paginator },
  data() {
    return { loading: true }
  },
  computed: {
    ...mapState('events', { events: 'events' }),
    page() {
      return parseInt(this.$route.query.page) || 1
    },
    example() {
      return 'hello'
    }
  },
  methods: { ...mapActions('events', { fetchEvents: 'fetchEvents' }) },
  beforeRouteEnter(to, from, next) {
    getEvents(to, next)
  },
  beforeRouteUpdate(to, from, next) {
    getEvents(to, next)
  },
  filters: {
    capi(x) {
      return x.toUpperCase()
    },
    excla(x) {
      return `${x}!!!`
    },
    reply(x, name) {
      return `${x}, ${name}`
    }
  }
}
</script>

<style scoped></style>
