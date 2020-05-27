<template>
  <div id="place-bets">
    <h2>Placing bets&hellip;</h2>

    <template
      v-if="isActive"
    >
      <p>Choose your bet!</p>

      <button
        v-for="(n, i) in (betsCollector.maximumBet + 1)"
        v-bind:disabled="i == illegalBetValue"
        v-bind:class="illegalBetValue"
        v-on:click="placeBet(i)"
      >
        {{ i }}
      </button>
    </template>

    <p v-else>
      Waiting for {{ players[activePlayerId].firstName }} to place a bet.
    </p>
  </div>
</template>

<script>
  export default {
    props: {
      betsCollector: Object,
      player: Object,
      isActive: Boolean,
      players: Object,
      activePlayerId: String,
    },
    computed: {
      illegalBetValue: function(){
        const betCount = this.betsCollector.betCount;
        const playerCount = Object.keys(this.players).length
        const isLastBet = (betCount + 1) === playerCount;

        console.log('illegalBetValue:', betCount, playerCount, isLastBet);

        return (isLastBet)
          ? this.betsCollector.illegalBetsTotal - this.betsCollector.betsTotal
          : null;
      },
    },
    methods: {
      placeBet: function(betValue){
        if (betValue == this.illegalBetValue) {
          throw new Error('Illegal bet selected.');
        }

        this.$websocketManager.send({
          destination: {
            resource: 'BetsCollector',
            action: 'placeBet',
            id: this.betsCollector.id
          },
          payload: {
            player: this.player.id,
            bet: betValue,
          }
        });
      }
    }
  };
</script>

<style scoped>
  #place-bets {
    display: block;
    box-shadow: 0.5em 0.5em 1em #2d2d2de0;
    padding: 2em;
    background: white;
  }

  h2 {
    margin-top: 0;
  }

  table {
    width: 100%;
    border-collapse: collapse;
  }

  td, th {
    border: 1px solid black;
    padding: 0.25em;
  }
</style>