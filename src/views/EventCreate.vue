<template>
  <form @submit.prevent="createEvent">
    <label>Select a category</label>
    <select v-model="event.category">
      <option v-for="cat in categories" :key="cat">{{ cat }}</option>
    </select>
    <h3>Name & describe your event</h3>
    <div class="field">
      <label>Title</label>
      <input
        v-model="event.title"
        type="text"
        placeholder="Add an event title"
        required
      />
    </div>
    <div class="field">
      <label>Description</label>
      <input
        v-model="event.description"
        type="text"
        placeholder="Add a description"
      />
    </div>
    <h3>Where is your event?</h3>
    <div class="field">
      <label>Location</label>
      <input
        v-model="event.location"
        type="text"
        placeholder="Add a location"
        required
      />
    </div>
    <h3>When is your event?</h3>
    <div class="field">
      <label>Date</label>
      <datepicker v-model="event.date" placeholder="Select a date" />
    </div>
    <div class="field">
      <label>Select a time</label>
      <select v-model="event.time">
        <option v-for="time in times" :key="time">{{ time }}</option>
      </select>
    </div>
    <input type="submit" class="button -fill-gradient" value="Submit" />
  </form>
</template>

<script>
import { mapActions, /* mapGetters, */ mapState } from 'vuex'
import datepicker from 'vuejs-datepicker'
export default {
  data() {
    let times = []
    for (let i = 0; i < 24; i++) {
      times.push(`${i}:00`)
    }
    return { times, event: this.createFreshEvent() }
  },
  computed: {
    ...mapState([/* 'user', */ 'categories']),
    ...mapState('users', {
      user: 'user'
    })
  },
  methods: {
    ...mapActions('events', { addEvent: 'createEvent' }),
    createEvent() {
      this.addEvent(this.event)
        .then(() => {
          this.$router.push({
            name: 'event-show',
            params: { id: this.event.id }
          })
          this.event = this.createFreshEvent()
        })
        .catch(() => {
          console.log('There was a problem creating your event.')
        })
    },
    createFreshEvent() {
      let user = this.user
      let id = Math.floor(Math.random() * 10000)
      return {
        id: id,
        category: '',
        organizer: user,
        title: '',
        description: '',
        location: '',
        date: '',
        time: '',
        attendees: []
      }
    }
  },
  components: { datepicker }
}
</script>

<style scoped></style>
