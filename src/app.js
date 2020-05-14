import Vue from 'vue';
import VueRouter from 'vue-router'
import App from './App.vue';

Vue.use(VueRouter);

export const eventBus = new Vue();

import WebSocketManager from './services/websocket-manager';
Vue.use(WebSocketManager);

// Import components
import Welcome from './Welcome.vue';
import NewGame from './NewGame.vue';
import NewPlayer from './NewPlayer.vue';
import GameSession from './GameSession.vue';

const routes = [
    {
        name: 'home',
        path: '/',
        component: Welcome,
    },
    {
        name: 'newPlayer',
        path: '/new-player',
        component: NewPlayer,
    },
    {
        name: 'newGame',
        path: '/new-game',
        component: NewGame,
    },
    {
        name: 'gameSession',
        path: '/game-session/:id',
        component: GameSession,
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
