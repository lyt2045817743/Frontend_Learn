import Vue from 'vue'
import VueRouter from 'vue-router'
import TvPlay from '../views/tvplay/TvPlay.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: TvPlay
  },
  {
    path: '/about',
    name: 'About',
    component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
  },
  
  {
    path: '/book/Book.vue',
    name: 'Book',
    component: () => import('../views/book/Book.vue')
  },
  {
    path: '/music/Music.vue',
    name: 'Music',
    component: () => import('../views/music/Music.vue')
  },
  {
    path: '/talk/Talk.vue',
    name: 'Talk',
    component: () => import('../views/talk/Talk.vue')
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
