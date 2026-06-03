import * as http from 'http';
import * as webSocket from 'websocket';
import { IMessage } from '../../common/messages';

const _log = (...args: any) => {
  console.log(new Date().toISOString(), ...args);
};

interface CustomConnection {
  connection: webSocket.connection;
  clientId: number;
  posX: number;
  posY: number;
  speedX: number;
  speedY: number;
  lastActivity: number;
  lastPing: number;
}

let g_clientId = 1;
export const allClients: CustomConnection[] = [];

export const setupWebSocketServer = (server: http.Server) => {
  const wsServer = new webSocket.server({ httpServer: server });

  //   setInterval(() => {

  //       const currTime = Date.now();
  //       for (const currClient of allClients) {
  //           if (
  //               // no activity for 2sec
  //               (currTime - currClient.lastActivity) > 2000 &&
  //               // no ping for 2sec
  //               (currTime - currClient.lastPing) > 2000
  //           ) {
  //               _log(`sending PING to ${currClient.clientId}`);
  //               currClient.lastPing = currTime;
  //               currClient.connection.sendUTF(JSON.stringify({ type: `ping` }));
  //           }
  //       }

  //   }, 1000);

  wsServer.on('request', (request) => {
    const newConnection: CustomConnection = {
      connection: request.accept(null, request.origin),
      clientId: g_clientId++,
      posX: 400,
      posY: 300,
      speedX: 0,
      speedY: 0,
      lastActivity: Date.now(),
      lastPing: Date.now()
    };

    _log(`new client`);
    _log(`  clientId: ${newConnection.clientId}`);
    _log(`  from origin "${request.origin}"`);

    for (const currClient of allClients) {
      currClient.connection.sendUTF(
        JSON.stringify({
          type: 'message',
          value: `new client "${newConnection.clientId}"`
        })
      );
    }

    allClients.push(newConnection);

    if (allClients.length > 1) {
      // sync the new client
      const toSend: IMessage = {
        type: 'move',
        value: []
      };
      for (const currClient of allClients) {
        if (currClient.clientId === newConnection.clientId) {
          continue;
        }

        toSend.value.push({
          clientId: currClient.clientId,
          posX: currClient.posX,
          posY: currClient.posY,
          speedX: currClient.speedX,
          speedY: currClient.speedY,
        });

      }
      newConnection.connection.sendUTF(JSON.stringify(toSend));
  }

    _log(`  total clients: ${allClients.length}`);

    newConnection.connection.on('message', function (message) {
      newConnection.lastActivity = Date.now();

      // _log(`message "${JSON.stringify(message)}"`);
      _log(`new message from client ${newConnection.clientId}`);

      if (message.type !== 'utf8') {
        return;
      }

      // _log(`message.utf8Data`, message.utf8Data);
      const event = JSON.parse(message.utf8Data);
      switch (event.type) {
        case 'message': {
          _log(`broadcasting`);
          newConnection.connection.sendUTF(
            JSON.stringify({
              type: 'message',
              value: `you sent: "${event.value}"`
            })
          );
          _log(`- sent to ${newConnection.clientId} (author)`);
          if (allClients.length > 1) {
            const toSend = JSON.stringify({
              type: 'message',
              value: `client ${newConnection.clientId} sent: "${event.value}"`
            });
            for (const currClient of allClients) {
              if (currClient.clientId === newConnection.clientId) {
                continue;
              }
              currClient.connection.sendUTF(toSend);
              _log(`- sent to ${currClient.clientId}`);
            }
          }
          break;
        }
        case 'who-am-I': {
          _log(`who-am-I`);
          newConnection.connection.sendUTF(
            JSON.stringify({
              type: 'who-am-I',
              value: newConnection.clientId
            })
          );
          _log(`- sent to ${newConnection.clientId} (author)`);
          break;
        }
        case 'move': {
          _log(`broadcasting move`);
          // newConnection.connection.sendUTF(
          //   JSON.stringify({
          //     type: 'message',
          //     value: `you sent: "${event.value}"`
          //   })
          // );
          // _log(`- sent to ${newConnection.clientId} (author)`);
          if (allClients.length > 1) {
            const toSend = JSON.stringify(event);
            for (const currClient of allClients) {
              if (currClient.clientId === newConnection.clientId) {
                continue;
              }
              currClient.connection.sendUTF(toSend);
              _log(`- sent to ${currClient.clientId}`);
            }
          }
          break;
        }
        case 'pong': {
          _log(`message PONG`);
          break;
        }
      }
    });

    newConnection.connection.on('close', function () {
      const index = allClients.findIndex(
        (con) => con.clientId === newConnection.clientId
      );
      if (index < 0) {
        // should never happen
        throw new Error(
          `clientId not found on close event ${newConnection.clientId}`
        );
      }

      _log(`lost client`);
      _log(`  clientId: ${allClients[index].clientId}`);

      allClients.splice(index, 1);

      _log(`  total clients: ${allClients.length}`);

      for (const currClient of allClients) {
        currClient.connection.sendUTF(
          JSON.stringify({
            type: 'message',
            value: `lost client "${newConnection.clientId}"`
          })
        );
      }
    });
  });

  return wsServer;
};
