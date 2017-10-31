//impl.js
const Service = require('./service.js');
const service = new Service();
const sleep = require('sleep');

const config = {
  addressEtherDelta: '0x8d12a197cb00d4747a1fe03395095ce2a5cc6819',
  provider: 'https://mainnet.infura.io/Ky03pelFIxoZdAUsr82w',
  socketURL: 'https://socket.etherdelta.com',
  token: process.argv[2],
  sleepTime: 3,
  gasLimit: 150000,
  gasPrice: 4000000000,
};

service.init(config)

service.socket.on('market', (data) => {
  if (! ('orders' in data)) {
	service.noOrdersAvailable += 1;
  }
  else if (canArbitrate(data['orders'])) {
    service.canArbitrate += 1
  }
  else {
    service.cantArbitrate += 1
  }
});

makeCall = () => {
  service.socket.emit('getMarket', {'token': '0xc3951d77737733174152532e8b0f27e2c4e9f0dc'});
}

canArbitrate = (orders) => {
  return orders['sells'][0]['price'] < orders['buys'][0]['price'];
}

module.exports = {"service": service, "canArbitrate": canArbitrate, "makeCall": makeCall}
service.noOrdersAvailable = 0;
service.canArbitrate = 0;
service.cantArbitrate = 0;

run = () => {
	makeCall();
	console.log("No orders available: " + service.noOrdersAvailable + 
      "\nCan Arbitrate: " + service.canArbitrate + 
      "\nCan't arbitrate: " + service.cantArbitrate);
}

setInterval(run, config.sleepTime * 1000);
