<template>
  <div id="bastardo-app">
    <BdoControls
      v-bind:activePlayer="activePlayer"
      v-bind:activeGameSession="activeGameSession"
    ></BdoControls>
    <main>    
      <router-view
        v-bind:activePlayer="activePlayer"
        v-bind:activeGameSession="activeGameSession"
        v-on:setActivePlayer="setActivePlayer($event)"
        v-on:setActiveGameSession="setActiveGameSession($event)"
      ></router-view>
    </main>
  </div>
</template>

<script>
  import BdoControls from './BdoControls.vue';
  import cookie from 'cookie';

  export default {
    data: function(){
      return {
        activePlayer: null,
        activeGameSession: null,
      }
    },
    methods: {
      setActivePlayer(player){
        this.activePlayer = player;

        // Set/refresh cookie
        document.cookie = cookie.serialize(
          process.env.PLAYER_COOKIE_NAME,
          player.id,
          {
            sameSite: true,
            maxAge: process.env.DEFAULT_COOKIE_MAX_AGE
          }
        );
      },
      setActiveGameSession(gameSession){

        this.activeGameSession = gameSession;

        // Set/refresh cookie
        document.cookie = cookie.serialize(
          process.env.GAME_SESSION_COOKIE_NAME,
          gameSession.id,
          {
            sameSite: true,
            maxAge: process.env.GAME_SESSION_COOKIE_MAX_AGE
          }
        );
      },
    },
    beforeCreate: function(){
      // Get cookies
      const cookies = cookie.parse(document.cookie);

      let playerId = cookies[process.env.PLAYER_COOKIE_NAME];

      if (playerId) {
        this.$websocketManager.on('open', function(){
          this.$websocketManager.sendAndAwaitResponse({
            requestType: 'getPlayer',
            id: playerId,
          })
          .then(response => {
            this.setActivePlayer(response.payload.player);
          })
          .catch(error => {
            console.error(error);
          });
        }.bind(this))
      }
    },
    components: {
      BdoControls,
    }
  };
</script>

<style>
  * {
    box-sizing: border-box;
  }

  body {
    margin: 0;
    background-color: #2c8426;
    font-size: 16px;
  }

  .clearfix {
    content: "";
    display: table;
    clear: both;
  }

  main {
    margin: 3em 1em 1em;
  }
</style>
