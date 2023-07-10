const flightEvents = require('../events');

flightEvents.on('new-flight', (flightDetails) => {
  setTimeout(() => {
    flightEvents.emit('took-off', flightDetails);
    console.log(`Pilot: flight with ID '${flightDetails.flightID}' took-off`);
  }, 4000);

  setTimeout(() => {
    flightEvents.emit('arrived', flightDetails);
    console.log(`Pilot: flight with ID '${flightDetails.flightID}' has arrived`);
  }, 7000);
});
