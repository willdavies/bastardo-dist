<template>
  <div id="bastardo-game">
    <div id="opponents">
      <Opponent
        v-for="seat in gameState.session.seats"
        v-if="seat.playerId != player.id"
        v-bind:key="seat.id"
        v-bind:color="seat.color"
        v-bind:player="gameState.session.players[seat.playerId]"
        v-bind:hand="getPlayerHand(seat.playerId)"
        v-bind:activeRound="gameState.session.activeGame !== null ? gameState.session.activeGame.activeRound : null"
        v-bind:isDealer="seat.playerId == gameState.dealerId"
        v-bind:isActive="seat.playerId == gameState.activePlayerId"
        v-bind:isSessionLeader="seat.playerId == sessionLeaderId"
        v-bind:isRoundLeader="seat.playerId == roundLeaderId"
      ></Opponent>      
    </div>

    <div id="dojo">
      <SelectDealer
        v-if="roundPhase == 'choosingDealer'"
        v-bind:dealerSelector="gameState.dealerSelector"
        v-bind:player="player"
        v-bind:players="gameState.session.players"
        v-bind:activePlayerId="gameState.activePlayerId"
        v-bind:isActive="playerIsActive"
        v-on:dealCards="dealCards"
      ></SelectDealer>

      <PlaceBets
        v-else-if="gameState.betsCollector"
        v-bind:betsCollector="gameState.betsCollector"
        v-bind:player="player"
        v-bind:players="gameState.session.players"
        v-bind:activePlayerId="gameState.activePlayerId"
        v-bind:isActive="playerIsActive"
        v-bind:dealerId="gameState.dealerId"
      ></PlaceBets>

      <PlayedCards
        v-else
        v-bind:cards="gameState.session.activeGame.activeRound.playedCards"
        v-bind:leadSuit="leadSuit"
      ></PlayedCards>
    </div>

    <PlayerConsole
      v-bind:gameState="gameState"
      v-bind:roundPhase="roundPhase"
      v-bind:player="player"
      v-bind:playerHand="getPlayerHand(player.id)"
      v-bind:isActive="playerIsActive"
      v-bind:leadSuit="leadSuit"
    ></PlayerConsole>
  </div>
</template>

<script>
  import Opponent from './Opponent.vue';
  import PlaceBets from './PlaceBets.vue';
  import PlayedCards from './PlayedCards.vue';
  import PlayerConsole from './PlayerConsole.vue';
  import SelectDealer from './SelectDealer.vue';

  export default {
    props: {
      gameState: Object,
      player: Object,
    },
    data: function(){
      return {
        sessionLeaderId: null,
        roundLeaderId: null,
      }
    },
    computed: {
      roundPhase: function(){
        if (this.gameState.dealerId === null) {
          return 'choosingDealer';
        } else if (this.gameState.betsCollector) {
          return 'betting';
        } else if (this.gameState.playerHands === null) {
          return 'dealing';
        } else if (this.gameState.session.activeGame.activeRound) {}{
          return 'playing';
        }
      },
      leadSuit: function(){
        return (
          this.gameState.session.activeGame
          && this.gameState.session.activeGame.activeRound
          && this.gameState.session.activeGame.activeRound.playedCards.length > 0
        )
          ? this.gameState.session.activeGame.activeRound.playedCards[0].suit
          : null;
      },
      playerIsActive: function() {
        return this.player.id === this.gameState.activePlayerId;
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
      getPlayerHand(playerId){
        if (
          this.gameState.playerHands 
          && this.gameState.playerHands.hasOwnProperty(playerId)
        ) {
          return this.gameState.playerHands[playerId]; 
        }

        return null;
      },
    },
    components: {
      Opponent,
      PlaceBets,
      PlayedCards,
      PlayerConsole,
      SelectDealer,
    }
  };
</script>

<style>
  #opponents {
    display: flex;
    justify-content: space-around;
  }
</style>
