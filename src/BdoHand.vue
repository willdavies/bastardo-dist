<template>
	<div class="hand clearfix">
    <div
      class="hand-card-slot"
      v-for="card in cards"
    >
      <BdoCard
        v-bind:card="card"
        v-bind:key="card.id" 
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
/*    // display: flex;
    // align-items: center;
    // justify-content: space-around;
*/
    border: 1px solid red;
    width: 50%;
    margin: 0 auto;
}

.hand .hand-card-slot {
/*    // flex: 1;
*/
    border: 1px solid blue; 
    float: left;
}
.hand .card {
}
</style>
