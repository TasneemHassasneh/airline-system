const http = require('http');
const socketIO = require('socket.io');
const server = http.createServer();
const io = socketIO(server);

require('dotenv').config();
const PORT = process.env.PORT || 8000;

server.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

io.on('connection', (socket) => {
  console.log('System: New connection established');
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
