class MercedEvents {
  events = {};
  middleware = {};
  context = new Map();

  on(event, handler) {
    if (this.events[event]) {
      // check if event has an array
      this.events[event].push(handler); // if so, push handler into array
    } else {
      this.events[event] = [handler]; //if not, create fresh array with handler
    }
  }

  onMiddleware(event, middleware) {
    if (this.middleware[event]) {
      // check if event has an array
      this.middleware[event].push(middleware); // if so, push handler into array
    } else {
      this.middleware[event] = [middleware]; //if not, create fresh array with handler
    }
  }

  emit(event, data) {
    if (this.events[event]) {
      // check if handlers exist for this event
      this.events[event].forEach((handler) => handler({ data, context })); // run each handler
    }
  }

  async $emit(event, data) {
    let middleware;
    if (this.middleware[event]) {
      // check if handlers exist for this event
      middleware = await this.middleware[event].map(
        async (handler) => await handler({ data, context })
      ); // run each handler
    }
    if (this.events[event]) {
      // check if handlers exist for this event
      this.events[event].forEach((handler) =>
        handler({ data, context, middleware })
      ); // run each handler
    }
  }
}

module.exports = MercedEvents;
