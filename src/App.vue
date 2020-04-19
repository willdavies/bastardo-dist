<template>
  <div id="bastardo-app">
    <BdoControls></BdoControls>
    <main>    
      <router-view
        v-bind:activePlayer="activePlayer"
        v-on:setActivePlayer="setActivePlayer($event)"
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
            maxAge: process.env.PLAYER_COOKIE_MAX_AGE
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
