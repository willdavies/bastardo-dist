<template>
	<div id="hand" class="clearfix">
    <button
      v-if="cards.length == 0"
      v-on:click="$emit('cardDeal')"
     >
      Deal hand
    </button>
    <BdoCard
      v-for="card in cards"
      v-bind:card="card"
      v-bind:isPlayable="cardIsPlayable(card)"
      v-bind:key="card.id"
      v-on:cardClick="cardClickHandler(card)"
    ></BdoCard>
  </div>
</template>

<script>
  import BdoCard from './BdoCard.vue';

  export default {
    props: ['cards', 'leadSuit'],
    components: {
      BdoCard
    },
    methods: {
      cardIsPlayable: function(card){
        return (
          this.leadSuit === null
          || card.suit == this.leadSuit
          || this.cards.map(card => card.suit).indexOf(this.leadSuit) == -1
        );
      },
      cardClickHandler: function(card){
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
