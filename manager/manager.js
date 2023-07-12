// require('dotenv').config();
// const { faker } = require('@faker-js/faker');
// const port = process.env.PORT || 8000;
// const host = `http://localhost:${port}`;

// const io = require('socket.io-client');
// const socket = io.connect(host);

// // Function to generate random flight details
// const generateFlightDetails = () => {

//   const uuid = require('uuid');

//   const flightID = uuid.v4();
//   const airLine = 'Royal Jordanian Airlines';
//   const pilot = faker.person.fullName();
//   const destination = faker.location.city();

//   return {
//     flightID,
//     airLine,
//     pilot,
//     destination,
//   };
// };

// socket.on('connect', () => {
//   console.log('Manager: Connected to the server');
// });


// setInterval(() => {
//   const flightDetails = generateFlightDetails();
//   console.log(`Manager: New flight with ID '${flightDetails.flightID}' has been scheduled`);


//   socket.emit('new-flight', flightDetails);
// }, 10000);


// socket.on('arrived', (flightDetails) => {
//   console.log(`Manager: We're greatly thankful for the amazing flight, ${flightDetails.pilot}`);
// });


require('dotenv').config();
const { faker } = require('@faker-js/faker');
const port = process.env.PORT || 8000;
const host = `http://localhost:${port}`;

const io = require('socket.io-client');
const socket = io.connect(host);

const generateFlightDetails = () => {
  
  const uuid = require('uuid');

  const flightID = uuid.v4();
  const airLine = 'Royal Jordanian Airlines';
  const pilot = faker.person.fullName();;
  const destination = faker.location.city();

  return {
    flightID,
    airLine,
    pilot,
    destination,
  };
};

const flightDetails = generateFlightDetails();

socket.on('connect', () => {
  console.log('Manager: Connected to the server');

  setInterval(() => {
    // Alert when a new flight is scheduled
    console.log(`Manager: New flight with ID '${flightDetails.flightID}' has been scheduled`);
    // Log the new flight event with its ID to the console
    console.log(`Manager: We’re greatly thankful for the amazing flight, ${flightDetails.pilot}`);
  }, 10000);
});

socket.on('arrived', (flightDetails) => {
  console.log(`Manager: Flight with ID '${flightDetails.flightID}' has arrived`);
});
