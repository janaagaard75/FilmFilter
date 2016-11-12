import * as Router from 'vue-router'
import * as Vuex from 'vuex'

declare module VuexRouterSync {
  export function sync(store: Vuex.Store<any>, router: Router): void
}