<template>
  <div
    class="opponent"
    v-bind:class="{active: isActive}"
  >
    <div class="opponent-hand">
      <div
        v-if="hand !== null"
        class="opponent-hand-cards clearfix"
      >
        <Card
          v-for="n in hand.cardCount"
          v-bind:key="n"
        ></Card>        
      </div>
    </div>
    <div class="opponent-placard">
      <div class="opponent-identity">
        <Avatar v-bind:color="color"></Avatar>
        <span class="name">{{ player.firstName }}</span>        
      </div>

      <div class="opponent-stats">
        <span
          class="bet"
          v-if="playerBet !== null"
        >
          Bet: {{ playerBet }}
        </span>

        <span
          class="tricks-won"
          v-if="tricksWon !== null"
        >
          Won: {{ tricksWon }}
        </span>
      </div>

      <div class="opponent-badges">
        <span class="badge session-leader-badge"
          v-if="isSessionLeader"
        >SL</span>
        <span class="badge round-leader-badge"
          v-if="isRoundLeader"
        >RL</span>
        <span class="badge dealer-badge"
          v-if="isDealer"
        >D</span>        
      </div>        
    </div>
  </div>
</template>

<script>
  import Avatar from './Avatar.vue';
  import Card from './Card.vue';

  export default {
    props: {
      color: String,
      player: Object,
      hand: Object,
      activeRound: Object,
      isActive: {
        type: Boolean,
        default: false,
      },
      isDealer: {
        type: Boolean,
        default: false,
      },
      isSessionLeader: {
        type: Boolean,
        default: false,
      },
      isRoundLeader: {
        type: Boolean,
        default: false,
      },
    },
    computed: {
      playerBet: function(){
        if (
          this.activeRound
          && this.activeRound.bets.hasOwnProperty(this.player.id)
        ) {
          return this.activeRound.bets[this.player.id];
        }

        return null;
      },
      tricksWon: function(){
        if (
          this.activeRound
          && this.activeRound.tricksWon.hasOwnProperty(this.player.id)
        ) {
          return this.activeRound.tricksWon[this.player.id].length
        }

        return null;
      },
    },
    components: {
      Avatar,
      Card,
    }
  }
</script>

<style>
  .opponent {
    width: 33.3333%;
    padding: 0.5em;
    font-family: sans-serif;
  }

  .opponent-hand {
    height: 4.5em;
    overflow: hidden;
    font-size: 8px;
  }

  .opponent-hand-cards {
    margin: 0 auto;
  }

  .opponent-hand .card {
    position: relative;
    float: left;
    margin-left: -7em;
  }

  .opponent-hand .card:first-child {
    margin-left: 0;
  }

  .opponent-placard {
    display: grid;
    grid-template-columns: 35% 65%;
    grid-template-rows: 1fr 2em;
    box-sizing: border-box;
    border: 1px solid #333;
    border-radius: 5px;
    background-color: #BFF7FD;
  }

  .opponent.active .opponent-placard {
    background-color: #53F48B;
  }

  .opponent-identity {
    grid-row-start: 1;
    grid-row-end: none;
  }

  .avatar {
    display: block;
    max-width: 4em;
    margin: 0 auto;
  }

  .name {
    display: block;
    margin-bottom: 0.5em;
    font-size: 1.25em;
    text-align: center;
  }

  .opponent-stats {
    padding: 0.5em;
    font-size: 0.8em
  }

  .bet, .tricks-won {
    display: block;
    margin-bottom: 0.5em;
    font-size: 1.25em
  }

  .opponent-badges {
    height: 1.5em;
  }

  .badge {
    display: inline-block;
    height: 1.5em;
    width: 1.5em;
    margin-right: 0.5em;
    border: 1px solid #888;
    text-align: center;
    line-height: 1.5;
  }

  .badge.session-leader-badge {
    background-color: red;
  }

  .badge.round-leader-badge {
    background-color: green;
  }

  .badge.dealer-badge {
    background: #FFF;
    border-radius: 50%;
  }
</style>