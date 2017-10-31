//impl.js
const Service = require('./service.js');
const service = new Service();
const sleep = require('sleep');

const config = {
  addressEtherDelta: '0x8d12a197cb00d4747a1fe03395095ce2a5cc6819',
  provider: 'https://mainnet.infura.io/Ky03pelFIxoZdAUsr82w',
  socketURL: 'https://socket.etherdelta.com',
  token: '0xc3951d77737733174152532e8b0f27e2c4e9f0dc',
  sleepTime: 7,
  gasLimit: 150000,
  gasPrice: 4000000000,
};

service.init(config)

service.socket.on('market', (data) => {
    console.log("rexeived");
    console.log(data);
    console.log("\n\n\n\n");
    console.log(data['orders']);
    if (! ('orders' in data)) {
      console.log('no orders available');
    }
    else if (canArbitrate(data['orders'])) {
      console.log("CAN ARBITRATE!!!!!!\n\n\n\n\n\n\n\n\n\n\n");
    }
    else {
      console.log("can't arbitrate");
    }
});

makeCall = (service2) => {
  service2.socket.emit('getMarket', {'token': '0xc3951d77737733174152532e8b0f27e2c4e9f0dc'});
}

canArbitrate = (orders) => {
  return orders['sells'][0]['price'] < orders['buys'][0]['price'];
}

module.exports = {"service": service, "canArbitrate": canArbitrate, "makeCall": makeCall}

//while(true) {
//  makeCall(service);
//  console.log("Sleeping for " + 3 + " seconds");
//  sleep.sleep(3);
//}

