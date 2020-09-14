<template>
  <div>
    <form @submit.prevent="createEvent">
      <BaseSelect
        :options="categories"
        label="Select a category"
        v-model="event.category"
        @blur="$v.event.category.$touch()"
        :class="{ error: $v.event.category.$error }"
      />
      <baseErrorItem
        :fieldError="$v.event.category.$error"
        :fieldRequired="$v.event.category.required"
        errorMessage="Category is required"
      />

      <h3>Name & describe your event</h3>
      <BaseInput
        :class="['field', { error: $v.event.title.$error }]"
        v-model="event.title"
        label="Title"
        placeholder="Add an event title"
        type="text"
        required
        @blur="$v.event.title.$touch()"
      />
      <baseErrorItem
        :fieldError="$v.event.title.$error"
        :fieldRequired="$v.event.title.required"
        errorMessage="Title is required"
      />
      <BaseInput
        class="field"
        v-model.trim="event.description"
        label="Description"
        placeholder="Add a description"
        type="text"
        required
        :class="{ error: $v.event.description.$error }"
        @blur="$v.event.description.$touch()"
      />
      <baseErrorItem
        :fieldError="$v.event.description.$error"
        :fieldRequired="$v.event.description.required"
        errorMessage="Description is required"
      />
      <h3>Where is your event?</h3>
      <BaseInput
        class="field"
        v-model.trim="event.location"
        label="Location"
        placeholder="Add a location"
        type="text"
        required
        :class="{ error: $v.event.location.$error }"
        @blur="$v.event.location.$touch()"
      />
      <baseErrorItem
        :fieldError="$v.event.location.$error"
        :fieldRequired="$v.event.location.required"
        errorMessage="Location is required"
      />
      <h3>When is your event?</h3>
      <div class="field">
        <label>Date</label>
        <datepicker
          v-model="event.date"
          placeholder="Select a date"
          @opened="$v.event.date.$touch()"
        />
      </div>
      <baseErrorItem
        :fieldError="$v.event.date.$error"
        :fieldRequired="$v.event.date.required"
        errorMessage="Date is required"
      />

      <BaseSelect
        :options="times"
        label="Select a time"
        v-model="event.time"
        class="field"
        :class="{ error: $v.event.time.$error }"
        @blur="$v.event.time.$touch()"
      />
      <baseErrorItem
        :fieldError="$v.event.time.$error"
        :fieldRequired="$v.event.time.required"
        errorMessage="Time is required"
      />

      <BaseButton
        :disabled="$v.$invalid"
        classButton="-fill-gradient"
        type="submit"
        >Submit</BaseButton
      >
    </form>
  </div>
</template>

<script>
import { mapActions, /* mapGetters, */ mapState } from 'vuex'
import datepicker from 'vuejs-datepicker'
import NProgress from 'nprogress'
import { required } from 'vuelidate/lib/validators'

export default {
  data() {
    let times = []
    for (let i = 0; i < 24; i++) {
      times.push(`${i}:00`)
    }
    return { times, event: this.createFreshEvent() }
  },
  validations: {
    event: {
      category: { required },
      title: { required },
      description: { required },
      location: { required },
      date: { required },
      time: { required }
    }
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
      NProgress.start()
      this.addEvent(this.event)
        .then(() => {
          this.$router.push({
            name: 'event-show',
            params: { id: this.event.id }
          })
          this.event = this.createFreshEvent()
        })
        .catch(() => {
          NProgress.done()
        })
    },
    createFreshEvent() {
      let user = this.$store.state.users.user.name
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

<style scoped>
.show_errors {
  position: fixed;
  top: 3rem;
}
</style>
