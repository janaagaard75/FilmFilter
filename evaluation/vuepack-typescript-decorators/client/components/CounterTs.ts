import Vue = require('vue')
// import * as Vuex from 'vuex'
import Vuex = require('vuex')
import { component } from 'vue-typescript-component'

@component({})
export default class Counterts extends Vue {
  get count(): number {
    return this.$store.state.count
  }
}