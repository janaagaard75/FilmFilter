import * as App from './App.vue'
import router from './router'
import store from './store'
import * as Vue from 'vue'
import { sync } from './vuex-router-sync'

sync(store, router)

const app = new Vue({
  components: { App },
  el: '#all',
  render: h => h('app'),
  router: router,
  store: store,
})

export { app, router, store }