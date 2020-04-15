<template>
  <BdoPage>
    <template v-slot:title>
      New game
    </template>
    <template v-slot:content>
      <div
        v-if="gameId == null"
      >
        <p>To start a new game, click the button below</p>
        <button
          v-on:click="createNewGame"
        >Start new game</button>
      </div>
      <div
        v-else
      >
        <p>Game started!</p>
        <p>You and the other players can join the game at: </p>
        <p>
          <router-link :to="getGameLink()">
            {{ getGameLink(true) }}
          </router-link>
        </p>
      </div>
    </template>
  </BdoPage>
</template>

<script>
  import BdoPage from './BdoPage.vue';

  export default {
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
          console.log('createSession promise resolved');
          this.gameId = response.payload.gameSession.id
        })
        .catch(error => alert(error));
      },
      getGameLink: function(absolute = false){
        if (this.gameLink == null) {
          this.gameLink = this.$router.resolve({ name: 'game', params: { id: this.gameId } });
        }

        return absolute ? location.origin + this.gameLink.href : this.gameLink.href;
      }
    },
    components: {
      BdoPage
    }
  };
</script>
