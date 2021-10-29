# MercedEvents

To See an Example of the MercedEvents class use refer to this code (read further for the createEvent function):

```js
const { MercedEvents } = require("mercedevents");

// Create a New MercedEvents Object
const ME = new MercedEvents();

// Register some data in the context
ME.context.set("somedata", 5);

// Register an event
ME.on("customevent", ({ data, context, middleware }) => {
  // Logging data made available from event emission
  console.log(data);
  // Logging our property stored in context
  console.log(context.get("somedata"));
  // Logging the data provided by our middleware
  console.log(middleware);
});

// Registering a middleware for customevent
ME.onMiddleware("customevent", async ({ data, context }) => {
  // return a promise (middleware is handled asynchronously)
  const result = await new Promise((resolve, reject) => {
    resolve("cheese");
  });

  return await result;
});

// emit event without middleware and send data to handlers
ME.emit("customevent", { data: "bread" });

// emit event with middleware and send data to handlers
ME.$emit("customevent", { data: "Weeeeee" });
```

## Properties

- **this.events:** objects of all event listeners
- **this.middleware:** objects of all event middleware (function that run before events of a particular type, their return values are made available to events as an array)
- **this.context:** A Map object that can be used to store data that should be available to all event listeners

## Methods

**instance.on(event: String, handler: Function )**
Will register the function as a listener for the particular event. The function signature for a handler...
`({data, context, middleware}) => {}`

**instance.onMiddleware(event: String, middleware: Function)**
Will register the function as middleware that is always run before handlers for that event are run, each middlewares return value is stored in an array that is passed to the event handler. These are good to store logic that is shared between handlers of the same event type. Their signature...
`({data, context}) => {}`

**instance.clear({event: String, middleware: Boolean, events: Boolean})**
Will clear all middleware and/or handlers for a particular events depending on whether the argument objects middleware or events property is true.

**instance.emit(event, data)**
Emit the event without invoking middleware. This function is synchronous. The optional data argument will made available to all handlers.

**instance.$emit(event, data)**
Emit the event and invoke the middleware prior. This function is asynchronous and the handlers won't run till all promises from middleware have resolved. The optional data argument will made available to all handlers.

# createEvent

For really basic event purposes this functional approach to event may be just what you need.

```js
const { createEvent } = require("mercedevents");

const [on, emit, clear] = createEvent();

on((data) => console.log(data)); // register handler

emit({ cheese: "gouda" }); // emit event

clear(); // clear handlers
```

# SimpleEvent

A class based tool for very simple event generation.

```js
const {SimpleEvent} = require("mercedevents");

//create an event
const State = new SimpleEvent({name: "Alex Merced"})

// Register a listener
const removeListener = State.on((data) => {console.log(data.name)})

// emit event
State.emit()

//change data
State.data.name = "Awesome Guy"

//emit event
State.emit()

//remove listener
removeListener()

```