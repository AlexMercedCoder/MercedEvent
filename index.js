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
    let context = this.context;
    if (this.events[event]) {
      // check if handlers exist for this event
      this.events[event].forEach((handler) => handler({ data, context })); // run each handler
    }
  }

  clear(info) {
    if (info.events) {
      this.events[info.event] = null;
    }
    if (info.middleware) {
      this.middleware[event] = null;
    }
  }

  async $emit(event, data) {
    let middleware;
    let context = this.context;
    if (this.middleware[event]) {
      // run all middleware and resolve all promises
      middleware = await Promise.all(
        this.middleware[event].map(
          async (middl) => await middl({ data, context })
        )
      );
    }
    if (this.events[event]) {
      // check if handlers exist for this event
      await this.events[event].forEach((handler) =>
        handler({ data, context, middleware })
      ); // run each handler
    }
  }
}

const createEvent = () => {
  const handlers = []; // holders handlers
  const on = (handler) => handlers.push(handler); // register handlers
  const emit = (data) => handlers.forEach((handler) => handler(data)); // emit event
  const clear = () => handlers.splice(0, handlers.length);

  return [on, emit, clear]; // return functions
};

class SimpleEvent {
  constructor(initialData = {}) {
    this.data = initialData;
    this.handlers = [];
  }

  on(handler) {
    this.handlers.push(handler);

    return () => {
      this.handlers.splice(
        this.handlers.findIndex((h) => h === handler),
        1
      );
    };
  }

  emit() {
    const data = this.data;
    this.handlers.forEach((handler) => handler(data));
  }
}

module.exports = { MercedEvents, createEvent, SimpleEvent };
