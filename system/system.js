const flightEvents = require('../events');

flightEvents.on('new-flight', (flightDetails) => {
  const currentTime = new Date().toISOString();
  console.log(`Flight {
    event: 'new-flight',
    time: ${currentTime},
    Details: {
        airLine: '${flightDetails.airLine}',
        flightID: '${flightDetails.flightID}',
        pilot: '${flightDetails.pilot}',
        destination: '${flightDetails.destination}'
    }
}`);
});

flightEvents.on('took-off', (flightDetails) => {
  const currentTime = new Date().toISOString();
  console.log(`Flight {
    event: 'took_off',
    time: ${currentTime},
    Details: {
        airLine: '${flightDetails.airLine}',
        flightID: '${flightDetails.flightID}',
        pilot: '${flightDetails.pilot}',
        destination: '${flightDetails.destination}'
    }
}`);
});

flightEvents.on('arrived', (flightDetails) => {
  const currentTime = new Date().toISOString();
  console.log(`Flight {
    event: 'arrived',
    time: ${currentTime},
    Details: {
        airLine: '${flightDetails.airLine}',
        flightID: '${flightDetails.flightID}',
        pilot: '${flightDetails.pilot}',
        destination: '${flightDetails.destination}'
    }
}`);
});
