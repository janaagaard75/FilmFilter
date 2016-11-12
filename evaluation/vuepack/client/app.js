import App from './App.vue'
import router from './router'
import store from './store'
import Vue from 'vue'
import { sync } from 'vuex-router-sync'

sync(store, router)

const app = new Vue({
  router,
  store,
  ...App
})

export { app, router, store }