<template>
    <div id="game-session-controls">
      <button
        href="#"
        v-on:click.stop.prevent="voteToAbort()"
      >
        Suggest ending session
      </button> 
    </div>
</template>

<script>
  import { eventBus } from './app'

  export default {
    methods: {
      voteToAbort: function(){
        eventBus.$emit('session.voteToAbort');
      },
    },
  }
</script>

<style scoped>
  #game-session-controls {
    width: 100%;
    font-family: sans-serif;
  }
</style>