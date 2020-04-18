<template>
  <div id="bastardo-app">
    <BdoControls></BdoControls>
    <main>    
      <router-view
        v-bind:activePlayer="activePlayer"
        v-on:setActivePlayer="setActivePlayer($event)"
      ></router-view>
    </main>
  </div>
</template>

<script>
  import BdoControls from './BdoControls.vue';
  import BdoGame from './BdoGame.vue';

  export default {
    data: function(){
      return {
        activePlayer: null,
      }
    },
    methods: {
      setActivePlayer(player){
        this.activePlayer = player;
      },
    },
    components: {
      BdoControls,
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
    margin: 3em 1em 1em;
  }
</style>
