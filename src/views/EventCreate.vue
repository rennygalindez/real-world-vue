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
      <template v-if="$v.event.category.$error">
        <p v-if="!$v.event.category.required" class="errorMessage">
          Category is required.
        </p>
      </template>

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
      <template v-if="$v.event.title.$error" class="error">
        <p class="messageError">Title is required</p>
      </template>
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
      <template v-if="$v.event.description.$error">
        <p v-if="!$v.event.description.required" class="errorMessage">
          Description is required.
        </p>
      </template>
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
      <template v-if="$v.event.location.$error">
        <p v-if="!$v.event.location.required" class="errorMessage">
          Location is required.
        </p>
      </template>
      <h3>When is your event?</h3>
      <div class="field">
        <label>Date</label>
        <datepicker
          v-model="event.date"
          placeholder="Select a date"
          @opened="$v.event.date.$touch()"
        />
      </div>
      <template v-if="$v.event.date.$error">
        <p v-if="!$v.event.date.required" class="errorMessage">
          Date is required.
        </p>
      </template>

      <BaseSelect
        :options="times"
        label="Select a time"
        v-model="event.time"
        class="field"
        :class="{ error: $v.event.time.$error }"
        @blur="$v.event.time.$touch()"
      />
      <template v-if="$v.event.time.$error">
        <p v-if="!$v.event.time.required" class="errorMessage">
          Time is required.
        </p>
      </template>
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
