<template>
  <div id="bastardo-app">
    <main>    
      <BdoGame></BdoGame>      
    </main>
  </div>
</template>

<script>
  import BdoControls from './BdoControls.vue';
  import BdoGame from './BdoGame.vue';

  export default {
    components: {
      BdoGame,
    }
  };
</script>

<style>
  * {
    box-sizing: border-box;
  }

  body {
    margin: 0;
    background-color: #2c8426;
    font-size: 16px;
  }

  .clearfix {
    content: "";
    display: table;
    clear: both;
  }

  main {
    margin: 1em;
  }
</style>
