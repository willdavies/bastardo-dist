<template>
  <BdoPage>
    <template v-slot:title>
      New game
    </template>
    <template v-slot:content>
      <div
        v-if="activeGameSession == null"
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
          Why not <router-link :to="{ name: 'game', params: {id: activeGameSession.id} }">Active game</router-link> return to the game</p> and see how it goes?
        <p>
        </p>
      </div>
    </template>
  </BdoPage>
</template>

<script>
  import BdoPage from './BdoPage.vue';

  export default {
    props: {
      activePlayer: Object,
      activeGameSession: Object,
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
            resource: 'GameSession',
            action: 'create',
          },
        })
        .then(responsePayload => {
          console.log('createNewGameSession callback', responsePayload);
          // Forward player to new game session
          this.$router.push({ name: 'gameSession', params: { id: responsePayload.gameSession.id } })
        })
        .catch(error => console.error(error));
      },
    },
    components: {
      BdoPage
    }
  };
</script>
