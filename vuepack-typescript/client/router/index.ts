import * as Router from 'vue-router'
import * as Vue from 'vue'

import * as Home from '../views/Home.vue'

Vue.use(Router)

export default new Router({
  mode: 'hash',
  routes: [
    {
      path: '/',
      component: Home
    }
  ]
})