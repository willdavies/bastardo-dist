import Vue from 'vue';
import VueRouter from 'vue-router'
import App from './App.vue';

Vue.use(VueRouter);

import WebSocketManager from './services/websocket-manager';
Vue.use(WebSocketManager);

// Import components
import BdoWelcome from './BdoWelcome.vue';
import BdoNewGame from './BdoNewGame.vue';
import BdoNewPlayer from './BdoNewPlayer.vue';
import BdoGameSession from './BdoGameSession.vue';

const routes = [
    {
        name: 'home',
        path: '/',
        component: BdoWelcome,
    },
    {
        name: 'newPlayer',
        path: '/new-player',
        component: BdoNewPlayer,
    },
    {
        name: 'newGame',
        path: '/new-game',
        component: BdoNewGame,
    },
    {
        name: 'gameSession',
        path: '/game-session/:id',
        component: BdoGameSession,
    },
];

const router = new VueRouter({
    mode: 'history',
    routes: routes,
});

new Vue({
  el: '#bastardo-app',
  router: router,
  websocketManager: WebSocketManager,
  render: h => h(App),
});
