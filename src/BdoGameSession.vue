<template>
  <div id="bastardo-game-session">
    <BdoPage
      v-if="activeGameSession === null"
    >
      <template v-slot:title>
        No active game session
      </template>

      <template v-slot:content>
        You do not currently have an active game session.
      </template>
    </BdoPage>

    <BdoJoinGame
      v-else-if="activeGameSession.isOpen === true"
      v-bind:activePlayer="activePlayer"
      v-bind:gameSession="activeGameSession"
      v-bind:gameSessionUrl="getGameSessionUrl(true)"
    ></BdoJoinGame>

    <BdoGame
      v-else
      v-bind:gameSession="activeGameSession"
      v-bind:player="activePlayer"
    ></BdoGame>
  </div>
</template>

<script>
  import BdoGame from './BdoGame.vue';
  import BdoJoinGame from './BdoJoinGame.vue';
  import BdoPage from './BdoPage.vue';

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
      }
    },
    components: {
      BdoGame,
      BdoJoinGame,
      BdoPage,
    },
  };
</script>
