<template>
  <div id="bastardo-app">
    <div
      v-if="connected === false"
    >
      Connecting&hellip;
    </div>

    <div v-else >
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
  </div>
</template>

<script>
  import BdoControls from './BdoControls.vue';
  import cookie from 'cookie';
  import { eventBus } from './app'

  export default {
    data: function(){
      return {
        connected: false,
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
            maxAge: process.env.DEFAULT_COOKIE_MAX_AGE,
            path: '/',
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
            maxAge: process.env.DEFAULT_COOKIE_MAX_AGE,
            path: '/',
          }
        );
      },
    },
    beforeCreate: function(){
      eventBus.$on('connectionOpen', function(event){
        // Set connectied flag to trigger render
        this.connected = true

        // Check cookies
        const cookies = cookie.parse(document.cookie);

        // Check for player
        if (cookies[process.env.PLAYER_COOKIE_NAME]) {
          // Get active player
          this.$websocketManager.sendAndAwaitResponse({
            destination: {
              resource: 'Player',
              action: 'get',
            },
            payload: {
              id: cookies[process.env.PLAYER_COOKIE_NAME],
            }
          })
          .then(responsePayload => {
            this.setActivePlayer(responsePayload.player);
          })
          .catch(error => {
            console.error(error);
          });
        }

        // Check for gameSession
        if (cookies[process.env.GAME_SESSION_COOKIE_NAME]) {
          // Get active player
          this.$websocketManager.sendAndAwaitResponse({
            destination: {
              resource: 'GameSession',
              action: 'get',
            },
            payload: {
              id: cookies[process.env.GAME_SESSION_COOKIE_NAME],
            }
          })
          .then(responsePayload => {
            this.setActiveGameSession(responsePayload.gameSession);
          })
          .catch(error => {
            console.error(error);
          });
        }
      }.bind(this));
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
