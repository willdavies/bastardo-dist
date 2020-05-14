<template>
  <div id="bastardo-game-session">
    <Page
      v-if="activeGameSession === null"
    >
      <template v-slot:title>
        No active game session
      </template>

      <template v-slot:content>
        You do not currently have an active game session.
      </template>
    </Page>

    <JoinGame
      v-else-if="activeGameSession.isOpen === true"
      v-bind:activePlayer="activePlayer"
      v-bind:gameSession="activeGameSession"
      v-bind:gameSessionUrl="getGameSessionUrl(true)"
    ></JoinGame>

    <div v-else>    
      <GameSessionControls
        v-on:voteToAbort="voteToAbort"
      ></GameSessionControls>

      <Game
        v-bind:gameSession="activeGameSession"
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
      activeGameSession: Object,
    },
    created: function() {
      // Check for active game session
      if (this.activeGameSession === null) {
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
        const gameLink = this.$router.resolve({ name: 'gameSession', params: { id: this.activeGameSession.id } });

        return absolute ? location.origin + gameLink.href : gameLink.href;
      },
      voteToAbort: function() {
        const agreed = confirm("Are you sure that you want this game session to end? The session will continue until a majority of players have agreed to end the session.");

        if (agreed) {
          this.$websocketManager.send({
            destination: {
              resource: 'GameSession',
              action: 'voteToAbort',
              id: this.activeGameSession.id,
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
