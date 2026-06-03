'use strict';

process.title = 'node-chat';

import { getHttpServer } from './http-server/getHttpServer';
import {
  setupWebSocketServer,
  allClients
} from './web-socket-server/setupWebSocketServer';

import * as http from 'http';
import config from 'config';

//
//
// INITIALIZE

const serverHost = config.get<string>('server.host') ?? 'localhost';
const serverPort = config.get<number>('server.port') ?? 7777;

const _log = (...args: any) => {
  console.log(new Date().toISOString(), ...args);
};

const expressApp = getHttpServer(serverHost, serverPort);
const httpServer = http.createServer((...args) => expressApp(...args));
const wsServer = setupWebSocketServer(httpServer);

const _shutdown = () => {
  _log('SIGINT');
  _log(`total clients: ${allClients.length}`);

  httpServer.close();
  wsServer.closeAllConnections();

  _log(`exit`);
  process.exit(0);
};
process.on('SIGINT', _shutdown); // graceful shutdown

httpServer.once('listening', () => {
  _log(`Server now listening`);
  _log(`-> http://${serverHost}:${serverPort}/`);
});
httpServer.listen(serverPort);
