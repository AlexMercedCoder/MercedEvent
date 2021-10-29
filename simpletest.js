const {SimpleEvent} = require("./index");

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