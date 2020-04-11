<template>
  <div class="card"
    v-bind:class="this.getSuitClass()"
    v-on:click="$emit('cardClick', $event, card)"
  >
    <div class="card-specifics"
      v-if="card != undefined"
    >
      <div class="card-corner-label">
        <span class="card-value">{{card.label}}</span>
        <BdoCardSymbol
          v-bind:suit="card.suit"
        ></BdoCardSymbol>
      </div>
      <span class="card-value card-value-main">{{card.label}}</span>    
    </div>
    <div
      v-else
      class="card-back"
    ></div>
  </div>
</template>

<script>
  import BdoCardSymbol from './BdoCardSymbol.vue';

  export default {
    props: {
      card: {
        type: Object,
        required: false,
      },
    },
    components: {
      BdoCardSymbol
    },
    methods: {
      getSuitClass: function(){
        return (typeof this.card !== 'undefined') ? 'card-' + this.card.suit : 'card-secret';
      }
    }
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

  .card-back {
    width: 7.25em;
    height: 11.5em;
    background: pink;
    margin: 0.5em;
    border-radius: 0.2em;
  }
</style>
