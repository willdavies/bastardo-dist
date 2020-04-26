<template>
  <div id="bastardo-game-session">
    <BdoJoinGame
      v-if="activeGameSession === null"
      v-bind:activePlayer="activePlayer"
      v-bind:gameSessionId="gameSessionId"
      v-bind:gameSession="gameSession"
    ></BdoJoinGame>
    <BdoGame
      v-else
    ></BdoGame>
  </div>
</template>

<script>
  import BdoJoinGame from './BdoJoinGame.vue';
  import BdoGame from './BdoGame.vue';

  export default {
    props: {
      activePlayer: Object,
      activeGameSession: Object,
    },
    data: function(){
      return {
        gameSessionId: this.$route.params.id,
        gameSession: null,
      }
    },
    created: function() {
      console.log('game session aftercreate');

      // Check for active game session
      if (this.activeGameSession !== null) {
        this.gameSession = this.activeGameSession;
      } else {
        // Retrieve game session
        this.$websocketManager.sendAndAwaitResponse({
          destination: {
            resource: 'GameSession',
            action: 'get',
          },
          payload: {
            id: this.gameSessionId,
          },
        })
        .then(responsePayload => {
          this.gameSession = responsePayload.gameSession
        })
        .catch(response => console.error(response));
      }
    },
    methods: {
      getGameUrl: function(absolute = false){
        const gameLink = this.$router.resolve({ name: 'game', params: { id: this.gameSessionId } });

        return absolute ? location.origin + gameLink.href : gameLink.href;
      }
    },
    components: {
      BdoJoinGame,
      BdoGame,
    },
  };
</script>
