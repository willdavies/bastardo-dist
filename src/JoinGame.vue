<template>
  <Page>
    <template v-slot:title>
      Join session {{ gameState.session.id }}
    </template>

    <template v-slot:content>
      <div v-if="gameState === null">
        Retrieving game session&hellip;
      </div>

      <div v-else>
        <p>Invite others to join by sharing the link below:</p>
        <a v-bind:href="gameSessionUrl">{{ gameSessionUrl }}</a>

        <h2>Pick your color:</h2>
        <p>Fastest finger wins!</p>

        <form id="join-session-form"
          v-on:submit.prevent="joinGameSession"
        >
          <div id="avatars">
            <label class="avatar-option"
              v-for="color in gameState.session.seatColors"
              v-bind:for="'avatar-' + color" 
              v-bind:class="{
                selected: (selectedColor == color),
                taken: getColorOccupant(color) !== null,
              }"
            >
              <Avatar v-bind:color="color"></Avatar>

              <div class="seat-occupant"
                v-if="getColorOccupant(color) != null"
              >
                {{ getColorOccupant(color).firstName }}
              </div>

              <input type="radio"
                name="color"
                v-bind:id="'avatar-' + color"
                v-bind:value="color"
                v-model="selectedColor"
                v-bind:disabled="getColorOccupant(color) !== null"
              >
            </label>
          </div>

          <button
            type="submit"
            v-if="!playerHasJoined() && selectedColor !== null"
          >
            Join this game session!
          </button>
        </form>

        <button
          v-if="playerHasJoined()"
          v-on:click="$emit('voteToStartGame')"
        >
          I'm ready to start playing!
        </button>

        <button
          v-else
          v-on:click="unWatchGameSession"
        >
          Cancel
        </button>
      </div>
    </template>
  </Page>
</template>

<script>
  import Avatar from './Avatar.vue';
  import Page from './Page.vue';
  import { eventBus } from './app'

  export default {
    props: {
      activePlayer: Object,
      gameState: Object,
      gameSessionUrl: String,
    },
    data: function(){
      return {
        selectedColor: null,
        readyToStart: false,
      }
    },
    methods: {
      joinGameSession: function(){
        this.$websocketManager.send({
          destination: {
            resource: 'GameSession',
            id: this.gameState.session.id,
            action: 'join',
          },
          payload: {
            player: this.activePlayer.id,
            colourChoice: this.selectedColor,
          }
        })
      },
      playerHasJoined: function(){
        let userSeatIndex = this.gameState.session.seats
          .map(seat => seat.playerId)
          .indexOf(this.activePlayer.id);

        return userSeatIndex !== -1 ;
      },
      getColorOccupant: function(color){
        let seatIndex = this.gameState.session.seats
          .map(seat => seat.color)
          .indexOf(color);

        if (seatIndex == -1) {
          return null;
        }

        const playerId = this.gameState.session.seats[seatIndex].playerId;

        return this.gameState.session.players[playerId];
      },
      unWatchGameSession: function(){
        this.$websocketManager.sendAndAwaitResponse({
          destination: {
            resource: 'GameSession',
            id: this.gameState.session.id,
            action: 'unWatch',
          },
          payload: {
            player: this.activePlayer.id,
          }
        })
        .then(response => {
          if (response.payload.gameSession === null) {
            this.$router.push({ name: 'home' });

            eventBus.$emit('clear.gameState', response);
          }
        })
        .catch(response => console.error(response))
      },
    },
    components: {
      Page,
      Avatar,
    }
  };
</script>

<style>
  #avatars {
    display: flex;
  }

  .avatar-option {
    position: relative;
  }

  .avatar-option input[type="radio"] {
    display: none;
  }

  .avatar-option.selected {
    background: yellow;
  }

  .avatar-option.taken .avatar {
    opacity: 0.35;
  }

  .seat-occupant {
    position: absolute;
    top: 50%;
    width: 100%;
    border: 1px solid #000;
    background: white;
    text-align: center;
  }
</style>
