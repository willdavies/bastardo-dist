<template>
  <div id="bastardo-game">
    <div id="opponents">
      <Opponent
        v-for="seat in gameState.session.seats"
        v-if="seat.playerId != player.id"
        v-bind:key="seat.id"
        v-bind:color="seat.color"
        v-bind:player="gameState.session.players[seat.playerId]"
        v-bind:hand="gameState.playerHands !== null ? gameState.playerHands[seat.playerId] : null"
        v-bind:activeRound="gameState.session.activeGame !== null ? gameState.session.activeGame.activeRound : null"
        v-bind:isDealer="seat.playerId == gameState.session.dealerId"
        v-bind:isActive="seat.playerId == gameState.activePlayerId"
        v-bind:isSessionLeader="seat.playerId == sessionLeaderId"
        v-bind:isRoundLeader="seat.playerId == roundLeaderId"
      ></Opponent>      
    </div>

    <div id="dojo">
      <SelectDealer
        v-if="gameState.dealerSelector"
        v-bind:dealerSelector="gameState.dealerSelector"
        v-bind:player="player"
        v-bind:players="gameState.session.players"
        v-bind:activePlayerId="gameState.activePlayerId"
        v-on:dealCards="dealCards"
      ></SelectDealer>

      <PlaceBets
        v-else-if="gameState.betsCollector"
        v-bind:betsCollector="gameState.betsCollector"
        v-bind:player="player"
        v-bind:players="gameState.session.players"
        v-bind:activePlayerId="gameState.activePlayerId"
        v-bind:dealerId="gameState.session.dealerId"
      ></PlaceBets>

      <PlayedCards
        v-else
        v-bind:cards="gameState.session.activeGame.activeRound.playedCards"
        v-bind:leadSuit="leadSuit"
      ></PlayedCards>
    </div>

    <Hand
      v-if="gameState.playerHands"
      v-bind:cards="gameState.playerHands[player.id].cards"
      v-bind:leadSuit="leadSuit"
      v-bind:isActive="player.id == gameState.activePlayerId"
      v-on:cardPlay="playCard"
    ></Hand>
  </div>
</template>

<script>
  import Hand from './Hand.vue';
  import PlayedCards from './PlayedCards.vue';
  import Opponent from './Opponent.vue';
  import SelectDealer from './SelectDealer.vue';
  import PlaceBets from './PlaceBets.vue';

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
      PlaceBets,
    }
  };
</script>

<style>
  #opponents {
    display: flex;
    justify-content: space-around;
  }
</style>
