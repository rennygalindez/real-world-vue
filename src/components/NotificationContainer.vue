<template>
  <div class="notification-container">
    <NotificationBar
      v-for="notification in notifications"
      :key="notification.id"
      :notification="notification"
    />
  </div>
</template>
<script>
import { mapState } from 'vuex'
import NotificationBar from '@/components/NotificationBar.vue'
export default {
  components: {
    NotificationBar
  },
  computed: { ...mapState('notifications', { notifications: 'notifications' }) }
}
</script>

<style scoped>
.notification-container {
  position: fixed;
  bottom: 0;
  right: 0;
}
</style>
