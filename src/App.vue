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

        if (player !== null) {
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
        } else {
          // Delete cookie
          document.cookie = cookie.serialize(
            process.env.PLAYER_COOKIE_NAME,
            null,
            {
              sameSite: true,
              expires: new Date('Thu, 01 Jan 1970 00:00:00 UTC'),
              path: '/',
            }
          );          
        }
      },
      setActiveGameSession(gameSession){
        console.log(gameSession);

        if (
          this.activeGameSession !== null
          && typeof gameSession.id !== 'undefined'
          && gameSession.id == this.activeGameSession.id
        ) {
          // Merge in values from supplied game session Object
          this.activeGameSession = Object.assign(
            this.activeGameSession,
            gameSession
          );          
        } else {
          // Replace game session
          this.activeGameSession = gameSession;
        }

        if (gameSession !== null) {
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
        } else {
          // Delete cookie
          document.cookie = cookie.serialize(
            process.env.GAME_SESSION_COOKIE_NAME,
            null,
            {
              sameSite: true,
              expires: new Date('Thu, 01 Jan 1970 00:00:00 UTC'),
              path: '/',
            }
          );          
        }
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
          this.$websocketManager.send({
            destination: {
              resource: 'App',
              action: 'getPlayer',
            },
            payload: {
              id: cookies[process.env.PLAYER_COOKIE_NAME],
            }
          })
        }

        // Check for gameSession
        if (cookies[process.env.GAME_SESSION_COOKIE_NAME]) {
          // Get active player
          this.$websocketManager.send({
            destination: {
              resource: 'App',
              action: 'getGameSession',
            },
            payload: {
              id: cookies[process.env.GAME_SESSION_COOKIE_NAME],
            }
          })
        }
      }.bind(this));

      eventBus.$on('update.activePlayer', (message) => {
        console.log('update.activePlayer', message);

        this.setActivePlayer(message.payload.player);
      });

      eventBus.$on('clear.activePlayer', (message) => {
        console.log('clear.activePlayer', message);

        this.setActivePlayer(null);
      });

      eventBus.$on('update.activeGameSession', (message) => {
        console.log('update.activeGameSession', message);

        this.setActiveGameSession(message.payload.gameSession);
      });

      eventBus.$on('clear.activeGameSession', (message) => {
        console.log('clear.activeGameSession', message);

        this.setActiveGameSession(null);
      });
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
