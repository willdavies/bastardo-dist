<template>
  <Page>
    <template v-slot:title>
      Register to play bastardo
    </template>
    <template v-slot:content>
      <div
        v-if="activePlayer == null"
      >
        <form id="player-create-form"
          v-on:submit.prevent="createNewPlayer"
        >
          <div>
            <input id="first-name" v-model="firstName" placeholder="First Name">            
          </div>

          <div>
            <input id="last-name" v-model="lastName" placeholder="Last Name">
          </div>

          <div>
            <label for="cookie-consent">
              <input type="checkbox" id="cookie-consent" v-model="cookieConsent">
              I agree to this site using cookies
            </label>            
          </div>

          <div>
            <button>Register</button>        
          </div>
        </form>
      </div>
      <div v-else >
        <p>Hello {{ activePlayer.firstName }}. You are now registered to play Bastardo! Start a new game and invite your friends!</p>
      </div>
    </template>
  </Page>
</template>

<script>
  import Page from './Page.vue';
  import cookie from 'cookie';
  import { eventBus } from './app'

  export default {
    props: {
      activePlayer: Object
    },
    data: function(){
      return {
        firstName: null,
        lastName: null,
        cookieConsent: null,
      }
    },
    methods: {
      createNewPlayer: function(event){
        if (this.cookieConsent == true) {        
          this.$websocketManager.send({
            destination: {
              resource: 'App',
              action: 'createPlayer',
            },
            payload: {            
              firstName: this.firstName,
              lastName: this.lastName,
            }
          })
        }
      },
    },
    components: {
      Page
    }
  };
</script>
