import * as Vue from 'vue'
import * as Vuex from 'vuex'
import { component } from 'vue-typescript-component'

@component({
  template: `
<div class="counter" @click="$store.dispatch('INCREMENT')">
  {{ count }}
</div>`
})
export default class extends Vue {
  get count(): number {
    return this.$store.state.count
  }
}