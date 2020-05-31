<template>
	<div id="hand" class="clearfix">
    <Card
      v-for="card in cards"
      v-bind:card="card"
      v-bind:class="getCardClasses(card)"
      v-bind:key="card.id"
      v-on:cardClick="$emit('cardClick', card, cardIsPlayable(card))"
    ></Card>
  </div>
</template>

<script>
  import Card from './Card.vue';

  export default {
    props: {
      cards: Array,
      activeRound: Object,
      leadSuit: String,
      selectedCard: Object,
      playerCount: Number,
      isActive: Boolean,
    },
    components: {
      Card
    },
    methods: {
      cardIsPlayable: function(card){
        return (
          this.activeRound
          && this.activeRound.playedCards.length == this.playerCount
          || (
            this.leadSuit === null
            || card.suit == this.leadSuit
            || this.cards.map(card => card.suit).indexOf(this.leadSuit) == -1
          )
        );
      },
      getCardClasses: function(card){
        // No interactivity when player is not active
        if (!this.isActive) {
          return null
        }

        const classes = [];

        // All cards are playable if current trick is finished
        if (this.cardIsPlayable(card)) {
          classes.push('playable');
        } else {
          classes.push('not-playable');
        }

        // Check whether card is selected
        if (card == this.selectedCard) {
          classes.push('selected');
        }

        return classes;
      },
    }
  };
</script>

<style>
  #hand .card {
    position: relative;
    float: left;
    margin-left: -6em;
  }

  #hand .card:first-child {
    margin-left: 0;
    transition: transform 0.15s;
  }

  #hand .card.playable.selected {
    transform: translateY(-15%);
  }

  #hand .card.playable:not(.selected):hover {
    transform: translateY(-10%);
  }
</style>
