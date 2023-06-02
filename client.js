//sources
//https://nodejs.org/api/dgram.html#udpdatagram-sockets
//https://stackoverflow.com/questions/8393636/configure-node-js-to-log-to-a-file-instead-of-the-console

import dgram from 'node:dgram';

const client = dgram.createSocket('udp4');
const SERVER_PORT = 41234;
const SERVR_ADDRESS = 'localhost';


client.on('message', (message, info) => {
  // get the information about server address, port, and size of packet received.

  console.log('Address: ', info.address, 'Port: ', info.port, 'Size: ', info.size)

  //read message from server

  console.log('Message from server', message.toString())
})

const packet = Buffer.from('This is a message from client')

client.send(packet, SERVER_PORT, SERVR_ADDRESS, (err) => {
  if (err) {
    console.error('Failed to send packet !!')
  } else {
    console.log('Packet send !!')
  }
})
