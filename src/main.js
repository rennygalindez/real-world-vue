import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import '@/components/globalComponents'
import Vuelidate from 'vuelidate'
import 'nprogress/nprogress.css'
Vue.use(Vuelidate)
/* Vue.mixin({
  created() {
    console.log('Hello, Im global!')
  }
}) */

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
