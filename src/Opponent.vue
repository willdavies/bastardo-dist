<template>
  <div
    class="opponent"
    v-bind:class="{active: isActive}"
  >
    <Avatar v-bind:color="color"></Avatar>
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
      <span class="name">{{ player.firstName }}</span>
      <span
        class="bet"
        v-if="playerBet !== null"
      >
        Bet: {{ playerBet }}
      </span>
      <div class="opponent-placard-badges">
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
      }
    },
    components: {
      Avatar,
      Card,
    }
  }
</script>

<style>
  .opponent {
    width: 8em;
    font-family: sans-serif;
  }

  .opponent.active .opponent-placard {
    background-color: #53F48B;
  }

  .avatar {
    display: block;
    width: 75%;
    margin: 0 auto;
  }

  .opponent-hand {
    height: 6em;
    overflow: hidden;
    font-size: 8px;
  }

  .opponent-hand-cards {
    margin: 0 auto;
  }

  .opponent-hand .card {
    position: relative;
    float: left;
    margin-left: -8em;
  }

  .opponent-hand .card:first-child {
    margin-left: 0;
  }

  .opponent-placard {
    box-sizing: border-box;
    position: relative;
    border: 1px solid #333;
    border-radius: 5px;
    padding: 0.5em 0.5em 1em;
    background-color: #BFF7FD;
    text-align: center;
  }

  .name {
    display: block;
    margin-bottom: 0.5em;
    font-size: 1.25em
  }

  .bet {
    display: block;
    margin-bottom: 0.5em;
    font-size: 1.25em
  }

  .opponent-placard-badges {
    display: flex;
    justify-content: space-around;
    height: 1.5em;
    margin: 0 auto;
  }

  .badge {
    display: block;
    height: 1.5em;
    width: 1.5em;
    border: 1px solid #888;
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