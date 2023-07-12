require('dotenv').config();
const { faker } = require('@faker-js/faker');

const port = process.env.PORT || 8000;
const host = `http://localhost:${port}/airline`;

const io = require('socket.io-client');
const socket = io.connect(host);

// Function to generate random flight details
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
  console.log('Pilot: Connected to the server');
});

socket.on('new-flight', (flightDetails) => {
  
  console.log(`Pilot: New flight with ID '${flightDetails.flightID}' is scheduled`);
});

socket.on('connect', () => {
  setTimeout(() => {
    console.log(`Pilot: Flight with ID '${flightDetails.flightID}' took-off`);
  }, 4000);

  setTimeout(() => {
    console.log(`Pilot: Flight with ID '${flightDetails.flightID}' has arrived`);
  }, 7000);
});



