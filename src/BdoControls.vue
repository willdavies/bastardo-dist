<template>
  <div id="controls">
    <ul>
      <li>
        <router-link :to="{ name: 'newGame' }">New Game</router-link>
      </li>
    </ul>
  </div>
</template>

<script>
  export default {
  };
</script>

<style scoped>
  #controls {
    position: fixed;
    top: 0;
    width: 100%;
    background: #FFF;
    border-bottom: 2px solid #000;
    font-family: sans-serif;
  }

  ul {
    margin: 0;
    padding: 0;
  }

  ul li {
    display: inline-block;
    margin-left: 1em;
  }

  ul li a {
    display: inline-block;
    padding: 0.5em;
    text-decoration: none;
  }

  ul li a:hover {
    text-decoration: underline;
  }

  ul li:first-child {
    margin-left: 0;
  }
</style>
