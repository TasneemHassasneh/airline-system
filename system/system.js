const http = require('http');
const socketIO = require('socket.io');
const server = http.createServer();
const io = socketIO(server);

require('dotenv').config();
const PORT = process.env.PORT || 8000;

const queue = {
  flights: {}
};

server.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

io.on('connection', (socket) => {
  console.log('System: New connection established');
  socket.on('new-flight', (flightDetails) => {
    const flightId = generateFlightId();
    queue.flights[flightId] = {
      event: 'new-flight',
      details: flightDetails
    };
    console.log(`System: New flight with ID '${flightId}' has been scheduled`);

    // Emit 'flight' event with all stored messages as payload back to the pilot
    const allFlights = Object.values(queue.flights);
    socket.emit('flight', allFlights);

    // Delete all messages from the message queue
    queue.flights = {};
  });

  socket.on('get-all', () => {
    const allFlights = Object.values(queue.flights);
    socket.emit('flight', allFlights);
  });

  socket.on('delete', (flightId) => {
    delete queue.flights[flightId];
  });
});

const airlineIO = io.of('/airline');

airlineIO.on('connection', (socket) => {
  console.log('System: New airline connection established');
});

function printFlightDetails(event, flightDetails) {
  const currentTime = new Date().toLocaleString();

  console.log(`Flight {
    event: '${event}',
    time: ${currentTime},
    Details: {
      airLine: '${flightDetails.airLine}',
      flightID: '${flightDetails.flightID}',
      pilot: '${flightDetails.pilot}',
      destination: '${flightDetails.destination}'
    }
  }`);
}

airlineIO.on('connection', (socket) => {
  socket.on('took-off', (flightDetails) => {
    printFlightDetails('took_off', flightDetails);
  });

  socket.on('arrived', (flightDetails) => {
    printFlightDetails('arrived', flightDetails);
  });
});
