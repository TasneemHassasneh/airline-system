const flightEvents = require('../events');

const airline = 'Royal Jordanian Airlines';

setInterval(() => {
  const flightID = generateRandomID();
  const pilot = generateRandomName();
  const destination = generateRandomDestination();

  console.log(`Manager: new flight with ID '${flightID}' has been scheduled`);

  const flightDetails = {
    airLine: airline,
    flightID: flightID,
    pilot: pilot,
    destination: destination,
  };

  flightEvents.emit('new-flight', flightDetails);
}, 10000);

flightEvents.on('arrived', (flightDetails) => {
  console.log(`Manager: we’re greatly thankful for the amazing flight, ${flightDetails.pilot}`);
});

function generateRandomID() {
  const characters = 'abcdefghijklmnopqrstuvwxyz0123456789';
  let id = '';
  for (let i = 0; i < 10; i++) {
    id += characters.charAt(Math.floor(Math.random() * characters.length));
  }
  return id;
}

function generateRandomName() {
  const names = ['John Doe', 'Jane Smith', 'Michael Johnson', 'Emily Davis', 'David Wilson'];
  return names[Math.floor(Math.random() * names.length)];
}

function generateRandomDestination() {
  const destinations = ['London', 'Paris', 'New York', 'Tokyo', 'Sydney'];
  return destinations[Math.floor(Math.random() * destinations.length)];
}
