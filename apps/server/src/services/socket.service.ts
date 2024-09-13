import { Server } from "socket.io";

class SocketService {
  private _io: Server;

  constructor() {
    console.log("Socket Service started.......");
    this._io = new Server();
  }

  get io() {
    return this._io;
  }

  public initListeners() {
    const io = this.io();
  }
}

export default SocketService;
