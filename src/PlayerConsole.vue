<template>
  <div id="player-console">
    <Hand
      v-if="gameState.playerHands"
      v-bind:cards="gameState.playerHands[player.id].cards"
      v-bind:leadSuit="leadSuit"
      v-bind:isActive="isActive"
      v-bind:selectedCard="selectedCard"
      v-on:cardClick="handleCardClick"
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
        <template v-if="isActive">
          <p>It's your turn!</p>

          <div v-if="selectedCard">
            <p>You have selected the {{ selectedCard.label }} of {{ selectedCard.suit }}</p>
            <button v-on:click="playCard">
              Play this card
            </button>
            <button v-on:click.stop="selectedCard = null">
              Cancel
            </button>
          </div>

          <p v-else>Click on a card to play</p>          
        </template>
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
      isActive: Boolean,
    },
    data: function(){
      return {
        selectedCard: null,
      }
    },
    computed: {
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
      handleCardClick: function(card, isPlayable){
        // Toggle selected status
        if (card == this.selectedCard) {
          this.selectedCard = null;
        } else if (isPlayable) {
          this.selectedCard = card;
        }
      },
      playCard: function(){
        const card = this.selectedCard;

        this.selectedCard = null;

        this.$websocketManager.send({
          destination: {
            resource: 'GameSession',
            id: this.gameState.sessionId,
            action: 'playCard',
          },
          payload: {
            player: this.player.id,
            card: {
              id: card.id,
              hash: card.hash,
            }
          }
        });
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