<template>
  <div v-if="fieldError">
    <p v-if="!fieldRequired" class="errorMessage">{{ errorMessage }}</p>
  </div>
</template>

<script>
export default {
  props: {
    fieldError: { type: Boolean, require: true },
    fieldRequired: { type: Boolean, require: true },
    errorMessage: { type: String, require: true }
  }
}
</script>

<style lang="scss" scoped></style>
