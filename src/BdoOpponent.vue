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
  </div>
</template>

<script>
  import BdoAvatar from './BdoAvatar.vue';
  import BdoCard from './BdoCard.vue';

  export default {
    props: {
      user: Object,
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
</style>