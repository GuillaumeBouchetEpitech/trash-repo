import { IMessage } from "../../../common/messages";

enum ConnectionStatus {
  disconnected = 'disconnected',
  connected = 'connected',
  connecting = 'connecting'
}

interface IJsonMessagesWebSocket {
  connect(host: string, port: number): void;
  disconnect(): void;

  isConnected(): boolean;

  // onConnect(callback: () => void): void;
  onDisconnect(callback: (hasErrored: boolean) => void): void;
  onMessage(callback: (msg: IMessage) => void): void;

  send(message: IMessage): void;
}

export class JsonMessagesWebSocket implements IJsonMessagesWebSocket {
  private _connectionStatus: ConnectionStatus = ConnectionStatus.disconnected;
  private _webSocket!: WebSocket;

  // private _onConnect?: () => void;
  private _onDisconnect?: (hasErrored: boolean) => void;
  private _onMessage?: (msg: IMessage) => void;

  async connect(host: string, port: number) {
    if (this._connectionStatus !== ConnectionStatus.disconnected) {
      throw new Error(`can only connect when disconnected`);
    }

    this._connectionStatus = ConnectionStatus.connecting;

    await new Promise<void>((resolve, reject) => {

      this._webSocket = new WebSocket(`ws://${host}:${port}`);

      const onOpen = () => {
        console.log(`websocket: is open`);
        this._webSocket.removeEventListener('open', onOpen);
        this._webSocket.removeEventListener('error', onError);
        this._connectionStatus = ConnectionStatus.connected;
        resolve();
      };

      const onError = (err: any) => {
        console.log(`websocket: error ${err?.message}`);
        this._webSocket.removeEventListener('open', onOpen);
        this._webSocket.removeEventListener('error', onError);
        this._connectionStatus = ConnectionStatus.disconnected;
        reject();
      };

      this._webSocket.addEventListener('open', onOpen);
      this._webSocket.addEventListener('error', onError);
    });

    const onMessage = (message: MessageEvent<any>) => {
      const data = JSON.parse(message.data);
      if (this._onMessage) {
        this._onMessage(data);
      }
    };

    const onError = (err: any) => {
      console.log(`websocket: error ${err?.message}`);
      this._webSocket.removeEventListener('message', onMessage);
      this._webSocket.removeEventListener('close', onClose);
      this._webSocket.removeEventListener('error', onError);
      this._connectionStatus = ConnectionStatus.disconnected;
      if (this._onDisconnect) {
        this._onDisconnect(true);
      }
    };

    const onClose = () => {
      console.log(`websocket: close`);
      this._webSocket.removeEventListener('message', onMessage);
      this._webSocket.removeEventListener('close', onClose);
      this._webSocket.removeEventListener('error', onError);
      this._connectionStatus = ConnectionStatus.disconnected;
      if (this._onDisconnect) {
        this._onDisconnect(false);
      }
    };

    this._webSocket.addEventListener('message', onMessage);
    this._webSocket.addEventListener('close', onClose);
    this._webSocket.addEventListener('error', onError);
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

  // onConnect(callback: () => void) {
  //   this._onConnect = callback;
  // }
  onDisconnect(callback: (hasErrored: boolean) => void) {
    this._onDisconnect = callback;
  }
  onMessage(callback: (msg: IMessage) => void) {
    this._onMessage = callback;
  }

  send(message: IMessage) {
    this._webSocket.send(JSON.stringify(message));
  }
}
