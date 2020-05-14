<template>
    <div id="game-session-controls">
      <ul>
        <li>Session controls:</li>
        <li>
          <a
            href="#"
            v-on:click.stop.prevent="$emit('voteToAbort')"
          >
            Suggest ending session
          </a>              
        </li>
      </ul>
    </div>
</template>

<script>
  export default {

  }
</script>

<style>
  #game-session-controls {
    width: 100%;
    background: #D5F2C9;
    border-bottom: 2px solid #000;
    font-family: sans-serif;
  }

  ul {
    margin: 0;
    padding: 0 0.5em;
  }

  ul li {
    display: inline-block;
    margin-left: 0.2em;
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