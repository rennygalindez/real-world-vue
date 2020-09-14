<template>
  <div>
    <h1>Network Issue</h1>
    <h3>
      It looks like there was a network issue, please press back button and try
      again.
    </h3>
    <router-link :to="{ name: 'event-list' }"> go to Home</router-link>
  </div>
</template>

<script>
export default {}
</script>

<style scoped></style>
