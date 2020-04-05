<template>
	<div id="hand" class="clearfix">
    <button
      v-if="cards.length == 0"
      v-on:click="$emit('cardDeal')"
     >
      Deal hand
    </button>
    <BdoCard
      v-for="card in cards"
      v-bind:card="card"
      v-bind:key="card.id"
      v-on:cardClick="$emit('cardPlay', $event)"
    ></BdoCard>
  </div>
</template>

<script>
  import BdoCard from './BdoCard.vue';

  export default {
    props: ['cards'],
    components: {
      BdoCard
    },
  };
</script>

<style>
  #hand {
    margin: 0 auto;
  }

  #hand .card {
    float: left;
    margin-left: -6em;
  }

  #hand .card:first-child {
    margin-left: 0;
  }

  #hand .card:hover {
    transform: translate(0, -15%);
  }
</style>
