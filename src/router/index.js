import Vue from 'vue'
import VueRouter from 'vue-router'
import EventList from '@/views/EventList'
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
    component: () => import(/* webpackChunkName: "show" */ '@/views/EventShow')
  },
  {
    path: '*',
    name: 'jocker',
    component: () =>
      import(/* webpackChunkName: "notFound" */ '@/views/RouteNotFound')
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
