<template>
  <div>
    <h1>Oops {{ resource }} doesn't exist!</h1>
    <router-link :to="{ name: 'event-list' }">Home</router-link>
  </div>
</template>

<script>
export default {
  props: { resource: { type: String, default: 'page' } }
}
</script>

<style scoped></style>
