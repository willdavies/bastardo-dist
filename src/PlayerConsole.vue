<template>
  <div id="player-console">
    <Hand
      v-if="gameState.playerHands"
      v-bind:cards="gameState.playerHands[player.id].cards"
      v-bind:leadSuit="leadSuit"
      v-bind:isActive="player.id == gameState.activePlayerId"
      v-on:cardSelect="selectCard"
    ></Hand>
    <div id="player-console-detail" class="clearfix">
      <div id="player-console-information">
        <ul>
          <li v-if="currentBet">Bet: {{ currentBet }}</li>
          <li>Tricks won: {{ tricksWon }}</li>
          <li>Game score: {{ currentGameScore }}</li>
        </ul>
      </div>
      <div id="player-console-controls">
        
      </div>
    </div>
  </div>
</template>

<script>
  import Hand from './Hand.vue';

  export default {
    props: {
      gameState: Object,
      player: Object,
      leadSuit: String,
    },
    computed: {
      isActive: function(){},
      color: function(){
        return this.gameState.session.seats
          .find(seat => seat.playerId == this.player.id)
          .color;
      },
      currentBet: function(){
        return (
          this.gameState.session.activeGame
          && this.gameState.session.activeGame.activeRound
        )
          ? this.gameState.session.activeGame.activeRound.bets[this.player.id]
          : null
      },
      tricksWon: function(){
        return '#TBC'
      },
      currentGameScore: function(){
        return '#TBC'
      },
    },
    methods: {
      selectCard: function(){

      },
    },
    components: {
      Hand,
    },
  };
</script>

<style>
  #player-console {
    width: 100%;
    margin-top: 1em;
    clear: both;
  }

  #player-console-detail {
    width: 100%;
    background: white;
  }
  
  #player-console-information {
    width: 50%;
    float: left;
    border-right: 1px solid black;
  }
  
  #player-console-controls {
    width: 50%;
    float: left;
  }
</style>