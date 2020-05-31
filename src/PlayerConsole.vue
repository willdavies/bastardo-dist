<template>
  <div id="player-console">
    <Hand
      v-if="gameState.playerHands"
      v-bind:cards="playerHand ? playerHand.cards : []"
      v-bind:leadSuit="leadSuit"
      v-bind:isActive="isActive"
      v-bind:selectedCard="selectedCard"
      v-on:cardClick="handleCardClick"
    ></Hand>
    <div id="player-console-detail">
      <div
        class="player-console-section"
        id="player-console-identity"
      >
        <Avatar v-bind:color="color"></Avatar>
        <h2>{{ player.firstName }}</h2>
      </div>

      <div
        class="player-console-section"
        id="player-console-controls"
      >
        <template v-if="isActive">
          <template v-if="roundPhase == 'playing'">
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

          <template v-else-if="isDealer && roundPhase == 'dealing'">
            <p>You are the dealer!</p>

            <button
              v-on:click="dealCards"
            >
              Deal the cards
            </button>
          </template>          
        </template>
      </div>

      <div
        class="player-console-section"
        id="player-console-information"
      >
        <table>
          <tr v-if="currentBet !== null">
            <td>Bet:</td>
            <td>{{ currentBet }}</td>
          </tr>
          <tr v-if="tricksWon !== null">
            <td>Tricks won:</td>
            <td>{{ tricksWon }}</td>
          </tr>
        </table>
      </div>
    </div>
  </div>
</template>

<script>
  import Avatar from './Avatar.vue';
  import Hand from './Hand.vue';

  export default {
    props: {
      gameState: Object,
      roundPhase: String,
      player: Object,
      playerHand: {
        type: Object,
        required: false,
      },
      leadSuit: String,
      isActive: Boolean,
      isDealer: Boolean,
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
        if (
          this.gameState.session.activeGame
          && this.gameState.session.activeGame.activeRound
          && this.gameState.session.activeGame.activeRound.tricksWon.hasOwnProperty(this.player.id)
        ) {
          return Object.keys(this.gameState.session.activeGame.activeRound.tricksWon[this.player.id]).length
        }

        return null;
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
    },
    components: {
      Avatar,
      Hand,
    },
  };
</script>

<style>
  #player-console {
    display: grid;
    grid-template-rows: 6em 9em;
    /*width: 100%;*/
    margin-top: 1em;
  }

  #hand {
    grid-row-start: 1;
    grid-row-end: 2;
    margin: 0 auto -7.5em;
  }

  #player-console-detail {
    position: relative;
    grid-row-start: 2;

    display: grid;
    grid-template-columns: 30% 40% 30%;

    background: white;
    border-top: 1px solid black;
    box-shadow: 0em 0em 0.5em 0px gray;
  }

  .player-console-section {
    padding: 0.5em;
  }

  #player-console-identity {
    grid-column-start: 1;
  }
  
  #player-console-identity h2 {
    text-align: center;
  }

  #player-console-identity .avatar {
    display: block;
    width: 4em;
    margin: 0 auto;
  }

  #player-console-controls {
    grid-column-start: 2;
    grid-column-end: span 1;
  }

  #player-console-information {
    grid-column-start: 3;
    grid-column-end: span 1;
    border-right: 1px solid black;
  }
</style>