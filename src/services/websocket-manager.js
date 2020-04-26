import Vue from 'vue'
import { eventBus } from '../app'

const WebSocketManager = {
  promisedResponseCounter: 0,
  promisedResponses: {},
  responseTickers: {},

  install(Vue, options) {
    Vue.mixin({
      beforeCreate() {
        const options = this.$options;
        if (options.websocketManager) {
          this.$websocketManager = options.websocketManager;
        } else if (options.parent && options.parent.$websocketManager) {
          this.$websocketManager = options.parent.$websocketManager;
        }
      }
    });

    // Create connection
    this.connection =  new WebSocket(process.env.API_HOST);

    this.connection.onopen = function(event){
      eventBus.$emit('connectionOpen', event);
    };

    this.connection.onmessage = this.handleMessage.bind(this);
  },

  send: function(data) {
    console.log('websocketManager send', data);
    this.connection.send(JSON.stringify(data));
  },

  sendAndAwaitResponse: function(data, timeOutSeconds) {
    // Get unique id
    let requestId = this.promisedResponseCounter++;

    // Add empty value to list of promised responses
    this.promisedResponses[requestId] = undefined;

    // Create promise to return response once recieved 
    let responsePromise = new Promise((resolve, reject) => {
      // Watch for response arrival 
      this.responseTickers[requestId] = setInterval(() => {
        // Check whether response has arrived
        if (this.promisedResponses[requestId] != undefined) {
          // Check type of response
          const response = this.promisedResponses[requestId];

          if (response.updateScope === 'error') {
            reject(response.payload);
          } else {
            // Resolve original promise
            resolve(response.payload);
          }

          // Delete response value
          delete this.promisedResponses[requestId];

          // Clear ticker
          clearInterval(this.responseTickers[requestId]);
        }
      }, 100);

      // Schedule timeout
      let timeOutDuration = typeof timeOutSeconds == "undefined" ? 10000 : 1000 * timeOutSeconds;
      setTimeout(() => {
        // Check whether empty value still present
        if (this.promisedResponses.hasOwnProperty(requestId)) {
          reject('no response recieved');

          // Delete response value
          delete this.promisedResponses[requestId];

          // Clear ticker
          clearInterval(this.responseTickers[requestId]);
        }
      }, timeOutDuration);
    });

    // Send data via connection
    this.connection.send(JSON.stringify(Object.assign(data, {metadata: {requestId: requestId}})));

    return responsePromise;
  },

  on: function(eventType, callBack) {
    const eventNames = [
      'close',
      'error',
      'message',
      'open',
    ];

    if (eventNames.indexOf(eventType) == -1) {
      throw new Error('unknown event type provided');
    }

    this.connection['on' + eventType] = callBack;
  },

  handleMessage: function(messageEvent){
    let message = JSON.parse(messageEvent.data);

    if (typeof message.originRequestId !== 'undefined') {
      // Route any promised response back to response promise
      console.log('message has requestId', message);
      this.promisedResponses[message.originRequestId] = message;
    } else {
      console.log('message has requestId', message);
      // Emit message as event
      this.$emit('update.' + message.updateScope, message);
    }
  },
}

export default WebSocketManager
