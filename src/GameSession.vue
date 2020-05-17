<template>
  <div id="bastardo-game-session">
    <Page
      v-if="gameState === null"
    >
      <template v-slot:title>
        No active game session
      </template>

      <template v-slot:content>
        You do not currently have an active game session.
      </template>
    </Page>

    <JoinGame
      v-else-if="gameState.session.isOpen === true"
      v-bind:activePlayer="activePlayer"
      v-bind:gameState="gameState"
      v-bind:gameSessionUrl="getGameSessionUrl(true)"
      v-on:voteToStartGame="voteToStartGame"
    ></JoinGame>

    <div v-else>    
      <GameSessionControls
        v-on:voteToAbort="voteToAbort"
      ></GameSessionControls>

      <Game
        v-bind:gameState="gameState"
        v-bind:player="activePlayer"
      ></Game>
    </div>
  </div>
</template>

<script>
  import Game from './Game.vue';
  import JoinGame from './JoinGame.vue';
  import Page from './Page.vue';
  import GameSessionControls from './GameSessionControls.vue';

  export default {
    props: {
      activePlayer: Object,
      gameState: Object,
    },
    created: function() {
      // Check for active game session
      if (this.gameState === null) {
        // Retrieve game session
        this.$websocketManager.send({
          destination: {
            resource: 'App',
            action: 'getGameSession',
          },
          payload: {
            id: this.$route.params.id,
          },
        })
      }
    },
    methods: {
      getGameSessionUrl: function(absolute = false){
        const gameLink = this.$router.resolve({ name: 'gameSession', params: { id: this.gameState.session.id } });

        return absolute ? location.origin + gameLink.href : gameLink.href;
      },
      voteToStartGame: function(){
        this.$websocketManager.send({
          destination: {
            resource: 'GameSession',
            id: this.gameState.session.id,
            action: 'voteToStartGame',
          },
          payload: {
            player: this.activePlayer.id,
          }
        })
      },
      voteToAbort: function() {
        const agreed = confirm("Are you sure that you want this game session to end? The session will continue until a majority of players have agreed to end the session.");

        if (agreed) {
          this.$websocketManager.send({
            destination: {
              resource: 'GameSession',
              action: 'voteToAbort',
              id: this.gameState.session.id,
            },
            payload: {
              player: this.activePlayer.id,
            },
          });
        }
      },
    },
    components: {
      Game,
      JoinGame,
      Page,
      GameSessionControls,
    },
  };
</script>
