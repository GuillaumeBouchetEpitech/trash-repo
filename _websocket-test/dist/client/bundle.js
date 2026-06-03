// src/client/web-application/logic/keyboard/KeyboardHandler.ts
class KeyboardHandler {
  _wasPressed = {};
  _isPressed = {};
  _activated = false;
  _handleKeyDown;
  _handleKeyUp;
  constructor() {
    const handleKeyDown = (event) => {
      this._isPressed[event.key] = true;
    };
    const handleKeyUp = (event) => {
      this._isPressed[event.key] = false;
    };
    this._handleKeyDown = handleKeyDown.bind(this);
    this._handleKeyUp = handleKeyUp.bind(this);
  }
  update() {
    this._wasPressed = this._isPressed;
    this._isPressed = {};
  }
  wasPressed(key) {
    return this._wasPressed[key];
  }
  isPressed(key) {
    return this._isPressed[key];
  }
  activate() {
    if (this._activated)
      return;
    this._activated = true;
    document.addEventListener("keydown", this._handleKeyDown);
    document.addEventListener("keyup", this._handleKeyUp);
  }
  deactivate() {
    if (!this._activated)
      return;
    this._activated = false;
    document.removeEventListener("keydown", this._handleKeyDown);
    document.removeEventListener("keyup", this._handleKeyUp);
  }
}
// src/client/web-application/logic/keyboard/keys.ts
var allKeys;
(function(allKeys2) {
  allKeys2["VALUE_CANCEL"] = "Cancel";
  allKeys2["VALUE_HELP"] = "Help";
  allKeys2["VALUE_BACK_SPACE"] = "Backspace";
  allKeys2["VALUE_TAB"] = "Tab";
  allKeys2["VALUE_CLEAR"] = "Clear";
  allKeys2["VALUE_ENTER"] = "Enter";
  allKeys2["VALUE_RETURN"] = "Enter";
  allKeys2["VALUE_SHIFT"] = "Shift";
  allKeys2["VALUE_CONTROL"] = "Control";
  allKeys2["VALUE_ALT"] = "Alt";
  allKeys2["VALUE_PAUSE"] = "Pause";
  allKeys2["VALUE_CAPS_LOCK"] = "CapsLock";
  allKeys2["VALUE_ESCAPE"] = "Escape";
  allKeys2["VALUE_SPACE"] = " ";
  allKeys2["VALUE_PAGE_UP"] = "PageUp";
  allKeys2["VALUE_PAGE_DOWN"] = "PageDown";
  allKeys2["VALUE_END"] = "End";
  allKeys2["VALUE_HOME"] = "Home";
  allKeys2["VALUE_LEFT"] = "ArrowLeft";
  allKeys2["VALUE_UP"] = "ArrowUp";
  allKeys2["VALUE_RIGHT"] = "ArrowRight";
  allKeys2["VALUE_DOWN"] = "ArrowDown";
  allKeys2["VALUE_PRINTSCREEN"] = "PrintScreen";
  allKeys2["VALUE_INSERT"] = "Insert";
  allKeys2["VALUE_DELETE"] = "Delete";
  allKeys2["VALUE_0"] = "0";
  allKeys2["VALUE_1"] = "1";
  allKeys2["VALUE_2"] = "2";
  allKeys2["VALUE_3"] = "3";
  allKeys2["VALUE_4"] = "4";
  allKeys2["VALUE_5"] = "5";
  allKeys2["VALUE_6"] = "6";
  allKeys2["VALUE_7"] = "7";
  allKeys2["VALUE_8"] = "8";
  allKeys2["VALUE_9"] = "9";
  allKeys2["VALUE_A"] = "a";
  allKeys2["VALUE_B"] = "b";
  allKeys2["VALUE_C"] = "c";
  allKeys2["VALUE_D"] = "d";
  allKeys2["VALUE_E"] = "e";
  allKeys2["VALUE_F"] = "f";
  allKeys2["VALUE_G"] = "g";
  allKeys2["VALUE_H"] = "h";
  allKeys2["VALUE_I"] = "i";
  allKeys2["VALUE_J"] = "j";
  allKeys2["VALUE_K"] = "k";
  allKeys2["VALUE_L"] = "l";
  allKeys2["VALUE_M"] = "m";
  allKeys2["VALUE_N"] = "n";
  allKeys2["VALUE_O"] = "o";
  allKeys2["VALUE_P"] = "p";
  allKeys2["VALUE_Q"] = "q";
  allKeys2["VALUE_R"] = "r";
  allKeys2["VALUE_S"] = "s";
  allKeys2["VALUE_T"] = "t";
  allKeys2["VALUE_U"] = "u";
  allKeys2["VALUE_V"] = "v";
  allKeys2["VALUE_W"] = "w";
  allKeys2["VALUE_X"] = "x";
  allKeys2["VALUE_Y"] = "y";
  allKeys2["VALUE_Z"] = "z";
  allKeys2["VALUE_META"] = "Meta";
  allKeys2["VALUE_LEFT_CMD"] = "Meta";
  allKeys2["VALUE_RIGHT_CMD"] = "Meta";
  allKeys2["VALUE_CONTEXT_MENU"] = "ContextMenu";
  allKeys2["VALUE_NUMPAD0"] = "0";
  allKeys2["VALUE_NUMPAD1"] = "1";
  allKeys2["VALUE_NUMPAD2"] = "2";
  allKeys2["VALUE_NUMPAD3"] = "3";
  allKeys2["VALUE_NUMPAD4"] = "4";
  allKeys2["VALUE_NUMPAD5"] = "5";
  allKeys2["VALUE_NUMPAD6"] = "6";
  allKeys2["VALUE_NUMPAD7"] = "7";
  allKeys2["VALUE_NUMPAD8"] = "8";
  allKeys2["VALUE_NUMPAD9"] = "9";
  allKeys2["VALUE_MULTIPLY"] = "*";
  allKeys2["VALUE_ADD"] = "+";
  allKeys2["VALUE_SUBTRACT"] = "-";
  allKeys2["VALUE_DECIMAL"] = ".";
  allKeys2["VALUE_DIVIDE"] = "/";
  allKeys2["VALUE_F1"] = "F1";
  allKeys2["VALUE_F2"] = "F2";
  allKeys2["VALUE_F3"] = "F3";
  allKeys2["VALUE_F4"] = "F4";
  allKeys2["VALUE_F5"] = "F5";
  allKeys2["VALUE_F6"] = "F6";
  allKeys2["VALUE_F7"] = "F7";
  allKeys2["VALUE_F8"] = "F8";
  allKeys2["VALUE_F9"] = "F9";
  allKeys2["VALUE_F10"] = "F10";
  allKeys2["VALUE_F11"] = "F11";
  allKeys2["VALUE_F12"] = "F12";
  allKeys2["VALUE_F13"] = "F13";
  allKeys2["VALUE_F14"] = "F14";
  allKeys2["VALUE_F15"] = "F15";
  allKeys2["VALUE_F16"] = "F16";
  allKeys2["VALUE_F17"] = "F17";
  allKeys2["VALUE_F18"] = "F18";
  allKeys2["VALUE_F19"] = "F19";
  allKeys2["VALUE_F20"] = "F20";
  allKeys2["VALUE_F21"] = "F21";
  allKeys2["VALUE_F22"] = "F22";
  allKeys2["VALUE_F23"] = "F23";
  allKeys2["VALUE_F24"] = "F24";
  allKeys2["VALUE_NUM_LOCK"] = "NumLock";
  allKeys2["VALUE_SCROLL_LOCK"] = "ScrollLock";
  allKeys2["VALUE_SEMICOLON"] = ",";
  allKeys2["VALUE_EQUALS"] = "=";
  allKeys2["VALUE_COMMA"] = ",";
  allKeys2["VALUE_DASH"] = "-";
  allKeys2["VALUE_PERIOD"] = ".";
  allKeys2["VALUE_SLASH"] = "/";
  allKeys2["VALUE_BACK_QUOTE"] = "`";
  allKeys2["VALUE_OPEN_BRACKET"] = "[";
  allKeys2["VALUE_BACK_SLASH"] = "\\";
  allKeys2["VALUE_CLOSE_BRACKET"] = "]";
  allKeys2["VALUE_QUOTE"] = "'";
})(allKeys || (allKeys = {}));
// src/client/web-application/logic/entities/EntitiesManager.ts
class Entity {
  clientId;
  posX;
  posY;
  speedX;
  speedY;
  constructor(clientId, posX, posY) {
    this.clientId = clientId;
    this.reset(posX, posY);
  }
  reset(posX, posY) {
    this.posX = posX;
    this.posY = posY;
    this.speedX = 0;
    this.speedY = 0;
  }
  setSpeedX(speedX) {
    this.speedX = speedX;
  }
  setSpeedY(speedY) {
    this.speedY = speedY;
  }
  update(elapsedTime) {
    this.posX += this.speedX * elapsedTime;
    this.posY += this.speedY * elapsedTime;
  }
}

class EntitiesManager {
  _allEntities = [];
  constructor() {
  }
  ensureEntity(clientId, posX, posY) {
    let existing = this.findEntity(clientId);
    if (existing) {
      existing.reset(posX, posY);
    } else {
      existing = new Entity(clientId, posX, posY);
      this._allEntities.push(existing);
    }
    return existing;
  }
  removeEntity(clientId) {
    const index = this._allEntities.findIndex((val) => val.clientId === clientId);
    if (index >= 0) {
      this._allEntities.splice(index, 1);
    }
  }
  findEntity(clientId) {
    const index = this._allEntities.findIndex((val) => val.clientId === clientId);
    if (index >= 0) {
      return this._allEntities[index];
    }
  }
  get entities() {
    return this._allEntities;
  }
}

// src/client/web-application/network/JsonMessagesWebSocket.ts
var ConnectionStatus;
(function(ConnectionStatus2) {
  ConnectionStatus2["disconnected"] = "disconnected";
  ConnectionStatus2["connected"] = "connected";
  ConnectionStatus2["connecting"] = "connecting";
})(ConnectionStatus || (ConnectionStatus = {}));

class JsonMessagesWebSocket {
  _connectionStatus = ConnectionStatus.disconnected;
  _webSocket;
  _onDisconnect;
  _onMessage;
  async connect(host, port) {
    if (this._connectionStatus !== ConnectionStatus.disconnected) {
      throw new Error(`can only connect when disconnected`);
    }
    this._connectionStatus = ConnectionStatus.connecting;
    await new Promise((resolve, reject) => {
      this._webSocket = new WebSocket(`ws://${host}:${port}`);
      const onOpen = () => {
        console.log(`websocket: is open`);
        this._webSocket.removeEventListener("open", onOpen);
        this._webSocket.removeEventListener("error", onError2);
        this._connectionStatus = ConnectionStatus.connected;
        resolve();
      };
      const onError2 = (err) => {
        console.log(`websocket: error ${err?.message}`);
        this._webSocket.removeEventListener("open", onOpen);
        this._webSocket.removeEventListener("error", onError2);
        this._connectionStatus = ConnectionStatus.disconnected;
        reject();
      };
      this._webSocket.addEventListener("open", onOpen);
      this._webSocket.addEventListener("error", onError2);
    });
    const onMessage = (message) => {
      const data = JSON.parse(message.data);
      if (this._onMessage) {
        this._onMessage(data);
      }
    };
    const onError = (err) => {
      console.log(`websocket: error ${err?.message}`);
      this._webSocket.removeEventListener("message", onMessage);
      this._webSocket.removeEventListener("close", onClose);
      this._webSocket.removeEventListener("error", onError);
      this._connectionStatus = ConnectionStatus.disconnected;
      if (this._onDisconnect) {
        this._onDisconnect(true);
      }
    };
    const onClose = () => {
      console.log(`websocket: close`);
      this._webSocket.removeEventListener("message", onMessage);
      this._webSocket.removeEventListener("close", onClose);
      this._webSocket.removeEventListener("error", onError);
      this._connectionStatus = ConnectionStatus.disconnected;
      if (this._onDisconnect) {
        this._onDisconnect(false);
      }
    };
    this._webSocket.addEventListener("message", onMessage);
    this._webSocket.addEventListener("close", onClose);
    this._webSocket.addEventListener("error", onError);
  }
  disconnect() {
    if (this._connectionStatus === ConnectionStatus.disconnected) {
      throw new Error(`can only connect when not disconnected`);
    }
    this._webSocket.close();
    this._connectionStatus = ConnectionStatus.disconnected;
  }
  isConnected() {
    return this._connectionStatus === ConnectionStatus.connected;
  }
  onDisconnect(callback) {
    this._onDisconnect = callback;
  }
  onMessage(callback) {
    this._onMessage = callback;
  }
  send(message) {
    this._webSocket.send(JSON.stringify(message));
  }
}

// src/client/web-application/graphic/CanvasRenderer.ts
class CanvasRenderer {
  _canvas;
  _ctx;
  constructor(canvas) {
    this._canvas = canvas;
    this._ctx = this._canvas.getContext("2d");
  }
  clear() {
    this._ctx.fillStyle = "black";
    this._ctx.fillRect(0, 0, 800, 640);
  }
  drawLine(x1, y1, x2, y2, color) {
    this._ctx.strokeStyle = color;
    this._ctx.lineWidth = 1;
    this._ctx.beginPath();
    this._ctx.moveTo(x1, y1);
    this._ctx.lineTo(x2, y2);
    this._ctx.stroke();
  }
  drawThickLine(x1, y1, x2, y2, color) {
    this._ctx.strokeStyle = color;
    this._ctx.lineWidth = 4;
    this._ctx.beginPath();
    this._ctx.moveTo(x1, y1);
    this._ctx.lineTo(x2, y2);
    this._ctx.stroke();
  }
  drawLineStrip(lines, color) {
    this._ctx.strokeStyle = color;
    this._ctx.lineWidth = 1;
    this._ctx.beginPath();
    this._ctx.moveTo(lines[0][0], lines[0][1]);
    for (var i = 1;i < lines.length; ++i)
      this._ctx.lineTo(lines[i][0], lines[i][1]);
    this._ctx.stroke();
  }
  drawLineLoop(lines, color) {
    this._ctx.strokeStyle = color;
    this._ctx.lineWidth = 1;
    this._ctx.beginPath();
    this._ctx.moveTo(lines[0][0], lines[0][1]);
    for (var i = 1;i < lines.length; ++i)
      this._ctx.lineTo(lines[i][0], lines[i][1]);
    this._ctx.lineTo(lines[0][0], lines[0][1]);
    this._ctx.stroke();
  }
  drawLines(lines, color) {
    this._ctx.strokeStyle = color;
    this._ctx.lineWidth = 1;
    this._ctx.beginPath();
    for (var i = 0;i < lines.length; ++i) {
      this._ctx.moveTo(lines[i][0][0], lines[i][0][1]);
      this._ctx.lineTo(lines[i][1][0], lines[i][1][1]);
    }
    this._ctx.stroke();
  }
  drawPoint(x, y, size, color) {
    this.drawLine(x - size, y - size, x + size, y + size, color);
    this.drawLine(x - size, y + size, x + size, y - size, color);
  }
  drawSquare(x, y, size, color) {
    this._ctx.fillStyle = color;
    this._ctx.beginPath();
    this._ctx.rect(x, y, size, size);
    this._ctx.fill();
  }
  drawText(x, y, text, color) {
    this._ctx.fillStyle = color;
    this._ctx.font = "15px serif";
    this._ctx.fillText(text, x, y);
  }
  getCanvas() {
    return this._canvas;
  }
  getContext() {
    return this._ctx;
  }
}

// src/client/web-application/WebApplication.ts
class WebApplication {
  _loggerOutput;
  _webSocket;
  _keyboardHandler = new KeyboardHandler;
  _canvasRenderer;
  _clientId = "-1";
  _entitiesManager = new EntitiesManager;
  constructor(canvas, loggerOutput) {
    this._canvasRenderer = new CanvasRenderer(canvas);
    this._loggerOutput = loggerOutput;
    this._loggerOutput.value = "";
  }
  async initialize() {
    const response = await fetch(`/ws-config`);
    const wsConfig = await response.json();
    this._webSocket = new JsonMessagesWebSocket;
    this._webSocket.onDisconnect(() => {
      this._log(`is disconnected`);
    });
    this._webSocket.onMessage((data) => {
      switch (data.type) {
        case "message": {
          this._log(`received message: "${data.value}"`);
          break;
        }
        case "who-am-I": {
          this._log(`received who-am-I: "${data.value}"`);
          this._clientId = data.value;
          const myEntity = this._entitiesManager.ensureEntity(this._clientId, 400, 300);
          this._webSocket.send({
            type: "move",
            value: [
              {
                clientId: myEntity.clientId,
                posX: myEntity.posX,
                posY: myEntity.posY,
                speedX: myEntity.speedX,
                speedY: myEntity.speedY
              }
            ]
          });
          break;
        }
        case "who-am-I": {
          this._log(`received who-am-I: "${data.value}"`);
          this._clientId = data.value;
          const myEntity = this._entitiesManager.ensureEntity(this._clientId, 400, 300);
          this._webSocket.send({
            type: "move",
            value: [
              {
                clientId: myEntity.clientId,
                posX: myEntity.posX,
                posY: myEntity.posY,
                speedX: myEntity.speedX,
                speedY: myEntity.speedY
              }
            ]
          });
          break;
        }
        case "move": {
          this._log(`received move: "${data.value}"`);
          data.value.forEach((val) => {
            const { clientId, posX, posY, speedX, speedY } = val;
            const entity = this._entitiesManager.ensureEntity(clientId, posX, posY);
            entity.setSpeedX(speedX);
            entity.setSpeedY(speedY);
          });
          break;
        }
        case "ping": {
          this._log(`received ping, replying pong`);
          this._webSocket.send({ type: "pong" });
          break;
        }
      }
    });
    this._log(`connecting`);
    await this._webSocket.connect(wsConfig.host, wsConfig.port);
    this._log(`is connected`);
    this._webSocket.send({ type: "who-am-I" });
    this._keyboardHandler.activate();
  }
  async dispose() {
    this._webSocket.disconnect();
  }
  update(elapsedTime) {
    if (!this._keyboardHandler.wasPressed(allKeys.VALUE_G) && this._keyboardHandler.isPressed(allKeys.VALUE_G)) {
      this._webSocket.send({
        type: "message",
        value: "hello!"
      });
    }
    if (this._keyboardHandler.isPressed(allKeys.VALUE_LEFT)) {
      const myEntity = this._entitiesManager.findEntity(this._clientId);
      if (myEntity) {
        myEntity.setSpeedX(-20);
        if (!this._keyboardHandler.wasPressed(allKeys.VALUE_LEFT)) {
          this._webSocket.send({
            type: "move",
            value: [
              {
                clientId: myEntity.clientId,
                posX: myEntity.posX,
                posY: myEntity.posY,
                speedX: myEntity.speedX,
                speedY: myEntity.speedY
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
      this._canvasRenderer.drawSquare(currEntity.posX, currEntity.posY, 10, "#ff0000");
    }
    this._canvasRenderer.drawLineLoop([
      [10, 10],
      [100, 20],
      [20, 100]
    ], "red");
  }
  _log(...args) {
    this._loggerOutput.value += `${new Date().toISOString()} ${args.join(" ")}\n`;
    this._loggerOutput.scrollTop = this._loggerOutput.scrollHeight;
  }
}

// src/client/client.ts
var g_hasErrored = false;
var _queryDomElement = (select) => {
  const domElement = document.querySelector(select);
  if (!domElement) {
    throw new Error(`dome element not found "${select}"`);
  }
  return domElement;
};
var onPageLoad = async () => {
  const loggerOutput = _queryDomElement("#logger-output");
  const mainCanvas = _queryDomElement("#main-canvas");
  const _log = (...args) => {
    loggerOutput.value += `${new Date().toISOString()} ${args.join(" ")}\n`;
    loggerOutput.scrollTop = loggerOutput.scrollHeight;
  };
  loggerOutput.value = "";
  if (!window.WebSocket) {
    g_hasErrored = true;
    _log("Sorry, but your browser doesn't support WebSockets.");
    return;
  }
  const app = new WebApplication(mainCanvas, loggerOutput);
  try {
    await app.initialize();
    _log("done");
  } catch (err) {
    _log(`error while initializing, msg: "${err?.message}"`);
  }
  _log("render");
  const tick = () => {
    window.setTimeout(tick, 16.666666666666668);
    const elapsedTime = 0.016666666666666666;
    app.update(elapsedTime);
    app.render();
  };
  tick();
};
window.addEventListener("load", onPageLoad);

//# debugId=F2D83432341F6DE664756e2164756e21
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsic3JjL2NsaWVudC93ZWItYXBwbGljYXRpb24vbG9naWMva2V5Ym9hcmQvS2V5Ym9hcmRIYW5kbGVyLnRzIiwgInNyYy9jbGllbnQvd2ViLWFwcGxpY2F0aW9uL2xvZ2ljL2tleWJvYXJkL2tleXMudHMiLCAic3JjL2NsaWVudC93ZWItYXBwbGljYXRpb24vbG9naWMvZW50aXRpZXMvRW50aXRpZXNNYW5hZ2VyLnRzIiwgInNyYy9jbGllbnQvd2ViLWFwcGxpY2F0aW9uL25ldHdvcmsvSnNvbk1lc3NhZ2VzV2ViU29ja2V0LnRzIiwgInNyYy9jbGllbnQvd2ViLWFwcGxpY2F0aW9uL2dyYXBoaWMvQ2FudmFzUmVuZGVyZXIudHMiLCAic3JjL2NsaWVudC93ZWItYXBwbGljYXRpb24vV2ViQXBwbGljYXRpb24udHMiLCAic3JjL2NsaWVudC9jbGllbnQudHMiXSwKICAic291cmNlc0NvbnRlbnQiOiBbCiAgICAiXG5pbXBvcnQge2FsbEtleXN9IGZyb20gXCIuL2tleXNcIlxuXG5leHBvcnQgY2xhc3MgS2V5Ym9hcmRIYW5kbGVye1xuXG4gICAgLy8gaGVyZSB3ZSBhc3N1bWUgc21hbGwgbnVtYmVyIG9mIGVudHJpZXNcbiAgICAvLyAtPiByZWQgYmxhY2sgdHJlZSBtYXAgKGFuIG9iamVjdCkgZmVlbHMgbW9yZSBzdWl0YWJsZSB0aGF0IGhhc2htYXAgKE1hcClcbiAgICBwcml2YXRlIF93YXNQcmVzc2VkOiBSZWNvcmQ8c3RyaW5nLCBib29sZWFuPiA9IHt9O1xuICAgIHByaXZhdGUgX2lzUHJlc3NlZDogUmVjb3JkPHN0cmluZywgYm9vbGVhbj4gPSB7fTtcblxuICAgIHByaXZhdGUgX2FjdGl2YXRlZCA9IGZhbHNlO1xuICAgIHByaXZhdGUgX2hhbmRsZUtleURvd246IChldmVudDogS2V5Ym9hcmRFdmVudCkgPT4gdm9pZDtcbiAgICBwcml2YXRlIF9oYW5kbGVLZXlVcDogKGV2ZW50OiBLZXlib2FyZEV2ZW50KSA9PiB2b2lkO1xuICAgIGNvbnN0cnVjdG9yKCkge1xuXG4gICAgICAgIGNvbnN0IGhhbmRsZUtleURvd24gPSAoZXZlbnQ6IEtleWJvYXJkRXZlbnQpID0+IHsgdGhpcy5faXNQcmVzc2VkW2V2ZW50LmtleV0gPSB0cnVlOyB9O1xuICAgICAgICBjb25zdCBoYW5kbGVLZXlVcCA9IChldmVudDogS2V5Ym9hcmRFdmVudCkgPT4geyB0aGlzLl9pc1ByZXNzZWRbZXZlbnQua2V5XSA9IGZhbHNlOyB9O1xuXG4gICAgICAgIHRoaXMuX2hhbmRsZUtleURvd24gPSBoYW5kbGVLZXlEb3duLmJpbmQodGhpcyk7XG4gICAgICAgIHRoaXMuX2hhbmRsZUtleVVwID0gaGFuZGxlS2V5VXAuYmluZCh0aGlzKTtcbiAgICB9XG5cbiAgICAvL1xuXG4gICAgdXBkYXRlKCkge1xuICAgICAgICB0aGlzLl93YXNQcmVzc2VkID0gdGhpcy5faXNQcmVzc2VkO1xuICAgICAgICB0aGlzLl9pc1ByZXNzZWQgPSB7fTtcbiAgICB9XG5cbiAgICB3YXNQcmVzc2VkKGtleTogYWxsS2V5cykge1xuICAgICAgICByZXR1cm4gdGhpcy5fd2FzUHJlc3NlZFtrZXldO1xuICAgIH1cbiAgICBpc1ByZXNzZWQoa2V5OiBhbGxLZXlzKSB7XG4gICAgICAgIHJldHVybiB0aGlzLl9pc1ByZXNzZWRba2V5XTtcbiAgICB9XG5cbiAgICAvL1xuXG4gICAgYWN0aXZhdGUoKSB7XG5cbiAgICAgICAgaWYgKHRoaXMuX2FjdGl2YXRlZClcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgdGhpcy5fYWN0aXZhdGVkID0gdHJ1ZTtcblxuICAgICAgICBkb2N1bWVudC5hZGRFdmVudExpc3RlbmVyKCdrZXlkb3duJywgdGhpcy5faGFuZGxlS2V5RG93bik7XG4gICAgICAgIGRvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIoJ2tleXVwJywgICB0aGlzLl9oYW5kbGVLZXlVcCk7XG4gICAgfVxuXG4gICAgZGVhY3RpdmF0ZSgpIHtcblxuICAgICAgICBpZiAoIXRoaXMuX2FjdGl2YXRlZClcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgdGhpcy5fYWN0aXZhdGVkID0gZmFsc2U7XG5cbiAgICAgICAgZG9jdW1lbnQucmVtb3ZlRXZlbnRMaXN0ZW5lcigna2V5ZG93bicsIHRoaXMuX2hhbmRsZUtleURvd24pO1xuICAgICAgICBkb2N1bWVudC5yZW1vdmVFdmVudExpc3RlbmVyKCdrZXl1cCcsICAgdGhpcy5faGFuZGxlS2V5VXApO1xuICAgIH1cbn07XG4iLAogICIvLyAvLyBLZXkgY29kZSBjb25zdGFudHNcbi8vIC8vIEF2YWlsYWJsZSB2YWx1ZXMgZm9yIGBLZXlib2FyZEV2ZW50LmtleUNvZGVgIGF0dHJpYnV0ZS5cbi8vIGV4cG9ydCBjb25zdCBLRVlfQ0FOQ0VMID0gMztcbi8vIGV4cG9ydCBjb25zdCBLRVlfSEVMUCA9IDY7XG4vLyBleHBvcnQgY29uc3QgS0VZX0JBQ0tfU1BBQ0UgPSA4O1xuLy8gZXhwb3J0IGNvbnN0IEtFWV9UQUIgPSA5O1xuLy8gZXhwb3J0IGNvbnN0IEtFWV9DTEVBUiA9IDEyO1xuLy8gZXhwb3J0IGNvbnN0IEtFWV9SRVRVUk4gPSAxMztcbi8vIGV4cG9ydCBjb25zdCBLRVlfU0hJRlQgPSAxNjtcbi8vIGV4cG9ydCBjb25zdCBLRVlfQ09OVFJPTCA9IDE3O1xuLy8gZXhwb3J0IGNvbnN0IEtFWV9BTFQgPSAxODtcbi8vIGV4cG9ydCBjb25zdCBLRVlfUEFVU0UgPSAxOTtcbi8vIGV4cG9ydCBjb25zdCBLRVlfQ0FQU19MT0NLID0gMjA7XG4vLyBleHBvcnQgY29uc3QgS0VZX0VTQ0FQRSA9IDI3O1xuLy8gZXhwb3J0IGNvbnN0IEtFWV9TUEFDRSA9IDMyO1xuLy8gZXhwb3J0IGNvbnN0IEtFWV9QQUdFX1VQID0gMzM7XG4vLyBleHBvcnQgY29uc3QgS0VZX1BBR0VfRE9XTiA9IDM0O1xuLy8gZXhwb3J0IGNvbnN0IEtFWV9FTkQgPSAzNTtcbi8vIGV4cG9ydCBjb25zdCBLRVlfSE9NRSA9IDM2O1xuLy8gZXhwb3J0IGNvbnN0IEtFWV9MRUZUID0gMzc7XG4vLyBleHBvcnQgY29uc3QgS0VZX1VQID0gMzg7XG4vLyBleHBvcnQgY29uc3QgS0VZX1JJR0hUID0gMzk7XG4vLyBleHBvcnQgY29uc3QgS0VZX0RPV04gPSA0MDtcbi8vIGV4cG9ydCBjb25zdCBLRVlfUFJJTlRTQ1JFRU4gPSA0NDtcbi8vIGV4cG9ydCBjb25zdCBLRVlfSU5TRVJUID0gNDU7XG4vLyBleHBvcnQgY29uc3QgS0VZX0RFTEVURSA9IDQ2O1xuLy8gZXhwb3J0IGNvbnN0IEtFWV8wID0gNDg7XG4vLyBleHBvcnQgY29uc3QgS0VZXzEgPSA0OTtcbi8vIGV4cG9ydCBjb25zdCBLRVlfMiA9IDUwO1xuLy8gZXhwb3J0IGNvbnN0IEtFWV8zID0gNTE7XG4vLyBleHBvcnQgY29uc3QgS0VZXzQgPSA1Mjtcbi8vIGV4cG9ydCBjb25zdCBLRVlfNSA9IDUzO1xuLy8gZXhwb3J0IGNvbnN0IEtFWV82ID0gNTQ7XG4vLyBleHBvcnQgY29uc3QgS0VZXzcgPSA1NTtcbi8vIGV4cG9ydCBjb25zdCBLRVlfOCA9IDU2O1xuLy8gZXhwb3J0IGNvbnN0IEtFWV85ID0gNTc7XG4vLyBleHBvcnQgY29uc3QgS0VZX0EgPSA2NTtcbi8vIGV4cG9ydCBjb25zdCBLRVlfQiA9IDY2O1xuLy8gZXhwb3J0IGNvbnN0IEtFWV9DID0gNjc7XG4vLyBleHBvcnQgY29uc3QgS0VZX0QgPSA2ODtcbi8vIGV4cG9ydCBjb25zdCBLRVlfRSA9IDY5O1xuLy8gZXhwb3J0IGNvbnN0IEtFWV9GID0gNzA7XG4vLyBleHBvcnQgY29uc3QgS0VZX0cgPSA3MTtcbi8vIGV4cG9ydCBjb25zdCBLRVlfSCA9IDcyO1xuLy8gZXhwb3J0IGNvbnN0IEtFWV9JID0gNzM7XG4vLyBleHBvcnQgY29uc3QgS0VZX0ogPSA3NDtcbi8vIGV4cG9ydCBjb25zdCBLRVlfSyA9IDc1O1xuLy8gZXhwb3J0IGNvbnN0IEtFWV9MID0gNzY7XG4vLyBleHBvcnQgY29uc3QgS0VZX00gPSA3Nztcbi8vIGV4cG9ydCBjb25zdCBLRVlfTiA9IDc4O1xuLy8gZXhwb3J0IGNvbnN0IEtFWV9PID0gNzk7XG4vLyBleHBvcnQgY29uc3QgS0VZX1AgPSA4MDtcbi8vIGV4cG9ydCBjb25zdCBLRVlfUSA9IDgxO1xuLy8gZXhwb3J0IGNvbnN0IEtFWV9SID0gODI7XG4vLyBleHBvcnQgY29uc3QgS0VZX1MgPSA4Mztcbi8vIGV4cG9ydCBjb25zdCBLRVlfVCA9IDg0O1xuLy8gZXhwb3J0IGNvbnN0IEtFWV9VID0gODU7XG4vLyBleHBvcnQgY29uc3QgS0VZX1YgPSA4Njtcbi8vIGV4cG9ydCBjb25zdCBLRVlfVyA9IDg3O1xuLy8gZXhwb3J0IGNvbnN0IEtFWV9YID0gODg7XG4vLyBleHBvcnQgY29uc3QgS0VZX1kgPSA4OTtcbi8vIGV4cG9ydCBjb25zdCBLRVlfWiA9IDkwO1xuLy8gZXhwb3J0IGNvbnN0IEtFWV9MRUZUX0NNRCA9IDkxO1xuLy8gZXhwb3J0IGNvbnN0IEtFWV9SSUdIVF9DTUQgPSA5Mjtcbi8vIGV4cG9ydCBjb25zdCBLRVlfQ09OVEVYVF9NRU5VID0gOTM7XG4vLyBleHBvcnQgY29uc3QgS0VZX05VTVBBRDAgPSA5Njtcbi8vIGV4cG9ydCBjb25zdCBLRVlfTlVNUEFEMSA9IDk3O1xuLy8gZXhwb3J0IGNvbnN0IEtFWV9OVU1QQUQyID0gOTg7XG4vLyBleHBvcnQgY29uc3QgS0VZX05VTVBBRDMgPSA5OTtcbi8vIGV4cG9ydCBjb25zdCBLRVlfTlVNUEFENCA9IDEwMDtcbi8vIGV4cG9ydCBjb25zdCBLRVlfTlVNUEFENSA9IDEwMTtcbi8vIGV4cG9ydCBjb25zdCBLRVlfTlVNUEFENiA9IDEwMjtcbi8vIGV4cG9ydCBjb25zdCBLRVlfTlVNUEFENyA9IDEwMztcbi8vIGV4cG9ydCBjb25zdCBLRVlfTlVNUEFEOCA9IDEwNDtcbi8vIGV4cG9ydCBjb25zdCBLRVlfTlVNUEFEOSA9IDEwNTtcbi8vIGV4cG9ydCBjb25zdCBLRVlfTVVMVElQTFkgPSAxMDY7XG4vLyBleHBvcnQgY29uc3QgS0VZX0FERCA9IDEwNztcbi8vIGV4cG9ydCBjb25zdCBLRVlfU1VCVFJBQ1QgPSAxMDk7XG4vLyBleHBvcnQgY29uc3QgS0VZX0RFQ0lNQUwgPSAxMTA7XG4vLyBleHBvcnQgY29uc3QgS0VZX0RJVklERSA9IDExMTtcbi8vIGV4cG9ydCBjb25zdCBLRVlfRjEgPSAxMTI7XG4vLyBleHBvcnQgY29uc3QgS0VZX0YyID0gMTEzO1xuLy8gZXhwb3J0IGNvbnN0IEtFWV9GMyA9IDExNDtcbi8vIGV4cG9ydCBjb25zdCBLRVlfRjQgPSAxMTU7XG4vLyBleHBvcnQgY29uc3QgS0VZX0Y1ID0gMTE2O1xuLy8gZXhwb3J0IGNvbnN0IEtFWV9GNiA9IDExNztcbi8vIGV4cG9ydCBjb25zdCBLRVlfRjcgPSAxMTg7XG4vLyBleHBvcnQgY29uc3QgS0VZX0Y4ID0gMTE5O1xuLy8gZXhwb3J0IGNvbnN0IEtFWV9GOSA9IDEyMDtcbi8vIGV4cG9ydCBjb25zdCBLRVlfRjEwID0gMTIxO1xuLy8gZXhwb3J0IGNvbnN0IEtFWV9GMTEgPSAxMjI7XG4vLyBleHBvcnQgY29uc3QgS0VZX0YxMiA9IDEyMztcbi8vIGV4cG9ydCBjb25zdCBLRVlfRjEzID0gMTI0O1xuLy8gZXhwb3J0IGNvbnN0IEtFWV9GMTQgPSAxMjU7XG4vLyBleHBvcnQgY29uc3QgS0VZX0YxNSA9IDEyNjtcbi8vIGV4cG9ydCBjb25zdCBLRVlfRjE2ID0gMTI3O1xuLy8gZXhwb3J0IGNvbnN0IEtFWV9GMTcgPSAxMjg7XG4vLyBleHBvcnQgY29uc3QgS0VZX0YxOCA9IDEyOTtcbi8vIGV4cG9ydCBjb25zdCBLRVlfRjE5ID0gMTMwO1xuLy8gZXhwb3J0IGNvbnN0IEtFWV9GMjAgPSAxMzE7XG4vLyBleHBvcnQgY29uc3QgS0VZX0YyMSA9IDEzMjtcbi8vIGV4cG9ydCBjb25zdCBLRVlfRjIyID0gMTMzO1xuLy8gZXhwb3J0IGNvbnN0IEtFWV9GMjMgPSAxMzQ7XG4vLyBleHBvcnQgY29uc3QgS0VZX0YyNCA9IDEzNTtcbi8vIGV4cG9ydCBjb25zdCBLRVlfTlVNX0xPQ0sgPSAxNDQ7XG4vLyBleHBvcnQgY29uc3QgS0VZX1NDUk9MTF9MT0NLID0gMTQ1O1xuLy8gZXhwb3J0IGNvbnN0IEtFWV9TRU1JQ09MT04gPSAxODY7XG4vLyBleHBvcnQgY29uc3QgS0VZX0VRVUFMUyA9IDE4Nztcbi8vIGV4cG9ydCBjb25zdCBLRVlfQ09NTUEgPSAxODg7XG4vLyBleHBvcnQgY29uc3QgS0VZX0RBU0ggPSAxODk7XG4vLyBleHBvcnQgY29uc3QgS0VZX1BFUklPRCA9IDE5MDtcbi8vIGV4cG9ydCBjb25zdCBLRVlfU0xBU0ggPSAxOTE7XG4vLyBleHBvcnQgY29uc3QgS0VZX0JBQ0tfUVVPVEUgPSAxOTI7XG4vLyBleHBvcnQgY29uc3QgS0VZX09QRU5fQlJBQ0tFVCA9IDIxOTtcbi8vIGV4cG9ydCBjb25zdCBLRVlfQkFDS19TTEFTSCA9IDIyMDtcbi8vIGV4cG9ydCBjb25zdCBLRVlfQ0xPU0VfQlJBQ0tFVCA9IDIyMTtcbi8vIGV4cG9ydCBjb25zdCBLRVlfUVVPVEUgPSAyMjI7XG5cbi8vIC8vIEtleSBjb2RlIGNvbnN0YW50cyBzcGVjaWZpYyB0byBmaXJlZm94IG9ubHkuXG4vLyBleHBvcnQgY29uc3QgS0VZX0ZJUkVGT1hfRU5URVIgPSAxNDtcbi8vIGV4cG9ydCBjb25zdCBLRVlfRklSRUZPWF9TRU1JQ09MT04gPSA1OTtcbi8vIGV4cG9ydCBjb25zdCBLRVlfRklSRUZPWF9FUVVBTFMgPSA2MTtcbi8vIGV4cG9ydCBjb25zdCBLRVlfRklSRUZPWF9TRVBBUkFUT1IgPSAxMDg7XG4vLyBleHBvcnQgY29uc3QgS0VZX0ZJUkVGT1hfTUVUQSA9IDIyNDtcblxuLy8gS2V5IHZhbHVlcyBjb25zdGFudHNcbi8vIEF2YWlsYWJsZSB2YWx1ZXMgZm9yIGBLZXlib2FyZEV2ZW50LmtleWAgYXR0cmlidXRlLlxuZXhwb3J0IGVudW0gYWxsS2V5cyB7XG4gIFZBTFVFX0NBTkNFTCA9ICdDYW5jZWwnLFxuICBWQUxVRV9IRUxQID0gJ0hlbHAnLFxuICBWQUxVRV9CQUNLX1NQQUNFID0gJ0JhY2tzcGFjZScsXG4gIFZBTFVFX1RBQiA9ICdUYWInLFxuICBWQUxVRV9DTEVBUiA9ICdDbGVhcicsXG4gIFZBTFVFX0VOVEVSID0gJ0VudGVyJyxcbiAgVkFMVUVfUkVUVVJOID0gJ0VudGVyJyxcbiAgVkFMVUVfU0hJRlQgPSAnU2hpZnQnLFxuICBWQUxVRV9DT05UUk9MID0gJ0NvbnRyb2wnLFxuICBWQUxVRV9BTFQgPSAnQWx0JyxcbiAgVkFMVUVfUEFVU0UgPSAnUGF1c2UnLFxuICBWQUxVRV9DQVBTX0xPQ0sgPSAnQ2Fwc0xvY2snLFxuICBWQUxVRV9FU0NBUEUgPSAnRXNjYXBlJyxcbiAgVkFMVUVfU1BBQ0UgPSAnICcsXG4gIFZBTFVFX1BBR0VfVVAgPSAnUGFnZVVwJyxcbiAgVkFMVUVfUEFHRV9ET1dOID0gJ1BhZ2VEb3duJyxcbiAgVkFMVUVfRU5EID0gJ0VuZCcsXG4gIFZBTFVFX0hPTUUgPSAnSG9tZScsXG4gIFZBTFVFX0xFRlQgPSAnQXJyb3dMZWZ0JyxcbiAgVkFMVUVfVVAgPSAnQXJyb3dVcCcsXG4gIFZBTFVFX1JJR0hUID0gJ0Fycm93UmlnaHQnLFxuICBWQUxVRV9ET1dOID0gJ0Fycm93RG93bicsXG4gIFZBTFVFX1BSSU5UU0NSRUVOID0gJ1ByaW50U2NyZWVuJyxcbiAgVkFMVUVfSU5TRVJUID0gJ0luc2VydCcsXG4gIFZBTFVFX0RFTEVURSA9ICdEZWxldGUnLFxuICBWQUxVRV8wID0gJzAnLFxuICBWQUxVRV8xID0gJzEnLFxuICBWQUxVRV8yID0gJzInLFxuICBWQUxVRV8zID0gJzMnLFxuICBWQUxVRV80ID0gJzQnLFxuICBWQUxVRV81ID0gJzUnLFxuICBWQUxVRV82ID0gJzYnLFxuICBWQUxVRV83ID0gJzcnLFxuICBWQUxVRV84ID0gJzgnLFxuICBWQUxVRV85ID0gJzknLFxuICBWQUxVRV9BID0gJ2EnLFxuICBWQUxVRV9CID0gJ2InLFxuICBWQUxVRV9DID0gJ2MnLFxuICBWQUxVRV9EID0gJ2QnLFxuICBWQUxVRV9FID0gJ2UnLFxuICBWQUxVRV9GID0gJ2YnLFxuICBWQUxVRV9HID0gJ2cnLFxuICBWQUxVRV9IID0gJ2gnLFxuICBWQUxVRV9JID0gJ2knLFxuICBWQUxVRV9KID0gJ2onLFxuICBWQUxVRV9LID0gJ2snLFxuICBWQUxVRV9MID0gJ2wnLFxuICBWQUxVRV9NID0gJ20nLFxuICBWQUxVRV9OID0gJ24nLFxuICBWQUxVRV9PID0gJ28nLFxuICBWQUxVRV9QID0gJ3AnLFxuICBWQUxVRV9RID0gJ3EnLFxuICBWQUxVRV9SID0gJ3InLFxuICBWQUxVRV9TID0gJ3MnLFxuICBWQUxVRV9UID0gJ3QnLFxuICBWQUxVRV9VID0gJ3UnLFxuICBWQUxVRV9WID0gJ3YnLFxuICBWQUxVRV9XID0gJ3cnLFxuICBWQUxVRV9YID0gJ3gnLFxuICBWQUxVRV9ZID0gJ3knLFxuICBWQUxVRV9aID0gJ3onLFxuICBWQUxVRV9NRVRBID0gJ01ldGEnLFxuICBWQUxVRV9MRUZUX0NNRCA9ICdNZXRhJyxcbiAgVkFMVUVfUklHSFRfQ01EID0gJ01ldGEnLFxuICBWQUxVRV9DT05URVhUX01FTlUgPSAnQ29udGV4dE1lbnUnLFxuICBWQUxVRV9OVU1QQUQwID0gJzAnLFxuICBWQUxVRV9OVU1QQUQxID0gJzEnLFxuICBWQUxVRV9OVU1QQUQyID0gJzInLFxuICBWQUxVRV9OVU1QQUQzID0gJzMnLFxuICBWQUxVRV9OVU1QQUQ0ID0gJzQnLFxuICBWQUxVRV9OVU1QQUQ1ID0gJzUnLFxuICBWQUxVRV9OVU1QQUQ2ID0gJzYnLFxuICBWQUxVRV9OVU1QQUQ3ID0gJzcnLFxuICBWQUxVRV9OVU1QQUQ4ID0gJzgnLFxuICBWQUxVRV9OVU1QQUQ5ID0gJzknLFxuICBWQUxVRV9NVUxUSVBMWSA9ICcqJyxcbiAgVkFMVUVfQUREID0gJysnLFxuICBWQUxVRV9TVUJUUkFDVCA9ICctJyxcbiAgVkFMVUVfREVDSU1BTCA9ICcuJyxcbiAgVkFMVUVfRElWSURFID0gJy8nLFxuICBWQUxVRV9GMSA9ICdGMScsXG4gIFZBTFVFX0YyID0gJ0YyJyxcbiAgVkFMVUVfRjMgPSAnRjMnLFxuICBWQUxVRV9GNCA9ICdGNCcsXG4gIFZBTFVFX0Y1ID0gJ0Y1JyxcbiAgVkFMVUVfRjYgPSAnRjYnLFxuICBWQUxVRV9GNyA9ICdGNycsXG4gIFZBTFVFX0Y4ID0gJ0Y4JyxcbiAgVkFMVUVfRjkgPSAnRjknLFxuICBWQUxVRV9GMTAgPSAnRjEwJyxcbiAgVkFMVUVfRjExID0gJ0YxMScsXG4gIFZBTFVFX0YxMiA9ICdGMTInLFxuICBWQUxVRV9GMTMgPSAnRjEzJyxcbiAgVkFMVUVfRjE0ID0gJ0YxNCcsXG4gIFZBTFVFX0YxNSA9ICdGMTUnLFxuICBWQUxVRV9GMTYgPSAnRjE2JyxcbiAgVkFMVUVfRjE3ID0gJ0YxNycsXG4gIFZBTFVFX0YxOCA9ICdGMTgnLFxuICBWQUxVRV9GMTkgPSAnRjE5JyxcbiAgVkFMVUVfRjIwID0gJ0YyMCcsXG4gIFZBTFVFX0YyMSA9ICdGMjEnLFxuICBWQUxVRV9GMjIgPSAnRjIyJyxcbiAgVkFMVUVfRjIzID0gJ0YyMycsXG4gIFZBTFVFX0YyNCA9ICdGMjQnLFxuICBWQUxVRV9OVU1fTE9DSyA9ICdOdW1Mb2NrJyxcbiAgVkFMVUVfU0NST0xMX0xPQ0sgPSAnU2Nyb2xsTG9jaycsXG4gIFZBTFVFX1NFTUlDT0xPTiA9ICcsJyxcbiAgVkFMVUVfRVFVQUxTID0gJz0nLFxuICBWQUxVRV9DT01NQSA9ICcsJyxcbiAgVkFMVUVfREFTSCA9ICctJyxcbiAgVkFMVUVfUEVSSU9EID0gJy4nLFxuICBWQUxVRV9TTEFTSCA9ICcvJyxcbiAgVkFMVUVfQkFDS19RVU9URSA9ICdgJyxcbiAgVkFMVUVfT1BFTl9CUkFDS0VUID0gJ1snLFxuICBWQUxVRV9CQUNLX1NMQVNIID0gJ1xcXFwnLFxuICBWQUxVRV9DTE9TRV9CUkFDS0VUID0gJ10nLFxuICBWQUxVRV9RVU9URSA9IFwiJ1wiLFxufVxuXG4vLyAvLyBLZXkgY29kZSBjb25zdGFudHNcbi8vIC8vIEF2YWlsYWJsZSB2YWx1ZXMgZm9yIGBLZXlib2FyZEV2ZW50LmNvZGVgIGF0dHJpYnV0ZS5cbi8vIGV4cG9ydCBjb25zdCBDT0RFX1VOSURFTlRJRklFRCA9ICdVbmlkZW50aWZpZWQnO1xuLy8gZXhwb3J0IGNvbnN0IENPREVfRVNDQVBFID0gJ0VzY2FwZSc7XG4vLyBleHBvcnQgY29uc3QgQ09ERV9NSU5VUyA9ICdNaW51cyc7XG4vLyBleHBvcnQgY29uc3QgQ09ERV9EQVNIID0gJ01pbnVzJztcbi8vIGV4cG9ydCBjb25zdCBDT0RFX0VRVUFMUyA9ICdFcXVhbCc7XG4vLyBleHBvcnQgY29uc3QgQ09ERV9CQUNLX1NQQUNFID0gJ0JhY2tzcGFjZSc7XG4vLyBleHBvcnQgY29uc3QgQ09ERV9UQUIgPSAnVGFiJztcbi8vIGV4cG9ydCBjb25zdCBDT0RFX0VOVEVSID0gJ0VudGVyJztcbi8vIGV4cG9ydCBjb25zdCBDT0RFX1JFVFVSTiA9ICdFbnRlcic7XG4vLyBleHBvcnQgY29uc3QgQ09ERV9TSElGVF9MRUZUID0gJ1NoaWZ0TGVmdCc7XG4vLyBleHBvcnQgY29uc3QgQ09ERV9TSElGVF9SSUdIVCA9ICdTaGlmdFJpZ2h0Jztcbi8vIGV4cG9ydCBjb25zdCBDT0RFX0NPTlRST0xfTEVGVCA9ICdDb250cm9sTGVmdCc7XG4vLyBleHBvcnQgY29uc3QgQ09ERV9DT05UUk9MX1JJR0hUID0gJ0NvbnRyb2xSaWdodCc7XG4vLyBleHBvcnQgY29uc3QgQ09ERV9BTFRfTEVGVCA9ICdBbHRMZWZ0Jztcbi8vIGV4cG9ydCBjb25zdCBDT0RFX0FMVF9SSUdIVCA9ICdBbHRSaWdodCc7XG4vLyBleHBvcnQgY29uc3QgQ09ERV9QQVVTRSA9ICdQYXVzZSc7XG4vLyBleHBvcnQgY29uc3QgQ09ERV9DQVBTX0xPQ0sgPSAnQ2Fwc0xvY2snO1xuLy8gZXhwb3J0IGNvbnN0IENPREVfU1BBQ0UgPSAnU3BhY2UnO1xuLy8gZXhwb3J0IGNvbnN0IENPREVfUEFHRV9VUCA9ICdQYWdlVXAnO1xuLy8gZXhwb3J0IGNvbnN0IENPREVfUEFHRV9ET1dOID0gJ1BhZ2VEb3duJztcbi8vIGV4cG9ydCBjb25zdCBDT0RFX0VORCA9ICdFbmQnO1xuLy8gZXhwb3J0IGNvbnN0IENPREVfSE9NRSA9ICdIb21lJztcbi8vIGV4cG9ydCBjb25zdCBDT0RFX0xFRlQgPSAnQXJyb3dMZWZ0Jztcbi8vIGV4cG9ydCBjb25zdCBDT0RFX1VQID0gJ0Fycm93VXAnO1xuLy8gZXhwb3J0IGNvbnN0IENPREVfUklHSFQgPSAnQXJyb3dSaWdodCc7XG4vLyBleHBvcnQgY29uc3QgQ09ERV9ET1dOID0gJ0Fycm93RG93bic7XG4vLyBleHBvcnQgY29uc3QgQ09ERV9QUklOVFNDUkVFTiA9ICdQcmludFNjcmVlbic7XG4vLyBleHBvcnQgY29uc3QgQ09ERV9JTlNFUlQgPSAnSW5zZXJ0Jztcbi8vIGV4cG9ydCBjb25zdCBDT0RFX0RFTEVURSA9ICdEZWxldGUnO1xuLy8gZXhwb3J0IGNvbnN0IENPREVfMCA9ICdEaWdpdDAnO1xuLy8gZXhwb3J0IGNvbnN0IENPREVfMSA9ICdEaWdpdDEnO1xuLy8gZXhwb3J0IGNvbnN0IENPREVfMiA9ICdEaWdpdDInO1xuLy8gZXhwb3J0IGNvbnN0IENPREVfMyA9ICdEaWdpdDMnO1xuLy8gZXhwb3J0IGNvbnN0IENPREVfNCA9ICdEaWdpdDQnO1xuLy8gZXhwb3J0IGNvbnN0IENPREVfNSA9ICdEaWdpdDUnO1xuLy8gZXhwb3J0IGNvbnN0IENPREVfNiA9ICdEaWdpdDYnO1xuLy8gZXhwb3J0IGNvbnN0IENPREVfNyA9ICdEaWdpdDcnO1xuLy8gZXhwb3J0IGNvbnN0IENPREVfOCA9ICdEaWdpdDgnO1xuLy8gZXhwb3J0IGNvbnN0IENPREVfOSA9ICdEaWdpdDknO1xuLy8gZXhwb3J0IGNvbnN0IENPREVfQSA9ICdLZXlBJztcbi8vIGV4cG9ydCBjb25zdCBDT0RFX0IgPSAnS2V5Qic7XG4vLyBleHBvcnQgY29uc3QgQ09ERV9DID0gJ0tleUMnO1xuLy8gZXhwb3J0IGNvbnN0IENPREVfRCA9ICdLZXlEJztcbi8vIGV4cG9ydCBjb25zdCBDT0RFX0UgPSAnS2V5RSc7XG4vLyBleHBvcnQgY29uc3QgQ09ERV9GID0gJ0tleUYnO1xuLy8gZXhwb3J0IGNvbnN0IENPREVfRyA9ICdLZXlHJztcbi8vIGV4cG9ydCBjb25zdCBDT0RFX0ggPSAnS2V5SCc7XG4vLyBleHBvcnQgY29uc3QgQ09ERV9JID0gJ0tleUknO1xuLy8gZXhwb3J0IGNvbnN0IENPREVfSiA9ICdLZXlKJztcbi8vIGV4cG9ydCBjb25zdCBDT0RFX0sgPSAnS2V5Syc7XG4vLyBleHBvcnQgY29uc3QgQ09ERV9MID0gJ0tleUwnO1xuLy8gZXhwb3J0IGNvbnN0IENPREVfTSA9ICdLZXlNJztcbi8vIGV4cG9ydCBjb25zdCBDT0RFX04gPSAnS2V5Tic7XG4vLyBleHBvcnQgY29uc3QgQ09ERV9PID0gJ0tleU8nO1xuLy8gZXhwb3J0IGNvbnN0IENPREVfUCA9ICdLZXlQJztcbi8vIGV4cG9ydCBjb25zdCBDT0RFX1EgPSAnS2V5USc7XG4vLyBleHBvcnQgY29uc3QgQ09ERV9SID0gJ0tleVInO1xuLy8gZXhwb3J0IGNvbnN0IENPREVfUyA9ICdLZXlTJztcbi8vIGV4cG9ydCBjb25zdCBDT0RFX1QgPSAnS2V5VCc7XG4vLyBleHBvcnQgY29uc3QgQ09ERV9VID0gJ0tleVUnO1xuLy8gZXhwb3J0IGNvbnN0IENPREVfViA9ICdLZXlWJztcbi8vIGV4cG9ydCBjb25zdCBDT0RFX1cgPSAnS2V5Vyc7XG4vLyBleHBvcnQgY29uc3QgQ09ERV9YID0gJ0tleVgnO1xuLy8gZXhwb3J0IGNvbnN0IENPREVfWSA9ICdLZXlZJztcbi8vIGV4cG9ydCBjb25zdCBDT0RFX1ogPSAnS2V5Wic7XG4vLyBleHBvcnQgY29uc3QgQ09ERV9NRVRBX0xFRlQgPSAnTWV0YUxlZnQnO1xuLy8gZXhwb3J0IGNvbnN0IENPREVfT1NfTEVGVCA9ICdPU0xlZnQnO1xuLy8gZXhwb3J0IGNvbnN0IENPREVfTUVUQV9SSUdIVCA9ICdNZXRhUmlnaHQnO1xuLy8gZXhwb3J0IGNvbnN0IENPREVfT1NfUklHSFQgPSAnT1NSaWdodCc7XG4vLyBleHBvcnQgY29uc3QgQ09ERV9DT05URVhUX01FTlUgPSAnQ29udGV4dE1lbnUnO1xuLy8gZXhwb3J0IGNvbnN0IENPREVfTlVNUEFEMCA9ICdOdW1wYWQwJztcbi8vIGV4cG9ydCBjb25zdCBDT0RFX05VTVBBRDEgPSAnTnVtcGFkMSc7XG4vLyBleHBvcnQgY29uc3QgQ09ERV9OVU1QQUQyID0gJ051bXBhZDInO1xuLy8gZXhwb3J0IGNvbnN0IENPREVfTlVNUEFEMyA9ICdOdW1wYWQzJztcbi8vIGV4cG9ydCBjb25zdCBDT0RFX05VTVBBRDQgPSAnTnVtcGFkNCc7XG4vLyBleHBvcnQgY29uc3QgQ09ERV9OVU1QQUQ1ID0gJ051bXBhZDUnO1xuLy8gZXhwb3J0IGNvbnN0IENPREVfTlVNUEFENiA9ICdOdW1wYWQ2Jztcbi8vIGV4cG9ydCBjb25zdCBDT0RFX05VTVBBRDcgPSAnTnVtcGFkNyc7XG4vLyBleHBvcnQgY29uc3QgQ09ERV9OVU1QQUQ4ID0gJ051bXBhZDgnO1xuLy8gZXhwb3J0IGNvbnN0IENPREVfTlVNUEFEOSA9ICdOdW1wYWQ5Jztcbi8vIGV4cG9ydCBjb25zdCBDT0RFX05VTVBBRF9NVUxUSVBMWSA9ICdOdW1wYWRNdWx0aXBseSc7XG4vLyBleHBvcnQgY29uc3QgQ09ERV9OVU1QQURfQUREID0gJ051bXBhZEFkZCc7XG4vLyBleHBvcnQgY29uc3QgQ09ERV9OVU1QQURfU1VCVFJBQ1QgPSAnTnVtcGFkU3VidHJhY3QnO1xuLy8gZXhwb3J0IGNvbnN0IENPREVfTlVNUEFEX0RFQ0lNQUwgPSAnTnVtcGFkRGVjaW1hbCc7XG4vLyBleHBvcnQgY29uc3QgQ09ERV9OVU1QQURfRElWSURFID0gJ051bXBhZERpdmlkZSc7XG4vLyBleHBvcnQgY29uc3QgQ09ERV9OVU1QQURfRU5URVIgPSAnTnVtcGFkRW50ZXInO1xuLy8gZXhwb3J0IGNvbnN0IENPREVfRjEgPSAnRjEnO1xuLy8gZXhwb3J0IGNvbnN0IENPREVfRjIgPSAnRjInO1xuLy8gZXhwb3J0IGNvbnN0IENPREVfRjMgPSAnRjMnO1xuLy8gZXhwb3J0IGNvbnN0IENPREVfRjQgPSAnRjQnO1xuLy8gZXhwb3J0IGNvbnN0IENPREVfRjUgPSAnRjUnO1xuLy8gZXhwb3J0IGNvbnN0IENPREVfRjYgPSAnRjYnO1xuLy8gZXhwb3J0IGNvbnN0IENPREVfRjcgPSAnRjcnO1xuLy8gZXhwb3J0IGNvbnN0IENPREVfRjggPSAnRjgnO1xuLy8gZXhwb3J0IGNvbnN0IENPREVfRjkgPSAnRjknO1xuLy8gZXhwb3J0IGNvbnN0IENPREVfRjEwID0gJ0YxMCc7XG4vLyBleHBvcnQgY29uc3QgQ09ERV9GMTEgPSAnRjExJztcbi8vIGV4cG9ydCBjb25zdCBDT0RFX0YxMiA9ICdGMTInO1xuLy8gZXhwb3J0IGNvbnN0IENPREVfRjEzID0gJ0YxMyc7XG4vLyBleHBvcnQgY29uc3QgQ09ERV9GMTQgPSAnRjE0Jztcbi8vIGV4cG9ydCBjb25zdCBDT0RFX0YxNSA9ICdGMTUnO1xuLy8gZXhwb3J0IGNvbnN0IENPREVfRjE2ID0gJ0YxNic7XG4vLyBleHBvcnQgY29uc3QgQ09ERV9GMTcgPSAnRjE3Jztcbi8vIGV4cG9ydCBjb25zdCBDT0RFX0YxOCA9ICdGMTgnO1xuLy8gZXhwb3J0IGNvbnN0IENPREVfRjE5ID0gJ0YxOSc7XG4vLyBleHBvcnQgY29uc3QgQ09ERV9GMjAgPSAnRjIwJztcbi8vIGV4cG9ydCBjb25zdCBDT0RFX0YyMSA9ICdGMjEnO1xuLy8gZXhwb3J0IGNvbnN0IENPREVfRjIyID0gJ0YyMic7XG4vLyBleHBvcnQgY29uc3QgQ09ERV9GMjMgPSAnRjIzJztcbi8vIGV4cG9ydCBjb25zdCBDT0RFX0YyNCA9ICdGMjQnO1xuLy8gZXhwb3J0IGNvbnN0IENPREVfTlVNX0xPQ0sgPSAnTnVtTG9jayc7XG4vLyBleHBvcnQgY29uc3QgQ09ERV9TQ1JPTExfTE9DSyA9ICdTY3JvbGxMb2NrJztcbi8vIGV4cG9ydCBjb25zdCBDT0RFX1NFTUlDT0xPTiA9ICdTZW1pY29sb24nO1xuLy8gZXhwb3J0IGNvbnN0IENPREVfQ09NTUEgPSAnQ29tbWEnO1xuLy8gZXhwb3J0IGNvbnN0IENPREVfUEVSSU9EID0gJ1BlcmlvZCc7XG4vLyBleHBvcnQgY29uc3QgQ09ERV9TTEFTSCA9ICdTbGFzaCc7XG4vLyBleHBvcnQgY29uc3QgQ09ERV9CQUNLX1FVT1RFID0gJ0JhY2txdW90ZSc7XG4vLyBleHBvcnQgY29uc3QgQ09ERV9PUEVOX0JSQUNLRVQgPSAnQnJhY2tldExlZnQnO1xuLy8gZXhwb3J0IGNvbnN0IENPREVfQkFDS19TTEFTSCA9ICdCYWNrc2xhc2gnO1xuLy8gZXhwb3J0IGNvbnN0IENPREVfQ0xPU0VfQlJBQ0tFVCA9ICdCcmFja2V0UmlnaHQnO1xuLy8gZXhwb3J0IGNvbnN0IENPREVfUVVPVEUgPSAnUXVvdGUnO1xuIiwKICAiXG5cbmV4cG9ydCBjbGFzcyBFbnRpdHkge1xuICBwdWJsaWMgY2xpZW50SWQ6IHN0cmluZztcbiAgcHVibGljIHBvc1ghOiBudW1iZXI7XG4gIHB1YmxpYyBwb3NZITogbnVtYmVyO1xuICBwdWJsaWMgc3BlZWRYITogbnVtYmVyO1xuICBwdWJsaWMgc3BlZWRZITogbnVtYmVyO1xuXG4gIGNvbnN0cnVjdG9yKFxuICAgIGNsaWVudElkOiBzdHJpbmcsXG4gICAgcG9zWDogbnVtYmVyLFxuICAgIHBvc1k6IG51bWJlcixcbiAgKSB7XG4gICAgdGhpcy5jbGllbnRJZCA9IGNsaWVudElkO1xuICAgIHRoaXMucmVzZXQocG9zWCwgcG9zWSk7XG4gIH1cblxuICByZXNldChwb3NYOiBudW1iZXIsIHBvc1k6IG51bWJlcikge1xuICAgIHRoaXMucG9zWCA9IHBvc1g7XG4gICAgdGhpcy5wb3NZID0gcG9zWTtcbiAgICB0aGlzLnNwZWVkWCA9IDA7XG4gICAgdGhpcy5zcGVlZFkgPSAwO1xuICB9XG5cbiAgc2V0U3BlZWRYKHNwZWVkWDogbnVtYmVyKSB7XG4gICAgdGhpcy5zcGVlZFggPSBzcGVlZFg7XG4gIH1cbiAgc2V0U3BlZWRZKHNwZWVkWTogbnVtYmVyKSB7XG4gICAgdGhpcy5zcGVlZFkgPSBzcGVlZFk7XG4gIH1cblxuICB1cGRhdGUoZWxhcHNlZFRpbWU6IG51bWJlcikge1xuICAgIHRoaXMucG9zWCArPSB0aGlzLnNwZWVkWCAqIGVsYXBzZWRUaW1lO1xuICAgIHRoaXMucG9zWSArPSB0aGlzLnNwZWVkWSAqIGVsYXBzZWRUaW1lO1xuICB9XG59XG5cbmV4cG9ydCBjbGFzcyBFbnRpdGllc01hbmFnZXIge1xuXG4gIHByaXZhdGUgX2FsbEVudGl0aWVzOiBFbnRpdHlbXSA9IFtdO1xuXG4gIGNvbnN0cnVjdG9yKCkge1xuICB9XG5cbiAgZW5zdXJlRW50aXR5KGNsaWVudElkOiBzdHJpbmcsIHBvc1g6IG51bWJlciwgcG9zWTogbnVtYmVyKTogUmVhZG9ubHk8RW50aXR5PiB7XG4gICAgbGV0IGV4aXN0aW5nID0gdGhpcy5maW5kRW50aXR5KGNsaWVudElkKTtcbiAgICBpZiAoZXhpc3RpbmcpIHtcbiAgICAgIGV4aXN0aW5nLnJlc2V0KHBvc1gsIHBvc1kpO1xuICAgIH0gZWxzZSB7XG4gICAgICBleGlzdGluZyA9IG5ldyBFbnRpdHkoY2xpZW50SWQsIHBvc1gsIHBvc1kpXG4gICAgICB0aGlzLl9hbGxFbnRpdGllcy5wdXNoKGV4aXN0aW5nKTtcbiAgICB9XG4gICAgcmV0dXJuIGV4aXN0aW5nO1xuICB9XG5cbiAgcmVtb3ZlRW50aXR5KGNsaWVudElkOiBzdHJpbmcpOiB2b2lkIHtcbiAgICBjb25zdCBpbmRleCA9IHRoaXMuX2FsbEVudGl0aWVzLmZpbmRJbmRleCgodmFsKSA9PiB2YWwuY2xpZW50SWQgPT09IGNsaWVudElkKTtcbiAgICBpZiAoaW5kZXggPj0gMCkge1xuICAgICAgdGhpcy5fYWxsRW50aXRpZXMuc3BsaWNlKGluZGV4LCAxKTtcbiAgICB9XG4gIH1cblxuICBmaW5kRW50aXR5KGNsaWVudElkOiBzdHJpbmcpOiBSZWFkb25seTxFbnRpdHk+IHwgdW5kZWZpbmVkIHtcbiAgICBjb25zdCBpbmRleCA9IHRoaXMuX2FsbEVudGl0aWVzLmZpbmRJbmRleCgodmFsKSA9PiB2YWwuY2xpZW50SWQgPT09IGNsaWVudElkKTtcbiAgICBpZiAoaW5kZXggPj0gMCkge1xuICAgICAgcmV0dXJuIHRoaXMuX2FsbEVudGl0aWVzW2luZGV4XTtcbiAgICB9XG4gIH1cblxuICBnZXQgZW50aXRpZXMoKTogUmVhZG9ubHlBcnJheTxSZWFkb25seTxFbnRpdHk+PiB7XG4gICAgcmV0dXJuIHRoaXMuX2FsbEVudGl0aWVzO1xuICB9XG5cbn1cbiIsCiAgImltcG9ydCB7IElNZXNzYWdlIH0gZnJvbSBcIi4uLy4uLy4uL2NvbW1vbi9tZXNzYWdlc1wiO1xuXG5lbnVtIENvbm5lY3Rpb25TdGF0dXMge1xuICBkaXNjb25uZWN0ZWQgPSAnZGlzY29ubmVjdGVkJyxcbiAgY29ubmVjdGVkID0gJ2Nvbm5lY3RlZCcsXG4gIGNvbm5lY3RpbmcgPSAnY29ubmVjdGluZydcbn1cblxuaW50ZXJmYWNlIElKc29uTWVzc2FnZXNXZWJTb2NrZXQge1xuICBjb25uZWN0KGhvc3Q6IHN0cmluZywgcG9ydDogbnVtYmVyKTogdm9pZDtcbiAgZGlzY29ubmVjdCgpOiB2b2lkO1xuXG4gIGlzQ29ubmVjdGVkKCk6IGJvb2xlYW47XG5cbiAgLy8gb25Db25uZWN0KGNhbGxiYWNrOiAoKSA9PiB2b2lkKTogdm9pZDtcbiAgb25EaXNjb25uZWN0KGNhbGxiYWNrOiAoaGFzRXJyb3JlZDogYm9vbGVhbikgPT4gdm9pZCk6IHZvaWQ7XG4gIG9uTWVzc2FnZShjYWxsYmFjazogKG1zZzogSU1lc3NhZ2UpID0+IHZvaWQpOiB2b2lkO1xuXG4gIHNlbmQobWVzc2FnZTogSU1lc3NhZ2UpOiB2b2lkO1xufVxuXG5leHBvcnQgY2xhc3MgSnNvbk1lc3NhZ2VzV2ViU29ja2V0IGltcGxlbWVudHMgSUpzb25NZXNzYWdlc1dlYlNvY2tldCB7XG4gIHByaXZhdGUgX2Nvbm5lY3Rpb25TdGF0dXM6IENvbm5lY3Rpb25TdGF0dXMgPSBDb25uZWN0aW9uU3RhdHVzLmRpc2Nvbm5lY3RlZDtcbiAgcHJpdmF0ZSBfd2ViU29ja2V0ITogV2ViU29ja2V0O1xuXG4gIC8vIHByaXZhdGUgX29uQ29ubmVjdD86ICgpID0+IHZvaWQ7XG4gIHByaXZhdGUgX29uRGlzY29ubmVjdD86IChoYXNFcnJvcmVkOiBib29sZWFuKSA9PiB2b2lkO1xuICBwcml2YXRlIF9vbk1lc3NhZ2U/OiAobXNnOiBJTWVzc2FnZSkgPT4gdm9pZDtcblxuICBhc3luYyBjb25uZWN0KGhvc3Q6IHN0cmluZywgcG9ydDogbnVtYmVyKSB7XG4gICAgaWYgKHRoaXMuX2Nvbm5lY3Rpb25TdGF0dXMgIT09IENvbm5lY3Rpb25TdGF0dXMuZGlzY29ubmVjdGVkKSB7XG4gICAgICB0aHJvdyBuZXcgRXJyb3IoYGNhbiBvbmx5IGNvbm5lY3Qgd2hlbiBkaXNjb25uZWN0ZWRgKTtcbiAgICB9XG5cbiAgICB0aGlzLl9jb25uZWN0aW9uU3RhdHVzID0gQ29ubmVjdGlvblN0YXR1cy5jb25uZWN0aW5nO1xuXG4gICAgYXdhaXQgbmV3IFByb21pc2U8dm9pZD4oKHJlc29sdmUsIHJlamVjdCkgPT4ge1xuXG4gICAgICB0aGlzLl93ZWJTb2NrZXQgPSBuZXcgV2ViU29ja2V0KGB3czovLyR7aG9zdH06JHtwb3J0fWApO1xuXG4gICAgICBjb25zdCBvbk9wZW4gPSAoKSA9PiB7XG4gICAgICAgIGNvbnNvbGUubG9nKGB3ZWJzb2NrZXQ6IGlzIG9wZW5gKTtcbiAgICAgICAgdGhpcy5fd2ViU29ja2V0LnJlbW92ZUV2ZW50TGlzdGVuZXIoJ29wZW4nLCBvbk9wZW4pO1xuICAgICAgICB0aGlzLl93ZWJTb2NrZXQucmVtb3ZlRXZlbnRMaXN0ZW5lcignZXJyb3InLCBvbkVycm9yKTtcbiAgICAgICAgdGhpcy5fY29ubmVjdGlvblN0YXR1cyA9IENvbm5lY3Rpb25TdGF0dXMuY29ubmVjdGVkO1xuICAgICAgICByZXNvbHZlKCk7XG4gICAgICB9O1xuXG4gICAgICBjb25zdCBvbkVycm9yID0gKGVycjogYW55KSA9PiB7XG4gICAgICAgIGNvbnNvbGUubG9nKGB3ZWJzb2NrZXQ6IGVycm9yICR7ZXJyPy5tZXNzYWdlfWApO1xuICAgICAgICB0aGlzLl93ZWJTb2NrZXQucmVtb3ZlRXZlbnRMaXN0ZW5lcignb3BlbicsIG9uT3Blbik7XG4gICAgICAgIHRoaXMuX3dlYlNvY2tldC5yZW1vdmVFdmVudExpc3RlbmVyKCdlcnJvcicsIG9uRXJyb3IpO1xuICAgICAgICB0aGlzLl9jb25uZWN0aW9uU3RhdHVzID0gQ29ubmVjdGlvblN0YXR1cy5kaXNjb25uZWN0ZWQ7XG4gICAgICAgIHJlamVjdCgpO1xuICAgICAgfTtcblxuICAgICAgdGhpcy5fd2ViU29ja2V0LmFkZEV2ZW50TGlzdGVuZXIoJ29wZW4nLCBvbk9wZW4pO1xuICAgICAgdGhpcy5fd2ViU29ja2V0LmFkZEV2ZW50TGlzdGVuZXIoJ2Vycm9yJywgb25FcnJvcik7XG4gICAgfSk7XG5cbiAgICBjb25zdCBvbk1lc3NhZ2UgPSAobWVzc2FnZTogTWVzc2FnZUV2ZW50PGFueT4pID0+IHtcbiAgICAgIGNvbnN0IGRhdGEgPSBKU09OLnBhcnNlKG1lc3NhZ2UuZGF0YSk7XG4gICAgICBpZiAodGhpcy5fb25NZXNzYWdlKSB7XG4gICAgICAgIHRoaXMuX29uTWVzc2FnZShkYXRhKTtcbiAgICAgIH1cbiAgICB9O1xuXG4gICAgY29uc3Qgb25FcnJvciA9IChlcnI6IGFueSkgPT4ge1xuICAgICAgY29uc29sZS5sb2coYHdlYnNvY2tldDogZXJyb3IgJHtlcnI/Lm1lc3NhZ2V9YCk7XG4gICAgICB0aGlzLl93ZWJTb2NrZXQucmVtb3ZlRXZlbnRMaXN0ZW5lcignbWVzc2FnZScsIG9uTWVzc2FnZSk7XG4gICAgICB0aGlzLl93ZWJTb2NrZXQucmVtb3ZlRXZlbnRMaXN0ZW5lcignY2xvc2UnLCBvbkNsb3NlKTtcbiAgICAgIHRoaXMuX3dlYlNvY2tldC5yZW1vdmVFdmVudExpc3RlbmVyKCdlcnJvcicsIG9uRXJyb3IpO1xuICAgICAgdGhpcy5fY29ubmVjdGlvblN0YXR1cyA9IENvbm5lY3Rpb25TdGF0dXMuZGlzY29ubmVjdGVkO1xuICAgICAgaWYgKHRoaXMuX29uRGlzY29ubmVjdCkge1xuICAgICAgICB0aGlzLl9vbkRpc2Nvbm5lY3QodHJ1ZSk7XG4gICAgICB9XG4gICAgfTtcblxuICAgIGNvbnN0IG9uQ2xvc2UgPSAoKSA9PiB7XG4gICAgICBjb25zb2xlLmxvZyhgd2Vic29ja2V0OiBjbG9zZWApO1xuICAgICAgdGhpcy5fd2ViU29ja2V0LnJlbW92ZUV2ZW50TGlzdGVuZXIoJ21lc3NhZ2UnLCBvbk1lc3NhZ2UpO1xuICAgICAgdGhpcy5fd2ViU29ja2V0LnJlbW92ZUV2ZW50TGlzdGVuZXIoJ2Nsb3NlJywgb25DbG9zZSk7XG4gICAgICB0aGlzLl93ZWJTb2NrZXQucmVtb3ZlRXZlbnRMaXN0ZW5lcignZXJyb3InLCBvbkVycm9yKTtcbiAgICAgIHRoaXMuX2Nvbm5lY3Rpb25TdGF0dXMgPSBDb25uZWN0aW9uU3RhdHVzLmRpc2Nvbm5lY3RlZDtcbiAgICAgIGlmICh0aGlzLl9vbkRpc2Nvbm5lY3QpIHtcbiAgICAgICAgdGhpcy5fb25EaXNjb25uZWN0KGZhbHNlKTtcbiAgICAgIH1cbiAgICB9O1xuXG4gICAgdGhpcy5fd2ViU29ja2V0LmFkZEV2ZW50TGlzdGVuZXIoJ21lc3NhZ2UnLCBvbk1lc3NhZ2UpO1xuICAgIHRoaXMuX3dlYlNvY2tldC5hZGRFdmVudExpc3RlbmVyKCdjbG9zZScsIG9uQ2xvc2UpO1xuICAgIHRoaXMuX3dlYlNvY2tldC5hZGRFdmVudExpc3RlbmVyKCdlcnJvcicsIG9uRXJyb3IpO1xuICB9XG4gIGRpc2Nvbm5lY3QoKSB7XG4gICAgaWYgKHRoaXMuX2Nvbm5lY3Rpb25TdGF0dXMgPT09IENvbm5lY3Rpb25TdGF0dXMuZGlzY29ubmVjdGVkKSB7XG4gICAgICB0aHJvdyBuZXcgRXJyb3IoYGNhbiBvbmx5IGNvbm5lY3Qgd2hlbiBub3QgZGlzY29ubmVjdGVkYCk7XG4gICAgfVxuXG4gICAgdGhpcy5fd2ViU29ja2V0LmNsb3NlKCk7XG5cbiAgICB0aGlzLl9jb25uZWN0aW9uU3RhdHVzID0gQ29ubmVjdGlvblN0YXR1cy5kaXNjb25uZWN0ZWQ7XG4gIH1cblxuICBpc0Nvbm5lY3RlZCgpIHtcbiAgICByZXR1cm4gdGhpcy5fY29ubmVjdGlvblN0YXR1cyA9PT0gQ29ubmVjdGlvblN0YXR1cy5jb25uZWN0ZWQ7XG4gIH1cblxuICAvLyBvbkNvbm5lY3QoY2FsbGJhY2s6ICgpID0+IHZvaWQpIHtcbiAgLy8gICB0aGlzLl9vbkNvbm5lY3QgPSBjYWxsYmFjaztcbiAgLy8gfVxuICBvbkRpc2Nvbm5lY3QoY2FsbGJhY2s6IChoYXNFcnJvcmVkOiBib29sZWFuKSA9PiB2b2lkKSB7XG4gICAgdGhpcy5fb25EaXNjb25uZWN0ID0gY2FsbGJhY2s7XG4gIH1cbiAgb25NZXNzYWdlKGNhbGxiYWNrOiAobXNnOiBJTWVzc2FnZSkgPT4gdm9pZCkge1xuICAgIHRoaXMuX29uTWVzc2FnZSA9IGNhbGxiYWNrO1xuICB9XG5cbiAgc2VuZChtZXNzYWdlOiBJTWVzc2FnZSkge1xuICAgIHRoaXMuX3dlYlNvY2tldC5zZW5kKEpTT04uc3RyaW5naWZ5KG1lc3NhZ2UpKTtcbiAgfVxufVxuIiwKICAiZXhwb3J0IGNsYXNzIENhbnZhc1JlbmRlcmVyIHtcbiAgcHJpdmF0ZSBfY2FudmFzOiBIVE1MQ2FudmFzRWxlbWVudDtcbiAgcHJpdmF0ZSBfY3R4OiBDYW52YXNSZW5kZXJpbmdDb250ZXh0MkQ7XG5cbiAgY29uc3RydWN0b3IoY2FudmFzOiBIVE1MQ2FudmFzRWxlbWVudCkge1xuICAgIHRoaXMuX2NhbnZhcyA9IGNhbnZhcztcbiAgICB0aGlzLl9jdHggPSB0aGlzLl9jYW52YXMuZ2V0Q29udGV4dCgnMmQnKSE7XG4gIH1cblxuICAvL1xuXG4gIGNsZWFyKCkge1xuICAgIC8vIHRoaXMuX2N0eC5jbGVhclJlY3QoMCwwLDgwMCw2MDApO1xuXG4gICAgdGhpcy5fY3R4LmZpbGxTdHlsZSA9ICdibGFjayc7XG4gICAgdGhpcy5fY3R4LmZpbGxSZWN0KDAsIDAsIDgwMCwgNjQwKTtcbiAgfVxuXG4gIC8vXG5cbiAgZHJhd0xpbmUoeDE6IG51bWJlciwgeTE6IG51bWJlciwgeDI6IG51bWJlciwgeTI6IG51bWJlciwgY29sb3I6IHN0cmluZykge1xuICAgIHRoaXMuX2N0eC5zdHJva2VTdHlsZSA9IGNvbG9yO1xuICAgIHRoaXMuX2N0eC5saW5lV2lkdGggPSAxO1xuICAgIHRoaXMuX2N0eC5iZWdpblBhdGgoKTtcbiAgICB0aGlzLl9jdHgubW92ZVRvKHgxLCB5MSk7XG4gICAgdGhpcy5fY3R4LmxpbmVUbyh4MiwgeTIpO1xuICAgIHRoaXMuX2N0eC5zdHJva2UoKTtcbiAgfVxuXG4gIC8vXG5cbiAgZHJhd1RoaWNrTGluZSh4MTogbnVtYmVyLCB5MTogbnVtYmVyLCB4MjogbnVtYmVyLCB5MjogbnVtYmVyLCBjb2xvcjogc3RyaW5nKSB7XG4gICAgdGhpcy5fY3R4LnN0cm9rZVN0eWxlID0gY29sb3I7XG4gICAgdGhpcy5fY3R4LmxpbmVXaWR0aCA9IDQ7XG4gICAgdGhpcy5fY3R4LmJlZ2luUGF0aCgpO1xuICAgIHRoaXMuX2N0eC5tb3ZlVG8oeDEsIHkxKTtcbiAgICB0aGlzLl9jdHgubGluZVRvKHgyLCB5Mik7XG4gICAgdGhpcy5fY3R4LnN0cm9rZSgpO1xuICB9XG5cbiAgLy9cblxuICBkcmF3TGluZVN0cmlwKGxpbmVzOiBbbnVtYmVyLCBudW1iZXJdW10sIGNvbG9yOiBzdHJpbmcpIHtcbiAgICB0aGlzLl9jdHguc3Ryb2tlU3R5bGUgPSBjb2xvcjtcbiAgICB0aGlzLl9jdHgubGluZVdpZHRoID0gMTtcbiAgICB0aGlzLl9jdHguYmVnaW5QYXRoKCk7XG5cbiAgICB0aGlzLl9jdHgubW92ZVRvKGxpbmVzWzBdWzBdLCBsaW5lc1swXVsxXSk7XG4gICAgZm9yICh2YXIgaSA9IDE7IGkgPCBsaW5lcy5sZW5ndGg7ICsraSlcbiAgICAgIHRoaXMuX2N0eC5saW5lVG8obGluZXNbaV1bMF0sIGxpbmVzW2ldWzFdKTtcblxuICAgIHRoaXMuX2N0eC5zdHJva2UoKTtcbiAgfVxuXG5cdGRyYXdMaW5lTG9vcChsaW5lczogW251bWJlciwgbnVtYmVyXVtdLCBjb2xvcjogc3RyaW5nKSB7XG4gICAgdGhpcy5fY3R4LnN0cm9rZVN0eWxlID0gY29sb3I7XG4gICAgdGhpcy5fY3R4LmxpbmVXaWR0aCA9IDE7XG4gICAgdGhpcy5fY3R4LmJlZ2luUGF0aCgpO1xuXG4gICAgdGhpcy5fY3R4Lm1vdmVUbyhsaW5lc1swXVswXSwgbGluZXNbMF1bMV0pO1xuICAgIGZvciAodmFyIGkgPSAxOyBpIDwgbGluZXMubGVuZ3RoOyArK2kpXG4gICAgICB0aGlzLl9jdHgubGluZVRvKGxpbmVzW2ldWzBdLCBsaW5lc1tpXVsxXSk7XG5cdFx0dGhpcy5fY3R4LmxpbmVUbyhsaW5lc1swXVswXSwgbGluZXNbMF1bMV0pO1xuXG4gICAgdGhpcy5fY3R4LnN0cm9rZSgpO1xuICB9XG5cbiAgLy9cblxuICBkcmF3TGluZXMobGluZXM6IFtbbnVtYmVyLCBudW1iZXJdLCBbbnVtYmVyLCBudW1iZXJdXVtdLCBjb2xvcjogc3RyaW5nKSB7XG4gICAgdGhpcy5fY3R4LnN0cm9rZVN0eWxlID0gY29sb3I7XG4gICAgdGhpcy5fY3R4LmxpbmVXaWR0aCA9IDE7XG4gICAgdGhpcy5fY3R4LmJlZ2luUGF0aCgpO1xuXG4gICAgZm9yICh2YXIgaSA9IDA7IGkgPCBsaW5lcy5sZW5ndGg7ICsraSkge1xuICAgICAgdGhpcy5fY3R4Lm1vdmVUbyhsaW5lc1tpXVswXVswXSwgbGluZXNbaV1bMF1bMV0pO1xuICAgICAgdGhpcy5fY3R4LmxpbmVUbyhsaW5lc1tpXVsxXVswXSwgbGluZXNbaV1bMV1bMV0pO1xuICAgIH1cblxuICAgIHRoaXMuX2N0eC5zdHJva2UoKTtcbiAgfVxuXG4gIC8vXG5cbiAgZHJhd1BvaW50KHg6IG51bWJlciwgeTogbnVtYmVyLCBzaXplOiBudW1iZXIsIGNvbG9yOiBzdHJpbmcpIHtcbiAgICB0aGlzLmRyYXdMaW5lKHggLSBzaXplLCB5IC0gc2l6ZSwgeCArIHNpemUsIHkgKyBzaXplLCBjb2xvcik7XG4gICAgdGhpcy5kcmF3TGluZSh4IC0gc2l6ZSwgeSArIHNpemUsIHggKyBzaXplLCB5IC0gc2l6ZSwgY29sb3IpO1xuICB9XG5cbiAgLy9cblxuICBkcmF3U3F1YXJlKHg6IG51bWJlciwgeTogbnVtYmVyLCBzaXplOiBudW1iZXIsIGNvbG9yOiBzdHJpbmcpIHtcbiAgICB0aGlzLl9jdHguZmlsbFN0eWxlID0gY29sb3I7XG4gICAgdGhpcy5fY3R4LmJlZ2luUGF0aCgpO1xuICAgIHRoaXMuX2N0eC5yZWN0KHgsIHksIHNpemUsIHNpemUpO1xuICAgIHRoaXMuX2N0eC5maWxsKCk7XG4gIH1cblxuICAvL1xuXG4gIGRyYXdUZXh0KHg6IG51bWJlciwgeTogbnVtYmVyLCB0ZXh0OiBzdHJpbmcsIGNvbG9yOiBzdHJpbmcpIHtcbiAgICB0aGlzLl9jdHguZmlsbFN0eWxlID0gY29sb3I7XG4gICAgdGhpcy5fY3R4LmZvbnQgPSAnMTVweCBzZXJpZic7XG4gICAgdGhpcy5fY3R4LmZpbGxUZXh0KHRleHQsIHgsIHkpO1xuICB9XG5cbiAgZ2V0Q2FudmFzKCkge1xuICAgIHJldHVybiB0aGlzLl9jYW52YXM7XG4gIH1cblxuICBnZXRDb250ZXh0KCkge1xuICAgIHJldHVybiB0aGlzLl9jdHg7XG4gIH1cbn1cbiIsCiAgImltcG9ydCB7IEtleWJvYXJkSGFuZGxlciwga2V5cyB9IGZyb20gJy4vbG9naWMva2V5Ym9hcmQnO1xuaW1wb3J0IHsgRW50aXRpZXNNYW5hZ2VyIH0gZnJvbSAnLi9sb2dpYy9lbnRpdGllcy9FbnRpdGllc01hbmFnZXInO1xuaW1wb3J0IHsgSnNvbk1lc3NhZ2VzV2ViU29ja2V0IH0gZnJvbSAnLi9uZXR3b3JrL0pzb25NZXNzYWdlc1dlYlNvY2tldCc7XG5pbXBvcnQgeyBDYW52YXNSZW5kZXJlciB9IGZyb20gJy4vZ3JhcGhpYy9DYW52YXNSZW5kZXJlcic7XG5pbXBvcnQgeyBhbGxLZXlzIH0gZnJvbSAnLi9sb2dpYy9rZXlib2FyZC9rZXlzJztcblxuZXhwb3J0IGNsYXNzIFdlYkFwcGxpY2F0aW9uIHtcbiAgcHJpdmF0ZSBfbG9nZ2VyT3V0cHV0OiBIVE1MVGV4dEFyZWFFbGVtZW50O1xuXG4gIHByaXZhdGUgX3dlYlNvY2tldCE6IEpzb25NZXNzYWdlc1dlYlNvY2tldDtcbiAgcHJpdmF0ZSBfa2V5Ym9hcmRIYW5kbGVyID0gbmV3IEtleWJvYXJkSGFuZGxlcigpO1xuICBwcml2YXRlIF9jYW52YXNSZW5kZXJlcjogQ2FudmFzUmVuZGVyZXI7XG5cbiAgcHJpdmF0ZSBfY2xpZW50SWQ6IHN0cmluZyA9IFwiLTFcIjtcbiAgcHJpdmF0ZSBfZW50aXRpZXNNYW5hZ2VyID0gbmV3IEVudGl0aWVzTWFuYWdlcigpO1xuXG4gIGNvbnN0cnVjdG9yKGNhbnZhczogSFRNTENhbnZhc0VsZW1lbnQsIGxvZ2dlck91dHB1dDogSFRNTFRleHRBcmVhRWxlbWVudCkge1xuICAgIHRoaXMuX2NhbnZhc1JlbmRlcmVyID0gbmV3IENhbnZhc1JlbmRlcmVyKGNhbnZhcyk7XG5cbiAgICB0aGlzLl9sb2dnZXJPdXRwdXQgPSBsb2dnZXJPdXRwdXQ7XG4gICAgdGhpcy5fbG9nZ2VyT3V0cHV0LnZhbHVlID0gJyc7IC8vIHJlc2V0IGJyb3dzZXIgY2FjaGVcbiAgfVxuXG4gIGFzeW5jIGluaXRpYWxpemUoKTogUHJvbWlzZTx2b2lkPiB7XG4gICAgLy8gZmV0Y2ggd2Vic29ja2V0IGNvbmZpZyBmcm9tIHNlcnZlciAoR0VUKVxuICAgIGNvbnN0IHJlc3BvbnNlID0gYXdhaXQgZmV0Y2goYC93cy1jb25maWdgKTtcbiAgICBjb25zdCB3c0NvbmZpZyA9IGF3YWl0IHJlc3BvbnNlLmpzb24oKTtcblxuICAgIHRoaXMuX3dlYlNvY2tldCA9IG5ldyBKc29uTWVzc2FnZXNXZWJTb2NrZXQoKTtcblxuICAgIHRoaXMuX3dlYlNvY2tldC5vbkRpc2Nvbm5lY3QoKCkgPT4ge1xuICAgICAgdGhpcy5fbG9nKGBpcyBkaXNjb25uZWN0ZWRgKTtcbiAgICB9KTtcblxuICAgIHRoaXMuX3dlYlNvY2tldC5vbk1lc3NhZ2UoKGRhdGEpID0+IHtcbiAgICAgIHN3aXRjaCAoZGF0YS50eXBlKSB7XG4gICAgICAgIGNhc2UgJ21lc3NhZ2UnOiB7XG4gICAgICAgICAgdGhpcy5fbG9nKGByZWNlaXZlZCBtZXNzYWdlOiBcIiR7ZGF0YS52YWx1ZX1cImApO1xuICAgICAgICAgIGJyZWFrO1xuICAgICAgICB9XG4gICAgICAgIGNhc2UgJ3doby1hbS1JJzoge1xuICAgICAgICAgIHRoaXMuX2xvZyhgcmVjZWl2ZWQgd2hvLWFtLUk6IFwiJHtkYXRhLnZhbHVlfVwiYCk7XG4gICAgICAgICAgdGhpcy5fY2xpZW50SWQgPSBkYXRhLnZhbHVlO1xuICAgICAgICAgIGNvbnN0IG15RW50aXR5ID0gdGhpcy5fZW50aXRpZXNNYW5hZ2VyLmVuc3VyZUVudGl0eSh0aGlzLl9jbGllbnRJZCwgNDAwLCAzMDApO1xuICAgICAgICAgIHRoaXMuX3dlYlNvY2tldC5zZW5kKHtcbiAgICAgICAgICAgIHR5cGU6ICdtb3ZlJyxcbiAgICAgICAgICAgIHZhbHVlOiBbXG4gICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICBjbGllbnRJZDogbXlFbnRpdHkuY2xpZW50SWQsXG4gICAgICAgICAgICAgICAgcG9zWDogbXlFbnRpdHkucG9zWCxcbiAgICAgICAgICAgICAgICBwb3NZOiBteUVudGl0eS5wb3NZLFxuICAgICAgICAgICAgICAgIHNwZWVkWDogbXlFbnRpdHkuc3BlZWRYLFxuICAgICAgICAgICAgICAgIHNwZWVkWTogbXlFbnRpdHkuc3BlZWRZLFxuICAgICAgICAgICAgICB9XG4gICAgICAgICAgICBdXG4gICAgICAgICAgfSk7XG4gICAgICAgICAgYnJlYWs7XG4gICAgICAgIH1cbiAgICAgICAgY2FzZSAnd2hvLWFtLUknOiB7XG4gICAgICAgICAgdGhpcy5fbG9nKGByZWNlaXZlZCB3aG8tYW0tSTogXCIke2RhdGEudmFsdWV9XCJgKTtcbiAgICAgICAgICB0aGlzLl9jbGllbnRJZCA9IGRhdGEudmFsdWU7XG4gICAgICAgICAgY29uc3QgbXlFbnRpdHkgPSB0aGlzLl9lbnRpdGllc01hbmFnZXIuZW5zdXJlRW50aXR5KHRoaXMuX2NsaWVudElkLCA0MDAsIDMwMCk7XG4gICAgICAgICAgdGhpcy5fd2ViU29ja2V0LnNlbmQoe1xuICAgICAgICAgICAgdHlwZTogJ21vdmUnLFxuICAgICAgICAgICAgdmFsdWU6IFtcbiAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgIGNsaWVudElkOiBteUVudGl0eS5jbGllbnRJZCxcbiAgICAgICAgICAgICAgICBwb3NYOiBteUVudGl0eS5wb3NYLFxuICAgICAgICAgICAgICAgIHBvc1k6IG15RW50aXR5LnBvc1ksXG4gICAgICAgICAgICAgICAgc3BlZWRYOiBteUVudGl0eS5zcGVlZFgsXG4gICAgICAgICAgICAgICAgc3BlZWRZOiBteUVudGl0eS5zcGVlZFksXG4gICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIF1cbiAgICAgICAgICB9KTtcbiAgICAgICAgICBicmVhaztcbiAgICAgICAgfVxuICAgICAgICBjYXNlICdtb3ZlJzoge1xuICAgICAgICAgIHRoaXMuX2xvZyhgcmVjZWl2ZWQgbW92ZTogXCIke2RhdGEudmFsdWV9XCJgKTtcbiAgICAgICAgICBkYXRhLnZhbHVlLmZvckVhY2goKHZhbDogYW55KSA9PiB7XG4gICAgICAgICAgICBjb25zdCB7Y2xpZW50SWQsIHBvc1gsIHBvc1ksIHNwZWVkWCwgc3BlZWRZfSA9IHZhbDtcbiAgICAgICAgICAgIGNvbnN0IGVudGl0eSA9IHRoaXMuX2VudGl0aWVzTWFuYWdlci5lbnN1cmVFbnRpdHkoY2xpZW50SWQsIHBvc1gsIHBvc1kpO1xuICAgICAgICAgICAgZW50aXR5LnNldFNwZWVkWChzcGVlZFgpO1xuICAgICAgICAgICAgZW50aXR5LnNldFNwZWVkWShzcGVlZFkpO1xuICAgICAgICAgIH0pO1xuICAgICAgICAgIGJyZWFrO1xuICAgICAgICB9XG4gICAgICAgIGNhc2UgJ3BpbmcnOiB7XG4gICAgICAgICAgdGhpcy5fbG9nKGByZWNlaXZlZCBwaW5nLCByZXBseWluZyBwb25nYCk7XG4gICAgICAgICAgdGhpcy5fd2ViU29ja2V0LnNlbmQoeyB0eXBlOiAncG9uZycgfSk7XG4gICAgICAgICAgYnJlYWs7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9KTtcblxuICAgIHRoaXMuX2xvZyhgY29ubmVjdGluZ2ApO1xuICAgIGF3YWl0IHRoaXMuX3dlYlNvY2tldC5jb25uZWN0KHdzQ29uZmlnLmhvc3QsIHdzQ29uZmlnLnBvcnQpO1xuICAgIHRoaXMuX2xvZyhgaXMgY29ubmVjdGVkYCk7XG5cbiAgICB0aGlzLl93ZWJTb2NrZXQuc2VuZCh7IHR5cGU6ICd3aG8tYW0tSScgfSk7XG5cbiAgICB0aGlzLl9rZXlib2FyZEhhbmRsZXIuYWN0aXZhdGUoKTtcblxuICAgIC8vIGRvY3VtZW50LmJvZHkuYWRkRXZlbnRMaXN0ZW5lcigna2V5ZG93bicsIChldmVudCkgPT4ge1xuICAgIC8vICAgaWYgKCF0aGlzLl93ZWJTb2NrZXQuaXNDb25uZWN0ZWQoKSkge1xuICAgIC8vICAgICByZXR1cm47XG4gICAgLy8gICB9XG5cbiAgICAvLyAgIGlmIChldmVudC5rZXkgPT09ICdnJykge1xuICAgIC8vICAgICB0aGlzLl9sb2coYHNlbmRpbmdgKTtcbiAgICAvLyAgICAgdGhpcy5fd2ViU29ja2V0LnNlbmQoe1xuICAgIC8vICAgICAgIHR5cGU6ICdtZXNzYWdlJyxcbiAgICAvLyAgICAgICB2YWx1ZTogJ0hFTExPISdcbiAgICAvLyAgICAgfSk7XG4gICAgLy8gICB9XG4gICAgLy8gfSk7XG4gIH1cblxuICBhc3luYyBkaXNwb3NlKCkge1xuICAgIHRoaXMuX3dlYlNvY2tldC5kaXNjb25uZWN0KCk7XG4gIH1cblxuICB1cGRhdGUoZWxhcHNlZFRpbWU6IG51bWJlcikge1xuXG4gICAgaWYgKFxuICAgICAgIXRoaXMuX2tleWJvYXJkSGFuZGxlci53YXNQcmVzc2VkKGFsbEtleXMuVkFMVUVfRykgJiZcbiAgICAgIHRoaXMuX2tleWJvYXJkSGFuZGxlci5pc1ByZXNzZWQoYWxsS2V5cy5WQUxVRV9HKVxuICAgICkge1xuICAgICAgLy8gc2VuZCBpdFxuICAgICAgdGhpcy5fd2ViU29ja2V0LnNlbmQoe1xuICAgICAgICB0eXBlOiAnbWVzc2FnZScsXG4gICAgICAgIHZhbHVlOiBcImhlbGxvIVwiXG4gICAgICB9KTtcbiAgICB9XG5cbiAgICBpZiAodGhpcy5fa2V5Ym9hcmRIYW5kbGVyLmlzUHJlc3NlZChhbGxLZXlzLlZBTFVFX0xFRlQpKSB7XG5cblxuICAgICAgY29uc3QgbXlFbnRpdHkgPSB0aGlzLl9lbnRpdGllc01hbmFnZXIuZmluZEVudGl0eSh0aGlzLl9jbGllbnRJZCk7XG4gICAgICBpZiAobXlFbnRpdHkpIHtcblxuICAgICAgICAvLyBzZXQgaXRcbiAgICAgICAgbXlFbnRpdHkuc2V0U3BlZWRYKC0yMCk7XG5cbiAgICAgICAgLy8gZGlkIHdlIGp1c3Qgc3RhcnRlZCBtb3Zpbmc/XG4gICAgICAgIGlmICghdGhpcy5fa2V5Ym9hcmRIYW5kbGVyLndhc1ByZXNzZWQoYWxsS2V5cy5WQUxVRV9MRUZUKSkge1xuXG4gICAgICAgICAgLy8gdGhpcy5fbG9nKGBzZW5kaW5nYCk7XG5cbiAgICAgICAgICAvLyBzZW5kIGl0XG4gICAgICAgICAgdGhpcy5fd2ViU29ja2V0LnNlbmQoe1xuICAgICAgICAgICAgdHlwZTogJ21vdmUnLFxuICAgICAgICAgICAgdmFsdWU6IFtcbiAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgY2xpZW50SWQ6IG15RW50aXR5LmNsaWVudElkLFxuICAgICAgICAgICAgICAgIHBvc1g6IG15RW50aXR5LnBvc1gsXG4gICAgICAgICAgICAgICAgcG9zWTogbXlFbnRpdHkucG9zWSxcbiAgICAgICAgICAgICAgICBzcGVlZFg6IG15RW50aXR5LnNwZWVkWCxcbiAgICAgICAgICAgICAgICBzcGVlZFk6IG15RW50aXR5LnNwZWVkWSxcbiAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgXVxuICAgICAgICAgIH0pO1xuXG4gICAgICAgIH1cblxuICAgICAgfVxuXG4gICAgfVxuXG4gICAgdGhpcy5fa2V5Ym9hcmRIYW5kbGVyLnVwZGF0ZSgpO1xuXG5cbiAgICBmb3IgKGNvbnN0IGN1cnJFbnRpdHkgb2YgdGhpcy5fZW50aXRpZXNNYW5hZ2VyLmVudGl0aWVzKSB7XG4gICAgICBjdXJyRW50aXR5LnVwZGF0ZShlbGFwc2VkVGltZSk7XG4gICAgfVxuICB9XG5cbiAgcmVuZGVyKCkge1xuICAgIHRoaXMuX2NhbnZhc1JlbmRlcmVyLmNsZWFyKCk7XG5cblxuICAgIGZvciAoY29uc3QgY3VyckVudGl0eSBvZiB0aGlzLl9lbnRpdGllc01hbmFnZXIuZW50aXRpZXMpIHtcbiAgICAgIHRoaXMuX2NhbnZhc1JlbmRlcmVyLmRyYXdTcXVhcmUoY3VyckVudGl0eS5wb3NYLCBjdXJyRW50aXR5LnBvc1ksIDEwLCAnI2ZmMDAwMCcpO1xuICAgIH1cblxuICAgIHRoaXMuX2NhbnZhc1JlbmRlcmVyLmRyYXdMaW5lTG9vcChcbiAgICAgIFtcbiAgICAgICAgWzEwLCAxMF0sXG4gICAgICAgIFsxMDAsIDIwXSxcbiAgICAgICAgWzIwLCAxMDBdXG4gICAgICBdLFxuICAgICAgJ3JlZCdcbiAgICApO1xuICB9XG5cbiAgcHJpdmF0ZSBfbG9nKC4uLmFyZ3M6IGFueSkge1xuICAgIHRoaXMuX2xvZ2dlck91dHB1dC52YWx1ZSArPSBgJHtuZXcgRGF0ZSgpLnRvSVNPU3RyaW5nKCl9ICR7YXJncy5qb2luKFxuICAgICAgJyAnXG4gICAgKX1cXG5gO1xuICAgIHRoaXMuX2xvZ2dlck91dHB1dC5zY3JvbGxUb3AgPSB0aGlzLl9sb2dnZXJPdXRwdXQuc2Nyb2xsSGVpZ2h0O1xuICB9XG59XG4iLAogICJpbXBvcnQgeyBXZWJBcHBsaWNhdGlvbiB9IGZyb20gJy4vd2ViLWFwcGxpY2F0aW9uL1dlYkFwcGxpY2F0aW9uJztcblxubGV0IGdfaGFzRXJyb3JlZCA9IGZhbHNlO1xuXG5jb25zdCBfcXVlcnlEb21FbGVtZW50ID0gPFQgZXh0ZW5kcyBIVE1MRWxlbWVudD4oc2VsZWN0OiBzdHJpbmcpOiBUID0+IHtcbiAgY29uc3QgZG9tRWxlbWVudCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3I8VD4oc2VsZWN0KTtcbiAgaWYgKCFkb21FbGVtZW50KSB7XG4gICAgdGhyb3cgbmV3IEVycm9yKGBkb21lIGVsZW1lbnQgbm90IGZvdW5kIFwiJHtzZWxlY3R9XCJgKTtcbiAgfVxuICByZXR1cm4gZG9tRWxlbWVudDtcbn07XG5cbmNvbnN0IG9uUGFnZUxvYWQgPSBhc3luYyAoKSA9PiB7XG4gIC8vXG4gIC8vXG4gIC8vIElOSVRJQUxJWkUgTE9HR0VSXG5cbiAgY29uc3QgbG9nZ2VyT3V0cHV0ID0gX3F1ZXJ5RG9tRWxlbWVudDxIVE1MVGV4dEFyZWFFbGVtZW50PignI2xvZ2dlci1vdXRwdXQnKTtcbiAgY29uc3QgbWFpbkNhbnZhcyA9IF9xdWVyeURvbUVsZW1lbnQ8SFRNTENhbnZhc0VsZW1lbnQ+KCcjbWFpbi1jYW52YXMnKTtcblxuICBjb25zdCBfbG9nID0gKC4uLmFyZ3M6IGFueSkgPT4ge1xuICAgIGxvZ2dlck91dHB1dC52YWx1ZSArPSBgJHtuZXcgRGF0ZSgpLnRvSVNPU3RyaW5nKCl9ICR7YXJncy5qb2luKCcgJyl9XFxuYDtcbiAgICBsb2dnZXJPdXRwdXQuc2Nyb2xsVG9wID0gbG9nZ2VyT3V0cHV0LnNjcm9sbEhlaWdodDtcbiAgfTtcblxuICBsb2dnZXJPdXRwdXQudmFsdWUgPSAnJzsgLy8gcmVzZXQgYnJvd3NlciBjYWNoZVxuXG4gIGlmICghd2luZG93LldlYlNvY2tldCkge1xuICAgIGdfaGFzRXJyb3JlZCA9IHRydWU7XG4gICAgX2xvZyhcIlNvcnJ5LCBidXQgeW91ciBicm93c2VyIGRvZXNuJ3Qgc3VwcG9ydCBXZWJTb2NrZXRzLlwiKTtcbiAgICByZXR1cm47XG4gIH1cblxuICAvL1xuICAvL1xuICAvLyBJTklUSUFMSVpFIEFQUExJQ0FUSU9OXG5cbiAgY29uc3QgYXBwID0gbmV3IFdlYkFwcGxpY2F0aW9uKG1haW5DYW52YXMsIGxvZ2dlck91dHB1dCk7XG5cbiAgdHJ5IHtcbiAgICBhd2FpdCBhcHAuaW5pdGlhbGl6ZSgpO1xuICAgIF9sb2coJ2RvbmUnKVxuICB9IGNhdGNoIChlcnI6IGFueSkge1xuICAgIF9sb2coYGVycm9yIHdoaWxlIGluaXRpYWxpemluZywgbXNnOiBcIiR7ZXJyPy5tZXNzYWdlfVwiYCk7XG4gIH1cblxuICBfbG9nKCdyZW5kZXInKVxuXG4gIC8vIG1haW4gbG9vcFxuICBjb25zdCB0aWNrID0gKCkgPT4ge1xuICAgIHdpbmRvdy5zZXRUaW1lb3V0KHRpY2ssIDEwMDAvNjApOyAvLyA2MGZwc1xuXG4gICAgY29uc3QgZWxhcHNlZFRpbWUgPSAxLzYwOyAvLyBUT0RPXG5cbiAgICBhcHAudXBkYXRlKGVsYXBzZWRUaW1lKTtcbiAgICBhcHAucmVuZGVyKCk7XG4gIH07XG4gIHRpY2soKTtcblxufTtcblxud2luZG93LmFkZEV2ZW50TGlzdGVuZXIoJ2xvYWQnLCBvblBhZ2VMb2FkKTtcbiIKICBdLAogICJtYXBwaW5ncyI6ICI7QUFHTyxNQUFNLGdCQUFlO0FBQUEsRUFJaEIsY0FBdUMsQ0FBQztBQUFBLEVBQ3hDLGFBQXNDLENBQUM7QUFBQSxFQUV2QyxhQUFhO0FBQUEsRUFDYjtBQUFBLEVBQ0E7QUFBQSxFQUNSLFdBQVcsR0FBRztBQUVWLFVBQU0sZ0JBQWdCLENBQUMsVUFBeUI7QUFBRSxXQUFLLFdBQVcsTUFBTSxPQUFPO0FBQUE7QUFDL0UsVUFBTSxjQUFjLENBQUMsVUFBeUI7QUFBRSxXQUFLLFdBQVcsTUFBTSxPQUFPO0FBQUE7QUFFN0UsU0FBSyxpQkFBaUIsY0FBYyxLQUFLLElBQUk7QUFDN0MsU0FBSyxlQUFlLFlBQVksS0FBSyxJQUFJO0FBQUE7QUFBQSxFQUs3QyxNQUFNLEdBQUc7QUFDTCxTQUFLLGNBQWMsS0FBSztBQUN4QixTQUFLLGFBQWEsQ0FBQztBQUFBO0FBQUEsRUFHdkIsVUFBVSxDQUFDLEtBQWM7QUFDckIsV0FBTyxLQUFLLFlBQVk7QUFBQTtBQUFBLEVBRTVCLFNBQVMsQ0FBQyxLQUFj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dkQsV0FBSyxnQkFBZ0IsV0FBVyxXQUFXLE1BQU0sV0FBVyxNQUFNLElBQUksU0FBUztBQUFBLElBQ2pGO0FBRUEsU0FBSyxnQkFBZ0IsYUFDbkI7QUFBQSxNQUNFLENBQUMsSUFBSSxFQUFFO0FBQUEsTUFDUCxDQUFDLEtBQUssRUFBRTtBQUFBLE1BQ1IsQ0FBQyxJQUFJLEdBQUc7QUFBQSxJQUNWLEdBQ0EsS0FDRjtBQUFBO0FBQUEsRUFHTSxJQUFJLElBQUksTUFBVztBQUN6QixTQUFLLGNBQWMsU0FBUyxHQUFHLElBQUksS0FBSyxFQUFFLFlBQVksS0FBSyxLQUFLLEtBQzlELEdBQ0Y7QUFDQSxTQUFLLGNBQWMsWUFBWSxLQUFLLGNBQWM7QUFBQTtBQUV0RDs7O0FDdE1BLElBQUksZUFBZTtBQUVuQixJQUFNLG1CQUFtQixDQUF3QixXQUFzQjtBQUNyRSxRQUFNLGFBQWEsU0FBUyxjQUFpQixNQUFNO0FBQ25ELE9BQUssWUFBWTtBQUNmLFVBQU0sSUFBSSxNQUFNLDJCQUEyQixTQUFTO0FBQUEsRUFDdEQ7QUFDQSxTQUFPO0FBQUE7QUFHVCxJQUFNLGFBQWEsWUFBWTtBQUs3QixRQUFNLGVBQWUsaUJBQXNDLGdCQUFnQjtBQUMzRSxRQUFNLGFBQWEsaUJBQW9DLGNBQWM7QUFFckUsUUFBTSxPQUFPLElBQUksU0FBYztBQUM3QixpQkFBYSxTQUFTLEdBQUcsSUFBSSxLQUFLLEVBQUUsWUFBWSxLQUFLLEtBQUssS0FBSyxHQUFHO0FBQ2xFLGlCQUFhLFlBQVksYUFBYTtBQUFBO0FBR3hDLGVBQWEsUUFBUTtBQUVyQixPQUFLLE9BQU8sV0FBVztBQUNyQixtQkFBZTtBQUNmLFNBQUsscURBQXFEO0FBQzFEO0FBQUEsRUFDRjtBQU1BLFFBQU0sTUFBTSxJQUFJLGVBQWUsWUFBWSxZQUFZO0FBRXZELE1BQUk7QUFDRixVQUFNLElBQUksV0FBVztBQUNyQixTQUFLLE1BQU07QUFBQSxXQUNKLEtBQVA7QUFDQSxTQUFLLG1DQUFtQyxLQUFLLFVBQVU7QUFBQTtBQUd6RCxPQUFLLFFBQVE7QUFHYixRQUFNLE9BQU8sTUFBTTtBQUNqQixXQUFPLFdBQVcsTUFBTSxrQkFBTztBQUUvQixVQUFNLGNBQWM7QUFFcEIsUUFBSSxPQUFPLFdBQVc7QUFDdEIsUUFBSSxPQUFPO0FBQUE7QUFFYixPQUFLO0FBQUE7QUFJUCxPQUFPLGlCQUFpQixRQUFRLFVBQVU7IiwKICAiZGVidWdJZCI6ICJGMkQ4MzQzMjM0MUY2REU2NjQ3NTZlMjE2NDc1NmUyMSIsCiAgIm5hbWVzIjogW10KfQ==
