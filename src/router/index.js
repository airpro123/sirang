import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import Laporan from '../views/Laporan.vue'
import Formulir from '../views/Formulir.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/laporan',
    name: 'Laporan',
    component: Laporan
  },
  {
    path: '/formulir',
    name: 'Formulir',
    component: Formulir
  },
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
