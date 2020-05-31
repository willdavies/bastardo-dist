<template>
	<div id="hand" class="clearfix">
    <Card
      v-for="card in cards"
      v-bind:card="card"
      v-bind:isPlayable="cardIsPlayable(card)"
      v-bind:class="{
        'playable': cardIsPlayable(card),
        'not-playable': !cardIsPlayable(card),
        'selected': card == selectedCard,
      }"
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
      leadSuit: String,
      selectedCard: Object,
    },
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
  }

  #hand .card.selected, #hand .card.playable:hover {
    transform: translate(0, -15%);
    transition: transform 0.15s;
  }
</style>
