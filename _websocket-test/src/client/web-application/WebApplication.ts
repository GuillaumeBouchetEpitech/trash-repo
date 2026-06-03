import { KeyboardHandler, keys } from './logic/keyboard';
import { EntitiesManager } from './logic/entities/EntitiesManager';
import { JsonMessagesWebSocket } from './network/JsonMessagesWebSocket';
import { CanvasRenderer } from './graphic/CanvasRenderer';
import { allKeys } from './logic/keyboard/keys';

export class WebApplication {
  private _loggerOutput: HTMLTextAreaElement;

  private _webSocket!: JsonMessagesWebSocket;
  private _keyboardHandler = new KeyboardHandler();
  private _canvasRenderer: CanvasRenderer;

  private _clientId: string = "-1";
  private _entitiesManager = new EntitiesManager();

  constructor(canvas: HTMLCanvasElement, loggerOutput: HTMLTextAreaElement) {
    this._canvasRenderer = new CanvasRenderer(canvas);

    this._loggerOutput = loggerOutput;
    this._loggerOutput.value = ''; // reset browser cache
  }

  async initialize(): Promise<void> {
    // fetch websocket config from server (GET)
    const response = await fetch(`/ws-config`);
    const wsConfig = await response.json();

    this._webSocket = new JsonMessagesWebSocket();

    this._webSocket.onDisconnect(() => {
      this._log(`is disconnected`);
    });

    this._webSocket.onMessage((data) => {
      switch (data.type) {
        case 'message': {
          this._log(`received message: "${data.value}"`);
          break;
        }
        case 'who-am-I': {
          this._log(`received who-am-I: "${data.value}"`);
          this._clientId = data.value;
          const myEntity = this._entitiesManager.ensureEntity(this._clientId, 400, 300);
          this._webSocket.send({
            type: 'move',
            value: [
              {
                clientId: myEntity.clientId,
                posX: myEntity.posX,
                posY: myEntity.posY,
                speedX: myEntity.speedX,
                speedY: myEntity.speedY,
              }
            ]
          });
          break;
        }
        case 'who-am-I': {
          this._log(`received who-am-I: "${data.value}"`);
          this._clientId = data.value;
          const myEntity = this._entitiesManager.ensureEntity(this._clientId, 400, 300);
          this._webSocket.send({
            type: 'move',
            value: [
              {
                clientId: myEntity.clientId,
                posX: myEntity.posX,
                posY: myEntity.posY,
                speedX: myEntity.speedX,
                speedY: myEntity.speedY,
              }
            ]
          });
          break;
        }
        case 'move': {
          this._log(`received move: "${data.value}"`);
          data.value.forEach((val: any) => {
            const {clientId, posX, posY, speedX, speedY} = val;
            const entity = this._entitiesManager.ensureEntity(clientId, posX, posY);
            entity.setSpeedX(speedX);
            entity.setSpeedY(speedY);
          });
          break;
        }
        case 'ping': {
          this._log(`received ping, replying pong`);
          this._webSocket.send({ type: 'pong' });
          break;
        }
      }
    });

    this._log(`connecting`);
    await this._webSocket.connect(wsConfig.host, wsConfig.port);
    this._log(`is connected`);

    this._webSocket.send({ type: 'who-am-I' });

    this._keyboardHandler.activate();

    // document.body.addEventListener('keydown', (event) => {
    //   if (!this._webSocket.isConnected()) {
    //     return;
    //   }

    //   if (event.key === 'g') {
    //     this._log(`sending`);
    //     this._webSocket.send({
    //       type: 'message',
    //       value: 'HELLO!'
    //     });
    //   }
    // });
  }

  async dispose() {
    this._webSocket.disconnect();
  }

  update(elapsedTime: number) {

    if (
      !this._keyboardHandler.wasPressed(allKeys.VALUE_G) &&
      this._keyboardHandler.isPressed(allKeys.VALUE_G)
    ) {
      // send it
      this._webSocket.send({
        type: 'message',
        value: "hello!"
      });
    }

    if (this._keyboardHandler.isPressed(allKeys.VALUE_LEFT)) {


      const myEntity = this._entitiesManager.findEntity(this._clientId);
      if (myEntity) {

        // set it
        myEntity.setSpeedX(-20);

        // did we just started moving?
        if (!this._keyboardHandler.wasPressed(allKeys.VALUE_LEFT)) {

          // this._log(`sending`);

          // send it
          this._webSocket.send({
            type: 'move',
            value: [
                {
                clientId: myEntity.clientId,
                posX: myEntity.posX,
                posY: myEntity.posY,
                speedX: myEntity.speedX,
                speedY: myEntity.speedY,
              }
            ]
          });

        }

      }

    }

    this._keyboardHandler.update();


    for (const currEntity of this._entitiesManager.entities) {
      currEntity.update(elapsedTime);
    }
  }

  render() {
    this._canvasRenderer.clear();


    for (const currEntity of this._entitiesManager.entities) {
      this._canvasRenderer.drawSquare(currEntity.posX, currEntity.posY, 10, '#ff0000');
    }

    this._canvasRenderer.drawLineLoop(
      [
        [10, 10],
        [100, 20],
        [20, 100]
      ],
      'red'
    );
  }

  private _log(...args: any) {
    this._loggerOutput.value += `${new Date().toISOString()} ${args.join(
      ' '
    )}\n`;
    this._loggerOutput.scrollTop = this._loggerOutput.scrollHeight;
  }
}
