<template>
	<div id="played-cards" class="clearfix">
    <div id="suit-indicator"
      v-if="leadSuit !== null"
    >
      <CardSymbol
        v-bind:suit="leadSuit"
      ></CardSymbol>
    </div>
    <div id="dojo-cards-container" class="clearfix">
      <Card
        v-bind:card="card"
        v-bind:key="card.id" 
        v-for="card in cards"
        v-bind:class="{
          'card-leader': (cards.length != 1 && cardIsLeader(card))
        }"
      ></Card>
    </div>
  </div>
</template>

<script>
  import Card from './Card.vue';
  import CardSymbol from './CardSymbol.vue';

  export default {
    props: {
      cards: Array,
      leadSuit: String,
    },
    components: {
      Card,
      CardSymbol
    },
    methods: {
      cardIsLeader: function(card){
        // Get highest relative value in deck
        let max = this.cards
          .map(card => card.relativeValue)
          .reduce(function(a, b) {
            return Math.max(a, b);
          });

        return max == card.relativeValue;
      },
    },
  };
</script>

<style scoped>
  #played-cards {
    height: 25em;
    width: 25em;
    position: relative;
    border-radius: 50%;
    background: rgba(0, 0, 0, 0.5);
    margin: 2em auto;
  }

  #played-cards .card {
    position: relative;
    float: left;
    margin-left: -6.5em;
  }

  #played-cards .card.card-leader {
    transform: translate(0, -15%);
    transition: transform 0.15s;
  }

  #played-cards .card:first-child {
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
    width: 4em;
    border: 0.25em outset #D4AF37;
    padding: 0.5em;
    background: #FFDF00;
    border-bottom-left-radius: 45%;
    border-bottom-right-radius: 45%;
  }
</style>
