<template>
  <div id="bastardo-game">
    <div id="opponents">
      <BdoOpponent
        v-for="opponent in opponents"
        v-bind:user="opponent"
        v-bind:key="opponent.id"
        v-bind:isDealer="opponent.id == dealerId"
        v-bind:isSessionLeader="opponent.id == sessionLeaderId"
        v-bind:isRoundLeader="opponent.id == roundLeaderId"
      ></BdoOpponent>      
    </div>
    <BdoDojo
      v-bind:cards=playedCards
      v-bind:leadSuit=leadSuit
    ></BdoDojo>
    <BdoHand
      v-bind:cards=handCards
      v-bind:leadSuit=leadSuit
      v-on:cardPlay="playCard"
      v-on:cardDeal="dealCards"
    ></BdoHand>
  </div>
</template>

<script>
  import BdoHand from './BdoHand.vue';
  import BdoDojo from './BdoDojo.vue';
  import BdoOpponent from './BdoOpponent.vue';

  export default {
    data: function(){
      console.log(this.$route.params.id);

      return {
        gameId: this.$route.params.id,
        deck: [],
        handSize: 7,
        handCards: [],
        playedCards: [],
        leadSuit: null,
        dealerId: 4,
        sessionLeaderId: 4,
        roundLeaderId: 4,
      }
    },
    computed: {
      opponents: function(){
        return [
          {
            id: 1,
            name: 'Chris',
            color: 'black',
            cardCount: this.handSize,
          },
          {
            id: 2,
            name: 'Louise',
            color: 'green',
            cardCount: this.handSize,
          },
          {
            id: 3,
            name: 'Jack',
            color: 'blue',
            cardCount: this.handSize,
          },
          {
            id: 4,
            name: 'Hannah',
            color: 'purple',
            cardCount: this.handSize,
          },
          {
            id: 5,
            name: 'Andrew',
            color: 'red',
            cardCount: this.handSize,
          },
          {
            id: 6,
            name: 'Will',
            color: 'white',
            cardCount: this.handSize,
          },
        ]
      },
    },
    methods: {
      playCard: function(card){
        // Remove from hand
        this.handCards.splice(this.handCards.indexOf(card), 1);

        // Check whether card is first in dojo
        if (this.playedCards.length == 0) {
          this.leadSuit = card.suit;
        }

        // Set relative value of card
        let modifier;

        switch (card.suit) {
          case 'diamonds':
            modifier = 26;
            break;
          case this.leadSuit:
            modifier = 13;
            break;
          default:
            modifier = 0;
            break;
        }

        card.relativeValue = card.value + modifier;

        // Add to dojo
        this.playedCards.push(card);
      }
    },
    components: {
      BdoHand,
      BdoDojo,
      BdoOpponent,
    }
  };
</script>

<style>
  #opponents {
    display: flex;
    justify-content: space-between;
  }
</style>
