<template>
  <BdoPage>
    <template v-slot:title>
      Join session {{ gameSession.id }}
    </template>

    <template v-slot:content>
      <div v-if="gameSession === null">
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
              v-for="color in gameSession.seatColors"
              v-bind:for="'avatar-' + color" 
              v-bind:class="{
                selected: (selectedColor == color),
                taken: getColorOccupant(color) !== null,
              }"
            >
              <BdoAvatar v-bind:color="color"></BdoAvatar>

              <div class="seat-occupant"
                v-if="getColorOccupant(color) != null"
              >
                {{ getColorOccupant(color).player.firstName }}
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
            v-if="getUserSeat() === null && selectedColor !== null"
          >
            Join this game session!
          </button>
        </form>

        <button
          v-if="getUserSeat() !== null"
          v-on:click="signalReadinessToStart"
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
  </BdoPage>
</template>

<script>
  import BdoAvatar from './BdoAvatar.vue';
  import BdoPage from './BdoPage.vue';
  import { eventBus } from './app'

  export default {
    props: {
      activePlayer: Object,
      gameSession: Object,
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
            id: this.gameSession.id,
            action: 'join',
          },
          payload: {
            player: this.activePlayer.id,
            colourChoice: this.selectedColor,
          }
        })
      },
      getUserSeat: function(){
        let userSeatIndex = this.gameSession.seats
          .map(seat => seat.player.id)
          .indexOf(this.activePlayer.id);

        return userSeatIndex !== -1 ? this.gameSession.seats[userSeatIndex] : null;
      },
      getColorOccupant: function(color){
        let seatIndex = this.gameSession.seats
          .map(seat => seat.color)
          .indexOf(color);

        return seatIndex !== -1 ? this.gameSession.seats[seatIndex] : null;
      },
      signalReadinessToStart: function(){
        this.$websocketManager.send({
          destination: {
            resource: 'GameSession',
            id: this.gameSession.id,
            action: 'voteToStart',
          },
          payload: {
            player: this.activePlayer.id,
          }
        })
      },
      unWatchGameSession: function(){
        this.$websocketManager.sendAndAwaitResponse({
          destination: {
            resource: 'GameSession',
            id: this.gameSession.id,
            action: 'unWatch',
          },
          payload: {
            player: this.activePlayer.id,
          }
        })
        .then(response => {
          if (response.payload.gameSession === null) {
            this.$router.push({ name: 'home' });

            eventBus.$emit('clear.activeGameSession', response);
          }
        })
        .catch(response => console.error(response))
      },
    },
    components: {
      BdoPage,
      BdoAvatar,
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
