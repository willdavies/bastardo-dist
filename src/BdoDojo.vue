<template>
	<div id="bastardo-dojo" class="clearfix">
    <div id="suit-indicator"
      v-if="leadSuit !== null"
    >
      <BdoCardSymbol
        v-bind:suit="leadSuit"
      ></BdoCardSymbol>
    </div>
    <div id="dojo-cards-container" class="clearfix">
      <BdoCard
        v-bind:card="card"
        v-bind:key="card.id" 
        v-for="card in cards"
      ></BdoCard>
    </div>
  </div>
</template>

<script>
  import BdoCard from './BdoCard.vue';
  import BdoCardSymbol from './BdoCardSymbol.vue';

  export default {
    props: ['cards', 'leadSuit'],
    components: {
      BdoCard,
      BdoCardSymbol
    },
  };
</script>

<style scoped>
  #bastardo-dojo {
    height: 25em;
    width: 25em;
    position: relative;
    border-radius: 50%;
    background: rgba(0, 0, 0, 0.5);
    margin: 2em auto;
  }

  #bastardo-dojo .card {
    float: left;
    margin-left: -6.5em;
  }

  #bastardo-dojo .card:first-child {
    margin-left: 0;
  }

  #dojo-cards-container {
    margin: 50% auto 0;
    transform: translate(0, -50%);
  }

  #suit-indicator {
    position: absolute;
    top: -1em;
    left: 50%;
    transform: translate(-50%, 0);
    width: 2.5em;
    border: 4px outset #D4AF37;
    padding: 0.5em;
    background: #FFDF00;
    border-bottom-left-radius: 45%;
    border-bottom-right-radius: 45%;
  }
</style>
