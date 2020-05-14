<template>
  <Page>
    <template v-slot:title>
      <span v-text="activePlayer == null ? 'Welcome to Bastardo' : 'Hello ' + activePlayer.firstName"></span>
    </template>
    <template v-slot:content>
      <p>Everyone loves Bastardo! Now, thanks to the Coronavirus you can play online to your heart's content</p>
      <p>Why not <router-link :to="{name: 'newGame'}">start a new game</router-link> see what all the fuss is about!?</p>
    </template>
  </Page>
</template>

<script>
  import Page from './Page.vue';

  export default {
    props: {
      activePlayer: Object,
    },
    components: {
      Page
    }
  };
</script>
