export default {
  methods: {
    sendValue(e) {
      this.$emit('input', e.target.value)
    }
  },
  props: {
    value: { type: String, require: true },
    label: { type: [String, Number] }
  },
  inheritAttrs: false
}
