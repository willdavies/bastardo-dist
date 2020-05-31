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
          'card-leader': (cards.length != 1 && card === leadCard)
        }"
      ></Card>
    </div>

    <div
      v-if="winnerMessage"
      id="winner-indicator"
    >
      {{ winnerMessage }}
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
      player: Object,
      playerCount: Number,
    },
    computed: {
      leadCard: function(){
        if (this.cards.length === 0) {
          return null;
        }

        const sortedCards = this.cards.map(x => x)
          .sort((cardA, cardB) => {
            return cardB.relativeValue - cardA.relativeValue;
          });

        return sortedCards[0];
      },
      winnerMessage: function(){
        if (this.cards.length == this.playerCount) {
          console.log('winnerMessage:', this.leadCard.player, this.player);

          const descriptor = this.leadCard.player.id == this.player.id
            ? 'You win'
            : this.leadCard.player.firstName + ' wins';

          return descriptor + ' the trick!';
        }

        return null;
      },
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
    components: {
      Card,
      CardSymbol
    },
  };
</script>

<style scoped>
  #played-cards {
    width: 100%;
  }

  #played-cards .card {
    position: relative;
    float: left;
    margin-left: -6.5em;
  }

  #played-cards .card.card-leader {
    transform: translateY(-15%);
    transition: transform 0.15s;
  }

  #played-cards .card:first-child {
    margin-left: 0;
  }

  #dojo-cards-container {
    margin: 0 auto;
    transform: translateY(50%);
  }

  #suit-indicator {
    position: absolute;
    top: -1em;
    left: 50%;
    transform: translateX(-50%);
    width: 4em;
    border: 0.25em outset #D4AF37;
    padding: 0.5em;
    background: #FFDF00;
    border-bottom-left-radius: 45%;
    border-bottom-right-radius: 45%;
  }

  #winner-indicator {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translateX(-50%);
    width: 100%;
    border: 1px solid black;
    padding: 0.5em;
    background: #FFDF00;
    font-size: 1.5em;
    text-align: center;
  }
</style>
