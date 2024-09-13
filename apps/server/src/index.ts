import http from "http";
import dotenv from "dotenv";
import SocketService from "./services/socket.service.js";

dotenv.config();
async function init() {
  const socketService = new SocketService();
  const server = http.createServer();
  const PORT = process.env.PORT || 3002;

  socketService.io.attach(server);

  server.listen(PORT, () => {
    console.log(`server started at ${PORT}`);
  });
}

init();
