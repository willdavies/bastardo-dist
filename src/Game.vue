<template>
  <div id="bastardo-game">
    <div id="opponents">
      <Opponent
        v-for="seat in opponents"
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

    <div id="play-area">
      <div id="dojo">
        <SelectDealer
          v-if="gameState.dealerSelector"
          class="dialogue-box"
          v-bind:dealerSelector="gameState.dealerSelector"
          v-bind:player="player"
          v-bind:players="gameState.session.players"
          v-bind:activePlayerId="gameState.activePlayerId"
          v-bind:dealerId="gameState.dealerId"
          v-bind:isActive="playerIsActive"
        ></SelectDealer>

        <template
          v-else-if="
            gameState.session.activeGame
            && gameState.session.activeGame.activeRound
          "
        >      
          <PlaceBets
            v-if="roundPhase == 'betting'"
            class="dialogue-box"
            v-bind:betsCollector="gameState.betsCollector"
            v-bind:player="player"
            v-bind:players="gameState.session.players"
            v-bind:activePlayerId="gameState.activePlayerId"
            v-bind:isActive="playerIsActive"
            v-bind:dealerId="gameState.dealerId"
          ></PlaceBets>

          <PlayedCards
            v-else-if="gameState.session.activeGame.activeRound.playedCards"
            v-bind:cards="gameState.session.activeGame.activeRound.playedCards"
            v-bind:leadSuit="leadSuit"
            v-bind:player="player"
            v-bind:playerCount="Object.keys(gameState.session.players).length"
          ></PlayedCards>
        </template>
      </div>
    </div>

    <PlayerConsole
      v-bind:gameState="gameState"
      v-bind:roundPhase="roundPhase"
      v-bind:player="player"
      v-bind:playerHand="getPlayerHand(player.id)"
      v-bind:isActive="playerIsActive"
      v-bind:isDealer="playerIsDealer"
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
        if (this.gameState.playerHands === null) {
          if (
            this.gameState.dealerSelector !== null
            && this.gameState.dealerSelector.status !== 'concluded'
          ) {
            return 'choosingDealer';
          } else {
            return 'dealing';
          }
        } else if (this.gameState.betsCollector) {
          return 'betting';
        } else if (this.gameState.session.activeGame.activeRound) {
          return 'playing';
        }
      },
      opponents: function(){
        // Ensures that player sees preceeding player as last in the list of
        // opponents
        const beforePlayer = [];
        const afterPlayer = [];
        var passedPlayer = false;

        // Divide opponents between those preceeding and those succeeding
        // player
        this.gameState.session.seats.forEach(seat => {
          if (seat.playerId === this.player.id) {
            passedPlayer = true;
          } else {
            const targetArray = passedPlayer ? afterPlayer : beforePlayer;

            targetArray.push(seat);            
          }
        });

        return afterPlayer.concat(beforePlayer);
      },
      leadSuit: function(){
        return (
          this.gameState.session.activeGame
          && this.gameState.session.activeGame.activeRound
        )
          ? this.gameState.session.activeGame.activeRound.leadSuit
          : null;
      },
      playerIsActive: function() {
        return this.player.id === this.gameState.activePlayerId;
      },
      playerIsDealer: function() {
        return this.player.id === this.gameState.dealerId;
      }
    },
    methods: {
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

  #play-area {
    position: relative;
    height: 24em;
    width: 28em;
    box-sizing: border-box;
    margin: 1em auto -3em;
    padding: 0 2em;
  }

  #dojo {
    width: 100%;
    height: 100%;
    border-radius: 50%;
    background: rgba(0, 0, 0, 0.5);
  }

  #dojo .dialogue-box {
    display: block;
    box-shadow: 0.5em 0.5em 1em #2d2d2de0;
    padding: 2em;
    background: white;
    position: absolute;
    top: 50%;
    width: 150%;
    left: 50%;
    transform: translate(-50%, -50%);
  }
</style>
