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
          v-on:click="createNewGame"
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
      createNewGame: function(){
        this.$websocketManager.sendAndAwaitResponse({
          requestType: 'createSession'
        })
        .then(response => {
          // Forward player to new game session
          this.$router.push({ name: 'game', params: { id: response.payload.gameSession.id } })
        })
        .catch(error => console.error(error));
      },
      // getGameLink: function(absolute = false){
      //   if (this.gameLink == null) {
      //     this.gameLink = this.$router.resolve({ name: 'game', params: { id: this.gameId } });
      //   }

      //   return absolute ? location.origin + this.gameLink.href : this.gameLink.href;
      // }
    },
    components: {
      BdoPage
    }
  };
</script>
