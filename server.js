//sources
//https://nodejs.org/api/dgram.html#udpdatagram-sockets
//https://stackoverflow.com/questions/8393636/configure-node-js-to-log-to-a-file-instead-of-the-console
//https://www.freecodecamp.org/news/javascript-get-current-date-todays-date-in-js/
//https://flaviocopes.com/fix-dirname-not-defined-es-module-scope/


import dgram from 'node:dgram';
import fs from 'fs';
import util from 'util';
import path from 'path';
import { fileURLToPath } from 'url';


const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const SERVER_PORT = 41234;

const server = dgram.createSocket('udp4');

const date = new Date().toJSON().slice(0,10);
const logFile = fs.createWriteStream(__dirname + '/udp_server' + date + '.log', {flags : 'a'});


server.on('error', (err) => {
  console.error(`server error:\n${err.stack}`);
  server.close();
});

server.on('message', (msg, rinfo) => {
  const logData = 	'server got: ' + msg + ' from ' + rinfo.address +':' + rinfo.port + ', event at:' + new Date().toJSON();
  console.log(logData);
  logFile.write(util.format(logData) + '\n');
  const response = Buffer.from('Message Received')
  server.send(response, rinfo.port, rinfo.address, (err) => {
	if (err) {
	  console.error('Failed to send response !!')
	} else {
	  console.log('Response send Successfully')
	}
	})
});

server.on('listening', () => {
  const address = server.address();
  console.log(`server listening ${address.address}:${address.port}`);
  
});

server.bind(SERVER_PORT);
