<template>
  <img class="card-symbol" v-bind:src="this.symbol" />
</template>

<script>
  import SymbolClubs from './assets/symbol-clubs.svg';
  import SymbolDiamonds from './assets/symbol-diamonds.svg';
  import SymbolHearts from './assets/symbol-hearts.svg';
  import SymbolSpades from './assets/symbol-spades.svg';

  export default {
    props: ['suit'],
    computed: {
      symbol: function(){
        switch (this.suit) {
          case 'clubs':
            return SymbolClubs;
            break;
          case 'diamonds':
            return SymbolDiamonds;
            break;
          case 'hearts':
            return SymbolHearts;
            break;
          case 'spades':
            return SymbolSpades;
            break;
        }
      }
    }
  };
</script>

<style>
  .card-symbol {
    width: 100%;
  }
</style>
