<template>
  <div class="counter-ts" @click="$store.dispatch('INCREMENT')">
    {{ count }}
  </div>
</template>

<script>
  module.exports = require('./CounterTs.ts').default.vueComponentOptions
</script>

<style>
  .counter-ts {
    background-color: #f0f0f0;
    border-radius: 3px;
    box-shadow: inset 0 0 10px #ccc;
    cursor: pointer;
    font-size: 5rem;
    height: 200px;
    line-height: 200px;
    margin: 100px auto;
    text-align: center;
    user-select: none;
    width: 200px;
  }
</style>