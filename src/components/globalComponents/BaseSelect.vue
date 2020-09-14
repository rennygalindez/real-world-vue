<template>
  <div>
    <label v-if="label" v-bind="$attrs">{{ label }}</label>
    <select :value="value" v-on="$listeners" @change="sendValue">
      <option
        :value="option"
        v-for="option of options"
        :key="option"
        selected="option===value"
        >{{ option }}</option
      >
    </select>
  </div>
</template>

<script>
import formFieldMixin from '@/mixins/formFieldMixin'

export default {
  mixins: [formFieldMixin],
  props: {
    options: { type: Array, require: true }
  }
}
</script>

<style lang="scss" scoped></style>
