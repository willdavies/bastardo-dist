<template>
  <div id="app">
    <BdoHand
        v-bind:cards=cards
    ></BdoHand>
  </div>
</template>

<script>
import BdoHand from './BdoHand.vue';
import BdoDojo from './BdoDojo.vue';

export default {
  data: function(){
    return {
      deck: [
        {
          id: 1,
          suit: 'clubs',
          value: '2'
        },
        {
          id: 2,
          suit: 'clubs',
          value: '3'
        },
        {
          id: 3,
          suit: 'clubs',
          value: '4'
        },
        {
          id: 4,
          suit: 'clubs',
          value: '5'
        },
        {
          id: 5,
          suit: 'clubs',
          value: '6'
        },
        {
          id: 6,
          suit: 'clubs',
          value: '7'
        },
        {
          id: 7,
          suit: 'clubs',
          value: '8'
        },
        {
          id: 8,
          suit: 'clubs',
          value: '9'
        },
        {
          id: 9,
          suit: 'clubs',
          value: '10'
        },
        {
          id: 10,
          suit: 'clubs',
          value: 'J'
        },
        {
          id: 11,
          suit: 'clubs',
          value: 'Q'
        },
        {
          id: 12,
          suit: 'clubs',
          value: 'K'
        },
        {
          id: 13,
          suit: 'clubs',
          value: 'A'
        },
        {
          id: 14,
          suit: 'diamonds',
          value: '2'
        },
        {
          id: 15,
          suit: 'diamonds',
          value: '3'
        },
        {
          id: 16,
          suit: 'diamonds',
          value: '4'
        },
        {
          id: 17,
          suit: 'diamonds',
          value: '5'
        },
        {
          id: 18,
          suit: 'diamonds',
          value: '6'
        },
        {
          id: 19,
          suit: 'diamonds',
          value: '7'
        },
        {
          id: 20,
          suit: 'diamonds',
          value: '8'
        },
        {
          id: 21,
          suit: 'diamonds',
          value: '9'
        },
        {
          id: 22,
          suit: 'diamonds',
          value: '10'
        },
        {
          id: 23,
          suit: 'diamonds',
          value: 'J'
        },
        {
          id: 24,
          suit: 'diamonds',
          value: 'Q'
        },
        {
          id: 25,
          suit: 'diamonds',
          value: 'K'
        },
        {
          id: 26,
          suit: 'diamonds',
          value: 'A'
        },
        {
          id: 27,
          suit: 'spades',
          value: '2'
        },
        {
          id: 28,
          suit: 'spades',
          value: '3'
        },
        {
          id: 29,
          suit: 'spades',
          value: '4'
        },
        {
          id: 30,
          suit: 'spades',
          value: '5'
        },
        {
          id: 31,
          suit: 'spades',
          value: '6'
        },
        {
          id: 32,
          suit: 'spades',
          value: '7'
        },
        {
          id: 33,
          suit: 'spades',
          value: '8'
        },
        {
          id: 34,
          suit: 'spades',
          value: '9'
        },
        {
          id: 35,
          suit: 'spades',
          value: '10'
        },
        {
          id: 36,
          suit: 'spades',
          value: 'J'
        },
        {
          id: 37,
          suit: 'spades',
          value: 'Q'
        },
        {
          id: 38,
          suit: 'spades',
          value: 'K'
        },
        {
          id: 39,
          suit: 'spades',
          value: 'A'
        },
        {
          id: 40,
          suit: 'hearts',
          value: '2'
        },
        {
          id: 41,
          suit: 'hearts',
          value: '3'
        },
        {
          id: 42,
          suit: 'hearts',
          value: '4'
        },
        {
          id: 43,
          suit: 'hearts',
          value: '5'
        },
        {
          id: 44,
          suit: 'hearts',
          value: '6'
        },
        {
          id: 45,
          suit: 'hearts',
          value: '7'
        },
        {
          id: 46,
          suit: 'hearts',
          value: '8'
        },
        {
          id: 47,
          suit: 'hearts',
          value: '9'
        },
        {
          id: 48,
          suit: 'hearts',
          value: '10'
        },
        {
          id: 49,
          suit: 'hearts',
          value: 'J'
        },
        {
          id: 50,
          suit: 'hearts',
          value: 'Q'
        },
        {
          id: 51,
          suit: 'hearts',
          value: 'K'
        },
        {
          id: 52,
          suit: 'hearts',
          value: 'A'
        }
      ],
      handSize: 10,
    }
  },
  computed: {
    cards: function(){
      let cards = [];
      let usedIndexes = [];

      while (cards.length < this.handSize) {
        let random = Math.floor(Math.random() * this.deck.length);

        if (usedIndexes.indexOf(random) == -1) {
          cards.push(this.deck[random])
        }

        usedIndexes.push(random);
      }

      return cards
    }
  },
  components: {
    BdoHand,
  }
};
</script>

<style>
body {
    background-color: #2c8426;
    font-size: 16px
}

.clearfix {
    content: "";
    display: table;
    clear: both;
}
</style>
