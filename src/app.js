import Vue from 'vue';
import VueRouter from 'vue-router'
import App from './App.vue';

Vue.use(VueRouter);

// Import components
import BdoWelcome from './BdoWelcome.vue';
import BdoNewGame from './BdoNewGame.vue';
import BdoGame from './BdoGame.vue';

const routes = [
    {
        name: 'game',
        path: '/game/:id',
        component: BdoGame,
    },
];

const router = new VueRouter({
    mode: 'history',
    routes: routes,
});

new Vue({
  el: '#bastardo-app',
  router: router,
  render: h => h(App),
});
