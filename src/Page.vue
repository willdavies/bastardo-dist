<template>
  <div id="page">
    <h1><slot name="title">Page title</slot></h1>
    <slot name="content">Page content</slot>
  </div>
</template>

<script>
  export default {
    data: function(){
      return {
        gameId: null,
      }
    },
  };
</script>

<style scoped>
  #page {
    border: 1px solid black;
    background-color: #f4eded;
    padding: 0 1em 2em;
  }
</style>
