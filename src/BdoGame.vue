<template>
  <div id="bastardo-game">
    <div id="opponents">
      <BdoOpponent
        v-for="seat in gameSession.seats"
        v-if="seat.player.id != player.id"
        v-bind:seat="seat"
        v-bind:key="seat.id"
        v-bind:isDealer="seat.id == gameSession.dealerSeatId"
        v-bind:isActive="seat.id == gameSession.activeSeatId"
        v-bind:isSessionLeader="seat.id == sessionLeaderId"
        v-bind:isRoundLeader="seat.id == roundLeaderId"
      ></BdoOpponent>      
    </div>

    <BdoDojo
      v-bind:cards="gameSession.activeGame.activeRound.playedCards"
      v-bind:leadSuit="leadSuit"
    ></BdoDojo>

    <BdoHand
      v-bind:cards="gameSession.playerHand"
      v-bind:leadSuit="leadSuit"
      v-bind:isActive="getSeatByPlayer(player).id == gameSession.activeSeatId"
      v-on:cardPlay="playCard"
    ></BdoHand>

    <BdoSelectDealer
      v-if="gameSession.dealerSelector !== null"
      v-bind:dealerSelector="gameSession.dealerSelector"
      v-bind:player="player"
      v-on:dealCards="dealCards"
    ></BdoSelectDealer>
  </div>
</template>

<script>
  import BdoHand from './BdoHand.vue';
  import BdoDojo from './BdoDojo.vue';
  import BdoOpponent from './BdoOpponent.vue';
  import BdoSelectDealer from './BdoSelectDealer.vue';

  export default {
    props: {
      gameSession: Object,
      player: Object,
    },
    data: function(){
      return {
        leadSuit: null,
        sessionLeaderId: null,
        roundLeaderId: null,
      }
    },
    methods: {
      dealCards: function(){
        alert('dealing cards', arguments);
      },
      playCard: function(card){
        console.log('playCard:', card);
      },
      getSeatByPlayer: function(player) {
        const seatIndex = this.gameSession.seats.map(seat => seat.player.id).indexOf(player.id);

        return seatIndex !== -1 ? this.gameSession.seats[seatIndex] : null;
      },
      getSeatById: function(id) {
        const seatIndex = this.gameSession.seats.map(seat => seat.id).indexOf(id);

        return seatIndex !== -1 ? this.gameSession.seats[seatIndex] : null;
      },
    },
    components: {
      BdoHand,
      BdoDojo,
      BdoOpponent,
      BdoSelectDealer,
    }
  };
</script>

<style>
  #opponents {
    display: flex;
    justify-content: space-between;
  }
</style>
