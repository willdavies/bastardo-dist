<template>
  <div id="bastardo-app">
    <BdoDojo
        v-bind:cards=playedCards
    ></BdoDojo>
    <BdoHand
        v-bind:cards=handCards
        v-on:cardPlay="playCard"
        v-on:cardDeal="dealCards"
    ></BdoHand>
  </div>
</template>

<script>
  import BdoHand from './BdoHand.vue';
  import BdoDojo from './BdoDojo.vue';

  export default {
    data: function(){
      return {
        deck: [],
        handSize: 10,
        handCards: [],
        playedCards: [],
      }
    },
    methods: {
      createDeck: function(){
        let cards = [];

        const suits = [
          {suit: 'clubs'},
          {suit: 'diamonds'},
          {suit: 'spades'},
          {suit: 'hearts'},
        ];

        const ranks = [
          { label: '2', value: 1 },
          { label: '3', value: 2 },
          { label: '4', value: 3 },
          { label: '5', value: 4 },
          { label: '6', value: 5 },
          { label: '7', value: 6 },
          { label: '8', value: 7 },
          { label: '9', value: 8 },
          { label: '10', value: 9 },
          { label: 'J', value: 10 },
          { label: 'Q', value: 11 },
          { label: 'K', value: 12 },
          { label: 'A', value: 13 },
        ];

        while (this.deck.length < 52) {
          this.deck.push(Object.assign(
            {},
            suits[Math.floor(this.deck.length / 13)],
            ranks[this.deck.length % 13]
          ));
        }
      },
      dealCards: function(){
        let cards = [];
        let usedIndexes = [];

        if (this.deck.length == 0) {
          this.createDeck();
        }

        while (cards.length < this.handSize) {
          let random = Math.floor(Math.random() * this.deck.length);

          if (usedIndexes.indexOf(random) == -1) {
            cards.push(this.deck[random])
          }

          usedIndexes.push(random);
        }

        this.handCards = cards;
      },
      playCard: function(card){
        // Remove from hand
        let cardIndex = this.handCards.indexOf(card);

        // Add to dojo
        this.playedCards.push(card);
      }
    },
    components: {
      BdoHand,
      BdoDojo
    }
  };
</script>

<style>
  body {
    background-color: #2c8426;
    font-size: 16px
  }

  .clearfix {
    content: "";
    display: table;
    clear: both;
  }
</style>
