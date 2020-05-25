<template>
	<div id="hand" class="clearfix">
    <Card
      v-for="card in cards"
      v-bind:card="card"
      v-bind:isPlayable="cardIsPlayable(card)"
      v-bind:class="{
        'playable': isPlayable,
        'not-playable': !isPlayable,
        'selected': card == selectedCard,
      }"
      v-bind:key="card.id"
      v-on:cardClick="handleCardClick"
    ></Card>
  </div>
</template>

<script>
  import Card from './Card.vue';

  export default {
    props: {
      cards: Array,
      leadSuit: String,
    },
    data: function(){
      return {
        selectedCard: null
      }
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
      handleCardClick: function($event, card){
        // Toggle selected status
        if (card == this.selectedCard) {
          this.selectedCard = null;
          this.$emit('cardUnSelect', card);
        } else if (this.cardIsPlayable(card)) {
          this.selectedCard = card;
          this.$emit('cardSelect', card);
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

  #hand .card.selected, #hand .card.playable:hover {
    transform: translate(0, -15%);
    transition: transform 0.15s;
  }
</style>
