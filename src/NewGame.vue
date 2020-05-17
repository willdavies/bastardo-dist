<template>
  <Page>
    <template v-slot:title>
      New game
    </template>
    <template v-slot:content>
      <div
        v-if="gameState == null"
      >
        <p>To start a new game, click the button below</p>
        <button
          v-on:click="createNewGameSession"
        >Start new game</button>
      </div>
      <div
        v-else
      >
        <p>You appear to have an active game already.</p>
        <p>
          Why not <router-link :to="{ name: 'gameSession', params: { id: gameState.session.id } }">return to the game</router-link> and see how it goes?
        <p>
        </p>
      </div>
    </template>
  </Page>
</template>

<script>
  import Page from './Page.vue';
  import { eventBus } from './app'

  export default {
    props: {
      activePlayer: Object,
      gameState: Object,
    },
    data: function(){
      return {
        gameId: null,
        gameLink: null,
      }
    },
    methods: {
      createNewGameSession: function(){
        this.$websocketManager.sendAndAwaitResponse({
          destination: {
            resource: 'App',
            action: 'createGameSession',
          },
        })
        .then(response => {
          eventBus.$emit('update.gameState', response);

          // Forward player to new game session
          this.$router.push(
            {
              name: 'gameSession',
              params: { id: response.payload.gameSession.id }
            }
          );
        })
        .catch(error => console.error(error));
      },
    },
    components: {
      Page
    }
  };
</script>
