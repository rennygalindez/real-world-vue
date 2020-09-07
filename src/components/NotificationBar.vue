<template>
  <div :class="['notification-bar', notificationTypeClass]">
    <p>{{ notification.message }}</p>
  </div>
</template>

<script>
import { mapActions } from 'vuex'
export default {
  data() {
    return { timeout: null }
  },
  props: { notification: { type: Object, require: true } },
  computed: {
    notificationTypeClass() {
      return `-text-${this.notification.type}`
    }
  },
  methods: { ...mapActions('notifications', ['removeNotification']) },
  mounted() {
    this.timeout = setTimeout(() => {
      this.removeNotification(this.notification.id)
    }, 5000)
  },
  beforeDestroy() {
    clearTimeout(this.timeout)
  }
}
</script>

<style scoped>
.notification-bar {
  margin: 1em 0 1em;
}
</style>
