<template>
  <div id="bastardo-app">
    <div
      v-if="appConnected === false"
    >
      Connecting&hellip;
    </div>

    <div
      v-else-if="appBootstrapped === false"
    >
      Fetching game and player data&hellip;
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
        appConnected: false,
        appBootstrapped: false,
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

        // Verify gameData
        if (typeof gameData.sessionId == 'undefined') {
          throw new Error('New game data must include a game session ID.');
        }

        // Check for null sessionId value
        if (gameData.sessionId == null) {
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

          // Clear game state
          this.gameState = null;

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

          return;
        }

        // We have new game state data

        // Check whether game state needs to be set up
        if (this.gameState === null) {
          // New game session is being set - create basic structure
          this.gameState = {
            sessionId: gameData.sessionId;
            session: null,
            dealerSelector: null,
            playerHands: null,
          };
        }

        // Verify that new data is for current game session
        if (gameData.sessionId !== this.gameState.sessionId) {
          throw new Error('Game session ID in new game data does not match current game session ID.');
        }

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

        // Check for updates to game state
        // Game session
        if (gameData.gameSession) {
          // Merge in values from supplied game session Object
          this.gameState.session = Object.assign(
            this.gameState.session,
            gameData.gameSession
          );
        }

        // Dealer selector
        if (gameData.dealerSelector) {
          // Update dealer selector
          this.gameState.dealerSelector = gameData.dealerSelector;
        }

        // Player hands
        if (gameData.playerHands) {
          // Update player hands
          this.gameState.playerHands = gameData.playerHands;
        }
      },
      bootstrapApp(){
        this.bootstrapPlayer().then((player) => {
          if (player !== null) {
            this.setActivePlayer(player);
            return this.bootstrapGame();              
          } else {
            return Promise.resolve(null);
          }
        }).then((gameState) => {
          if (gameState !== null) {
            this.updateGameState(gameState);
          }

          this.appBootstrapped = true;
        }).catch(message => {
          console.error(message);
        });
      },
      bootstrapPlayer(){
        return new Promise((resolve, reject) => {
          // Check cookies
          const cookies = cookie.parse(document.cookie);

          // Check for player
          if (cookies[process.env.PLAYER_COOKIE_NAME]) {
            // Get player
            this.$websocketManager.sendAndAwaitResponse({
              destination: {
                resource: 'App',
                action: 'getPlayer',
              },
              payload: {
                id: cookies[process.env.PLAYER_COOKIE_NAME],
              }
            }).then((message) => {
              resolve(message.payload.player);
            }).catch((message) => {
              console.error(message);
              resolve(null);
            });
          } else {
            // No need to fetch player, resolve promise
            console.log('resolving bootstrapPlayer - no cookie');
            resolve(null);
          }
        });
      },
      bootstrapGame(){
        return new Promise((resolve, reject) => {
          // Check cookies
          const cookies = cookie.parse(document.cookie);

          // Check for game session ID in cookie
          if (
            cookies[process.env.GAME_SESSION_COOKIE_NAME]
          ) {
            // Get game session
            this.$websocketManager.sendAndAwaitResponse({
              destination: {
                resource: 'App',
                action: 'getGameSession',
              },
              payload: {
                id: cookies[process.env.GAME_SESSION_COOKIE_NAME],
                player: this.activePlayer.id,
              }
            }).then((message) => {
              resolve(message.payload);
            }).catch((message) => {
              resolve(null)
            });
          } else {
            // No need to fetch game, resolve promise
            resolve(null);
          }
        });
      },
    },
    beforeCreate: function(){
      eventBus.$on('connectionOpen', function(event){
        // Set connected flag to allow render
        this.appConnected = true;

        this.bootstrapApp();
      }.bind(this));

      eventBus.$on('update.player', (player) => {
        console.log('update.player', player);

        this.setActivePlayer(player);
      });

      eventBus.$on('clear.activePlayer', (message) => {
        console.log('clear.activePlayer', message);

        this.setActivePlayer(null);
      });

      eventBus.$on('update.gameState', (message) => {
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
