<template>
  <div class="opponent">
    <BdoAvatar v-bind:color="user.color"></BdoAvatar>
    <div class="opponent-hand">
      <div class="opponent-hand-cards clearfix">
        <BdoCard
          v-for="n in user.cardCount"
          v-bind:key="n"
        ></BdoCard>        
      </div>
    </div>
    <div class="opponent-placard">
      <span class="name">{{ user.name }}</span>
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
  import BdoAvatar from './BdoAvatar.vue';
  import BdoCard from './BdoCard.vue';

  export default {
    props: {
      user: Object,
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
    components: {
      BdoAvatar,
      BdoCard,
    }
  }
</script>

<style>
  .opponent {
    width: 8em;
    font-family: sans-serif;
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