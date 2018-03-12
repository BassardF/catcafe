import Vue from 'vue'
import Router from 'vue-router'
import Index from '@/components/Index'
import Cafes from '@/components/Cafes'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Index',
      component: Index
    }, {
      path: '/:country/:city',
      name: 'Cafes',
      component: Cafes
    }, {
      path: '/:country/:city/:placeid',
      name: 'Cafes',
      component: Cafes
    }
  ]
})
