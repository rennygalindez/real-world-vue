<template>
  <div>
    <label v-if="label">{{ label }}</label>
    <input :value="value | upperCap" v-bind="$attrs" v-on="listeners" />
  </div>
</template>

<script>
import formFieldMixin from '@/mixins/formFieldMixin'
export default {
  mixins: [formFieldMixin],
  computed: {
    listeners() {
      return { ...this.$listeners, input: this.sendValue }
    }
  },
  filters: {
    upperCap(x) {
      return x.toUpperCase()
    }
  }
}
</script>

<style lang="scss" scoped></style>
