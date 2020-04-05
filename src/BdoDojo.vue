<template>
	<div id="bastardo-dojo" class="clearfix">
    <div id="dojo-cards-container" class="clearfix">
      <BdoCard
        v-bind:card="card"
        v-bind:key="card.id" 
        v-for="card in cards"
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

<style scoped>
  #bastardo-dojo {
    height: 25em;
    width: 25em;
    border-radius: 50%;
    background: rgba(0, 0, 0, 0.5);
    margin: 2em auto;
  }
  #bastardo-dojo .card {
    float: left;
    margin-left: -8em;
  }
  #bastardo-dojo .card:first-child {
    margin-left: 0;
  }

  #dojo-cards-container {
    margin: 50% auto 0;
    transform: translate(0, -50%);
  }
</style>
