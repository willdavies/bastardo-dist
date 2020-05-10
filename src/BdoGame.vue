<template>
  <div id="bastardo-game">
    <div id="opponents">
      <BdoOpponent
        v-for="seat in gameSession.seats"
        v-bind:seat="seat"
        v-bind:key="seat.id"
        v-bind:isDealer="seat.id == gameSession.dealerSeatId"
        v-bind:isActive="seat.id == gameSession.activeSeatId"
        v-bind:isSessionLeader="seat.id == sessionLeaderId"
        v-bind:isRoundLeader="seat.id == roundLeaderId"
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
    props: {
      gameSession: Object,
    },
    data: function(){
      return {
        gameId: this.$route.params.id,
        deck: [],
        handSize: 7,
        handCards: [],
        playedCards: [],
        leadSuit: null,
        sessionLeaderId: null,
        roundLeaderId: null,
      }
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
