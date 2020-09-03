import Vue from 'vue'
import { camelCase, upperFirst } from 'lodash'

const requireComponent = require.context('./', true, /Base[A-Z]\w+\.(vue|js)$/)
requireComponent.keys().forEach(fileName => {
  const componentConfig = requireComponent(fileName)

  const conponentName = upperFirst(
    camelCase(fileName.replace(/^\.\/(.*)\.\w+$/, '$1'))
  )
  Vue.component(conponentName, componentConfig.default || componentConfig)
})
