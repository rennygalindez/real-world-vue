<template>
  <div>
    <h1>Event list</h1>
    <EventCard v-for="(event, index) of events" :key="index" :event="event" />
  </div>
</template>

<script>
import EventCard from '@/components/EventCard.vue'
import EventsService from '@/services/EventsService'

export default {
  components: { EventCard },
  data() {
    return {
      events: []
    }
  },
  created() {
    EventsService.getEvents()
      .then(({ data }) => (this.events = data))
      .catch(console.log)
  }
}
</script>

<style scoped></style>
