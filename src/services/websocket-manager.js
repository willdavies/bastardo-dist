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
        console.log('responseId found');
        this.promisedResponses[event.data.responseId] = message.payload;
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

    // Add empty value to list of 
    this.promisedResponses[responseId] = undefined;

    // Create promise to return response once recieved 
    let responsePromise = new Promise((resolve, reject) => {
      // Watch for response arrival 
      this.responseTickers[responseId] = setInterval((responseId) => {
        // Check whether response has arrived
        if (this.promisedResponses[responseId] != undefined) {
          // Resolve original promise
          resolve(this.promisedResponses[responseId]);

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
}

export default WebSocketManager