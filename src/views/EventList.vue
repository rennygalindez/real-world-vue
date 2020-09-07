<template>
  <div>
    <h1>Event list</h1>
    <template v-if="loading">
      <img :src="require('../../public/Pulse-1s-200px.gif')" />
    </template>
    <template v-else>
      <EventCard v-for="(event, index) of events" :key="index" :event="event" />
      <paginator :page="page" />
    </template>
  </div>
</template>

<script>
import EventCard from '@/components/EventCard.vue'
import Paginator from '@/components/Paginator.vue'
import { mapActions, mapState } from 'vuex'
export default {
  components: { EventCard, Paginator },
  data() {
    return { loading: true }
  },
  computed: {
    ...mapState('events', { events: 'events' }),
    page() {
      return parseInt(this.$route.query.page) || 1
    }
  },
  methods: { ...mapActions('events', { fetchEvents: 'fetchEvents' }) },
  created() {
    this.fetchEvents({ limit: 3, page: this.page }).then(
      () => (this.loading = false)
    )
  }
}
</script>

<style scoped></style>
