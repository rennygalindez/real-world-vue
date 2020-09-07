<template>
  <div>
    <template v-if="page != 1">
      <router-link
        :to="{ name: 'event-list', query: { page: page - 1 } }"
        rel="prev"
        >Prev Page |
      </router-link>
    </template>
    <template v-if="lastLink">
      <router-link :to="{ name: 'event-list', query: { page: page + 1 } }"
        >Next Page</router-link
      >
    </template>
  </div>
</template>

<script>
import { mapState } from 'vuex'
export default {
  props: { page: { type: [Number] } },
  computed: {
    ...mapState('events', { eventsTotal: 'eventsTotal' }),
    lastLink() {
      return this.eventsTotal > this.page * 3
    }
  }
}
</script>

<style scoped></style>
