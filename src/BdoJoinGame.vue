<template>
  <BdoPage>
    <template v-slot:title>
      Join session {{ gameSessionId }}
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
        <div id="avatars">
          <div class="avatar-option"
            v-for="color in gameSession.seatColors"
            v-bind:class="{
              selected: (selectedColor == color),
              taken: getColorClaimant(color) !== null,
            }"
            v-on:click="selectColor(color)"
          >
            <BdoAvatar v-bind:color="color"></BdoAvatar>

            <div
              v-if="getColorClaimant(color) != null"
            >
              {{ claimant.player.firstName }}
            </div>
          </div>
        </div>

        <button
          v-if="selectedColor !== null"
          v-on:click="joinGameSession"
        >Join this game session!</button>
      </div>
    </template>
  </BdoPage>
</template>

<script>
  import BdoPage from './BdoPage.vue';
  import BdoAvatar from './BdoAvatar.vue';

  export default {
    props: {
      activePlayer: Object,
      gameSession: Object,
      gameSessionUrl: String,
    },
    data: function(){
      return {
        selectedColor: null,
      }
    },
    methods: {
      joinGameSession: function(){
        this.$websocketManager.send({
          destination: {
            resource: 'GameSession',
            action: 'join',
            id: this.gameSession.id,
          },
          payload: {
            player: this.activePlayer.id,
            colourChoice: this.selectedColor,
          }
        })
      },
      getColorClaimant: function(color){
        let seatIndex = this.gameSession.seats
          .map(seat => seat)
          .indexOf(color);

        return seatIndex !== -1 ? this.gameSession.seats[seatIndex] : null;
      },
      selectColor: function(color){
        if (this.getColourClaimant(color) == null) {
          this.selectedColor = color;
        }
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

  .avatar-option.selected {
    background: yellow;
  }

  .avatar-option.taken {
    opacity: 0.7;
  }
</style>
