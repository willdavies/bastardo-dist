<template>
  <div id="bastardo-game">
    <div id="opponents">
      <Opponent
        v-for="seat in gameState.session.seats"
        v-if="seat.playerId != player.id"
        v-bind:seat="seat"
        v-bind:player="gameState.session.players[seat.playerId]"
        v-bind:hand="gameState.playerHands !== null ? gameState.playerHands[seat.playerId] : null"
        v-bind:key="seat.id"
        v-bind:isDealer="seat.playerId == gameState.session.dealerId"
        v-bind:isActive="seat.playerId == gameState.session.activePlayerId"
        v-bind:isSessionLeader="seat.playerId == sessionLeaderId"
        v-bind:isRoundLeader="seat.playerId == roundLeaderId"
      ></Opponent>      
    </div>

    <div id="dojo">
      <SelectDealer
        v-if="gameState.session.activeGame == null && gameState.session.dealerSelector !== null"
        v-bind:dealerSelector="gameState.session.dealerSelector"
        v-bind:player="player"
        v-bind:players="gameState.session.players"
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
      v-bind:isActive="player.id == gameState.session.activePlayerId"
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
