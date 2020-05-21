<template>
  <div id="bastardo-game">
    <div id="opponents">
      <Opponent
        v-for="seat in gameState.session.seats"
        v-if="seat.player.id != player.id"
        v-bind:seat="seat"
        v-bind:hand="gameState.playerHands !== null ? gameState.playerHands[seat.player.id] : null"
        v-bind:key="seat.id"
        v-bind:isDealer="seat.id == gameState.session.dealerSeatId"
        v-bind:isActive="seat.id == gameState.session.activeSeatId"
        v-bind:isSessionLeader="seat.id == sessionLeaderId"
        v-bind:isRoundLeader="seat.id == roundLeaderId"
      ></Opponent>      
    </div>

    <div id="dojo">
      <SelectDealer
        v-if="gameState.session.activeGame == null && gameState.session.dealerSelector !== null"
        v-bind:dealerSelector="gameState.session.dealerSelector"
        v-bind:player="player"
        v-on:dealCards="dealCards"
      ></SelectDealer>

      <PlayedCards
        v-else-if="gameState.session.activeGame.activeRound.playedCards"
        v-bind:cards="gameState.session.activeGame.activeRound.playedCards"
        v-bind:leadSuit="leadSuit"
      ></PlayedCards>
    </div>

    <Hand
      v-if="gameState.playerHands"
      v-bind:cards="gameState.playerHands[player.id].cards"
      v-bind:leadSuit="leadSuit"
      v-bind:isActive="getSeatByPlayer(player).id == gameState.session.activeSeatId"
      v-on:cardPlay="playCard"
    ></Hand>
  </div>
</template>

<script>
  import Hand from './Hand.vue';
  import PlayedCards from './PlayedCards.vue';
  import Opponent from './Opponent.vue';
  import SelectDealer from './SelectDealer.vue';

  export default {
    props: {
      gameState: Object,
      player: Object,
    },
    data: function(){
      return {
        leadSuit: null,
        sessionLeaderId: null,
        roundLeaderId: null,
      }
    },
    methods: {
      dealCards: function(){
        this.$websocketManager.send({
          destination: {
            resource: 'GameSession',
            id: this.gameState.session.id,
            action: 'startNewRound',
          },
          payload: {
            player: this.player.id,
          }
        })
      },
      playCard: function(card){
        console.log('playCard:', card);
      },
      getSeatByPlayer: function(player) {
        const seatIndex = this.gameState.session.seats.map(seat => seat.player.id).indexOf(player.id);

        return seatIndex !== -1 ? this.gameState.session.seats[seatIndex] : null;
      },
      getSeatById: function(id) {
        const seatIndex = this.gameState.session.seats.map(seat => seat.id).indexOf(id);

        return seatIndex !== -1 ? this.gameState.session.seats[seatIndex] : null;
      },
    },
    components: {
      Hand,
      PlayedCards,
      Opponent,
      SelectDealer,
    }
  };
</script>

<style>
  #opponents {
    display: flex;
    justify-content: space-between;
  }
</style>
