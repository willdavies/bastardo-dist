import Vue from 'vue'

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
      console.log('connection open');
    };

    this.connection.onmessage = function (event) {
      console.group('websocketManager recieved message');

      let message = JSON.parse(event.data);

      console.log(message);

      if (typeof message.responseId !== 'undefined') {
        console.log('message has responseId', message);
        this.promisedResponses[event.data.responseId] = message;
      }

      console.groupEnd();
    }.bind(this);
  },

  send: function(data) {
    console.log('websocketManager send', data);
    this.connection.send(data);
  },

  sendAndAwaitResponse: function(data, timeOutSeconds) {
    console.log('websocketManager sendAndWait', data);

    // Get unique id
    let responseId = this.promisedResponseCounter++;

    // Add empty value to list of promised responses
    this.promisedResponses[responseId] = undefined;

    // Create promise to return response once recieved 
    let responsePromise = new Promise((resolve, reject) => {
      // Watch for response arrival 
      this.responseTickers[responseId] = setInterval((responseId) => {
        // Check whether response has arrived
        if (this.promisedResponses[responseId] != undefined) {
          // Check type of response
          const response = this.promisedResponses[responseId];

          if (response.payload.type === 'error') {
            reject(response.payload);
          } else {
            // Resolve original promise
            resolve(response.payload);
          }

          // Delete response value
          delete this.promisedResponses[responseId];

          // Clear ticker
          clearInterval(this.responseTickers[responseId]);
        }
      }, 100);

      // Schedule timeout
      let timeOut = typeof timeOutSeconds == "undefined" ? 10000 : 1000 * timeOutSeconds;
      setTimeout(() => {
        // Check whether empty value still present
        if (this.promisedResponses.hasOwnProperty(responseId)) {
          reject('no response recieved');

          // Delete response value
          delete this.promisedResponses[responseId];

          // Clear ticker
          clearInterval(this.responseTickers[responseId]);
        }
      }, timeOut);
    });

    // Send data via connection
    this.connection.send(JSON.stringify(Object.assign(data, {responseId: responseId})));

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
  }
}

export default WebSocketManager