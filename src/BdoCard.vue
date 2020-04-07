<template>
  <div class="card"
    v-bind:class="[
      'card-' + card.suit,
    ]"
    v-bind:id="'card-' + card.id"
    v-on:click="$emit('cardClick', card)"
  >
    <div class="card-corner-label">
      <span class="card-value">{{card.label}}</span>
      <BdoCardSymbol
        v-bind:suit="card.suit"
      ></BdoCardSymbol>
    </div>
    <span class="card-value card-value-main">{{card.label}}</span>
  </div>
</template>

<script>
  import BdoCardSymbol from './BdoCardSymbol.vue';

  export default {
    props: ['card', 'isPlayable'],
    components: {
      BdoCardSymbol
    },
  };
</script>

<style>
  .card {
    width: 8.25em;
    height: 12.5em;
    border: 1px solid darkgray;
    border-radius: 0.6em;
    background-color: #f1f0f0;
    box-shadow: 0.15em 0.15em 0.2em rgba(0, 0, 0, 0.5);
  }

  .card-clubs, .card-spades {
    color: black;
  }

  .card-hearts, .card-diamonds {
    color: #E93F33;
  }

  .card-corner-label {
    width: 1em;
    height: 2.65em;
    font-size: 1.5em;
    text-align: center;
  }

  .card-corner-label .card-symbol {
    width: 75%;
    margin: 0 auto;
  }

  .card-value-main {
    display: block;
    font-size: 4em;
    text-align: center;
  }

  .card.not-playable {
    background-color: #CECECE;
  }
</style>
