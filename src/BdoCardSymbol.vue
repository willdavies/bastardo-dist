<template>
	<img class="card-symbol" v-bind:src="'symbol-' + suit + '.svg'" />
</template>

<script>
export default {
  props: ['suit'],
};
</script>

<style>
.card-symbol {

}
</style>

