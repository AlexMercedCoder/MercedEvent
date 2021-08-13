const {MercedEvents} = require("./index");

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
