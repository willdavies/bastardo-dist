<template>
  <div id="bastardo-app">
    <div
      v-if="connected === false"
    >
      Connecting&hellip;
    </div>

    <div v-else >
      <AppControls
        v-bind:activePlayer="activePlayer"
        v-bind:gameState="gameState"
      ></AppControls>
      <main>    
        <router-view
          v-bind:activePlayer="activePlayer"
          v-bind:gameState="gameState"
        ></router-view>
      </main>
    </div>
  </div>
</template>

<script>
  import AppControls from './AppControls.vue';
  import cookie from 'cookie';
  import { eventBus } from './app'

  export default {
    data: function(){
      return {
        connected: false,
        activePlayer: null,
        gameState: null,
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
      updateGameState(gameData){
        console.log('updateGameState', gameData);

        // Check whether game state needs to be set up
        if (
          this.gameState === null
          && typeof gameData.gameSession != 'undefined'
        ) {
          // New game session is being set - create basic structure
          this.gameState = {
            session: null,
            playerHands: null,
          };
        }

        // Check for game session
        if (typeof gameData.gameSession !== 'undefined') {
          // Update game state session
          const gameSession = gameData.gameSession;

          if (
            this.gameState.session !== null
            && gameSession !== null
            && typeof gameSession.id !== 'undefined'
            && gameSession.id == this.gameState.session.id
          ) {
            // Merge in values from supplied game session Object
            this.gameState.session = Object.assign(
              this.gameState.session,
              gameSession
            );          
          } else if (
            this.gameState.session !== null
            && gameSession == null
          ) {
            // Check whether game session is being aborted
            // @TODO Distinguish aborted gamesession from cancelled join of session - currently not possible
            if (
              this.gameState.session.activeGame == null
              || this.gameState.session.activeGame.isComplete == false
            ) {
              // Forward player to new game session
              this.$router.push(
                { name: 'home' }
              );

              alert('Your game session has been aborted with the agreement of a majority of players.')
            }

            // Replace game session
            this.gameState = null;
          } else {
            // Replace game session
            this.gameState.session = gameSession;
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
        }

        // Check for player hands
        if (
          typeof this.gameState.session !== 'undefined'
          && typeof gameData.playerHands !== 'undefined'
          && Array.isArray(gameData.playerHands)
        ) {
          // Store player hands
          this.gameState.playerHands = gameData.playerHands;
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
          // Get player
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

        // Check for game session ID in cookie
        if (cookies[process.env.GAME_SESSION_COOKIE_NAME]) {
          // Get game session
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

      eventBus.$on('update.player', (message) => {
        console.log('update.player', message);

        this.setActivePlayer(message.payload.player);
      });

      eventBus.$on('clear.activePlayer', (message) => {
        console.log('clear.activePlayer', message);

        this.setActivePlayer(null);
      });

      eventBus.$on('update.gameState', (message) => {
        console.log('update.gameState', message);

        this.updateGameState(message.payload);
      });

      eventBus.$on('clear.gameState', (message) => {
        console.log('clear.gameState', message);

        this.updateGameState(null);
      });
    },
    components: {
      AppControls,
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
    margin-top: 2em;
  }
</style>
