import Vue from 'vue'
import VueRouter from 'vue-router'
import EventList from '@/views/EventList'
import NProgress from 'nprogress'
import store from '@/store'
Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'event-list',
    component: EventList
  },
  {
    path: '/event/create',
    name: 'event-create',
    component: () =>
      import(/* webpackChunkName: "create" */ '@/views/EventCreate')
  },
  {
    path: '/event/:id',
    name: 'event-show',
    props: true,
    beforeEnter: (to, from, next) => {
      store
        .dispatch('events/fetchEvent', to.params.id)
        .then(event => {
          to.params.event = event
          next()
        })
        .catch(err => {
          if (err.response && err.response.status === 404) {
            next({ name: 'notFound', params: { resource: 'event' } })
          } else next({ name: 'network-issue', params: { err: err.message } })
        })
    },
    component: () => import(/* webpackChunkName: "show" */ '@/views/EventShow')
  },
  {
    path: '/networissue',
    name: 'network-issue',
    component: () =>
      import(/* webpackChunkName: "notFound" */ '@/views/NetworkIssue')
  },
  {
    path: '/notFound404',
    name: 'notFound',
    alias: '*',
    props: true,
    component: () =>
      import(/* webpackChunkName: "notFound" */ '@/views/RouteNotFound')
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})
router.beforeEach((to, from, next) => {
  NProgress.start()
  next()
})
router.afterEach(() => {
  NProgress.done()
})
export default router
