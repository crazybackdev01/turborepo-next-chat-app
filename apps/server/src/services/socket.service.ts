import { Server } from "socket.io";
import { Redis } from "ioredis";

const pub = new Redis({
  host: "",
  username: "",
  password: "",
  // port: 3000,
});

const sub = new Redis({
  host: "",
  username: "",
  password: "",
  // port: 3000,
});

class SocketService {
  private _io: Server;

  constructor() {
    console.log("Socket Service started.......");
    this._io = new Server({
      cors: {
        allowedHeaders: ["*"],
        origin: "*",
      },
    });
    sub.subscribe("MESSAGES");
  }

  get io() {
    return this._io;
  }

  public initListeners() {
    console.log("Socket event listeners started");
    const io = this.io;
    io.on("connect", (socket) => {
      console.log("New socket connected: " + socket.id);
      socket.on("event:message", async ({ message }: { message: string }) => {
        console.log(`New Message from socket `, message);
        // Publish the message to the Redis server
        pub.publish("MESSAGES", JSON.stringify({ message }));
      });
    });
    sub.on("message", (channel, message) => {
      if (channel === "MESSAGES") {
        io.emit("message", message);
      }
    });
  }
}

export default SocketService;
