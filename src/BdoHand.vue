<template>
	<div class="hand clearfix">
    <button
      v-if="cards.length == 0"
      v-on:click="$emit('cardDeal')"
     >
      Deal hand
    </button>

    <div
      class="hand-card-slot"
      v-for="card in cards"
    >
      <BdoCard
        v-bind:card="card"
        v-bind:key="card.id"
        v-on:cardClick="$emit('cardPlay', $event)"
      ></BdoCard>
    </div>
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
  .hand {
    width: 80%;
    margin: 0 auto;
  }

  .hand .hand-card-slot {
    float: left;
  }

  .hand .card {
  }
</style>
