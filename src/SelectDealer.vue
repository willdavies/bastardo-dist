<template>
  <div id="select-dealer">
    <h2 v-html="getHeadingText()"></h2>

    <table v-if="dealerSelector.cutCards.length > 0">
      <tr>
        <th>Player</th>
        <th>Card</th>
      </tr>
      <tr
        v-for="card in dealerSelector.cutCards"
      >
        <td>{{ card.player.firstName }}</td>
        <td v-bind:class="['deck-cut-result', card.suit]">
          {{ card.label }}
          <CardSymbol v-bind:suit="card.suit"></CardSymbol>
        </td>
      </tr>
    </table>

    <p v-else>Nobody has cut the deck yet</p>

    <div
      v-if="dealerSelector.status == 'concluded'"
    >
      <div
        v-if="dealerSelector.dealerSeatId == getSeatByPlayer(player).id"
      >
        <p>You are the dealer!</p>
        <button
          v-on:click="$emit('dealCards', player)"
        >
          Deal the cards
        </button>
      </div>

      <p v-else>
        Waiting for {{ getSeatById(dealerSelector.dealerSeatId).player.firstName }} to deal the cards.
      </p>      
    </div>

    <div v-else>
      <div
        v-if="dealerSelector.activeSeatId == getSeatByPlayer(player).id"
      >
        <p>It's your turn!</p>
        <button
          v-on:click="cutDeck"
        >
          Cut the deck
        </button>
      </div>      

      <p v-else>
        Waiting for {{ getSeatById(dealerSelector.activeSeatId).player.firstName }} to cut the deck.
      </p>
    </div>
  </div>
</template>

<script>
  import CardSymbol from './CardSymbol.vue';

  export default {
    props: {
      dealerSelector: Object,
      player: Object,
    },
    methods: {
      getHeadingText: function(){
        const headings = {
          'pending-open': 'Choosing a dealer&hellip;',
          'pending-tied': 'It\'s a tie!',
          'concluded': 'Dealer chosen!',
        };

        return headings[this.dealerSelector.status];
      },
      cutDeck: function(){
        this.$websocketManager.send({
          destination: {
            resource: 'DealerSelector',
            action: 'cutDeck',
            id: this.dealerSelector.id
          },
          payload: {
            player: this.player.id,
          },
        });
      },
      getSeatByPlayer: function(player) {
        const seatIndex = this.dealerSelector.candidateSeats
          .map(seat => seat.player.id)
          .indexOf(player.id);

        return seatIndex !== -1 ? this.dealerSelector.candidateSeats[seatIndex] : null;
      },
      getSeatById: function(id) {
        const seatIndex = this.dealerSelector.candidateSeats.map(seat => seat.id).indexOf(id);

        return seatIndex !== -1 ? this.dealerSelector.candidateSeats[seatIndex] : null;
      },
    },
    components: {
      CardSymbol
    }
  };
</script>

<style scoped>
  #select-dealer {
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

  td.deck-cut-result {
    font-size: 1.5em;
  }

  td.deck-cut-result.diamonds, td.deck-cut-result.hearts {
    color: red;
  }

  td.deck-cut-result.spades, td.deck-cut-result.clubs {
    color: black;
  }

  .card-symbol {
    display: inline;
    width: 1em;
    vertical-align: middle;
  }
</style>
