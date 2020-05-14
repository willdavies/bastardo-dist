<template>
    <div id="controls">
      <ul>
        <li>
          Options
          <ul>
            <li>
              <a
                href="#"
                v-on:click.stop.prevent="$emit('voteToAbort')"
              >
                Suggest ending session
              </a>              
            </li>
          </ul>
        </li>
      </ul>      
    </div>
</template>

<script>
  export default {

  }
</script>

<style>
    
</style>