<template>
  <div class="counter" @click="$store.dispatch('INCREMENT')">
    {{ count }}
  </div>
</template>

<script>
  export default {
    computed: {
      count() {
        return this.$store.state.count
      }
    }
  }
</script>

<style>
  .counter {
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