<template>
	<div id="hand" class="clearfix">
    <button
      v-if="cards !== undefined && cards.length == 0"
      v-on:click="$emit('cardDeal')"
     >
      Deal hand
    </button>
    <Card
      v-for="card in cards"
      v-bind:card="card"
      v-bind:class="[(cardIsPlayable(card) ? '' : 'not-') + 'playable']"
      v-bind:key="card.id"
      v-on:cardClick="cardClickHandler"
    ></Card>
  </div>
</template>

<script>
  import Card from './Card.vue';

  export default {
    props: ['cards', 'leadSuit'],
    components: {
      Card
    },
    methods: {
      cardIsPlayable: function(card){
        return (
          this.leadSuit === null
          || card.suit == this.leadSuit
          || this.cards.map(card => card.suit).indexOf(this.leadSuit) == -1
        );
      },
      cardClickHandler: function($event, card){
        if (this.cardIsPlayable(card)) {
          this.$emit('cardPlay', card);
        }
      }
    }
  };
</script>

<style>
  #hand {
    margin: 0 auto;
  }

  #hand .card {
    position: relative;
    float: left;
    margin-left: -6em;
  }

  #hand .card:first-child {
    margin-left: 0;
  }

  #hand .card.playable:hover {
    transform: translate(0, -15%);
    transition: transform 0.15s;
  }
</style>
