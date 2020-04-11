<template>
  <img class="avatar" v-bind:src="this.meeple" alt="">
</template>

<script>
  import MeepleBlack from './assets/meeple-black.svg';
  import MeepleBlue from './assets/meeple-blue.svg';
  import MeepleGreen from './assets/meeple-green.svg';
  import MeeplePurple from './assets/meeple-purple.svg';
  import MeepleRed from './assets/meeple-red.svg';
  import MeepleWhite from './assets/meeple-white.svg';
  import MeepleYellow from './assets/meeple-yellow.svg';

  export default {
    props: ['color'],
    computed: {
      meeple: function(){
        switch (this.color) {
          case 'black':
            return MeepleBlack;
            break
          case 'blue':
            return MeepleBlue;
            break
          case 'green':
            return MeepleGreen;
            break
          case 'purple':
            return MeeplePurple;
            break
          case 'red':
            return MeepleRed;
            break
          case 'white':
            return MeepleWhite;
            break
          case 'yellow':
            return MeepleYellow;
            break
        }
      }
    }
  };
</script>

<style>
  .avatar {
    width: 100%;
  }
</style>
