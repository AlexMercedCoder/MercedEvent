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
      let context = this.context
    if (this.events[event]) {
      // check if handlers exist for this event
      this.events[event].forEach((handler) => handler({ data, context })); // run each handler
    }
  }

  async $emit(event, data) {
    let middleware;
    let context = this.context
    if (this.middleware[event]) {
      // run all middleware and resolve all promises
      middleware = await Promise.all(this.middleware[event].map(
        async (middl) => await middl({ data, context }))) 
    }
    if (this.events[event]) {
      // check if handlers exist for this event
      await this.events[event].forEach((handler) =>
        handler({ data, context, middleware })
      ); // run each handler
    }
  }
}

module.exports = MercedEvents;
