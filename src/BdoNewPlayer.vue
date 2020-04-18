<template>
  <BdoPage>
    <template v-slot:title>
      Register to play bastardo
    </template>
    <template v-slot:content>
      <div
        v-if="activePlayer == null"
      >
        <input v-model="firstName" placeholder="First Name">

        <input v-model="lastName" placeholder="Last Name">

        <label for="">
          <input type="checkbox" id="checkbox" v-model="cookieConsent">
          I agree to this site using cookies
        </label>

        <button v-on:click="createNewPlayer">Register</button>
      </div>
      <div
        v-else
      >
        <p>Hello {{ activePlayer.firstName }}. You are already registered</p>
      </div>
    </template>
  </BdoPage>
</template>

<script>
  import BdoPage from './BdoPage.vue';
  import cookie from 'cookie';

  export default {
    props: {
      activePlayer: Object
    },
    data: function(){
      return {
        playerId: null,
        firstName: null,
        lastName: null,
        cookieConsent: null,
      }
    },
    methods: {
      createNewPlayer: function(){
        if (this.cookieConsent == true) {        
          this.$websocketManager.sendAndAwaitResponse({
            requestType: 'createPlayer',
            firstName: this.firstName,
            lastName: this.lastName,
          })
          .then(response => {
            this.$emit('setPlayer', response.payload.player);

            // Set cookie
            document.cookie = cookie.serialize(
              process.env.PLAYER_COOKIE_NAME,
              response.payload.player.id,
              {
                sameSite: true,
                maxAge: process.env.PLAYER_COOKIE_MAX_AGE
              }
            );
          })
          .catch(error => console.error(error));
        }
      },
    },
    components: {
      BdoPage
    }
  };
</script>
