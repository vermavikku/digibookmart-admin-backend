const { Server } = require("socket.io");

class SocketService {
  constructor(server) {
    this.io = new Server(server, {
      cors: {
        origin: "http://localhost:5173", // Update with your React app's URL
        methods: ["GET", "POST"],
        allowedHeaders: ["my-custom-header"],
        credentials: true,
      },
    });
    this.initialize();
  }

  initialize() {
    this.io.on("connection", (socket) => {
      console.log("A user connected:", socket.id);

      socket.on("message", (msg) => {
        console.log("Message received:", msg);
        this.io.emit("message", msg); // Broadcast to all clients
      });

      socket.on("disconnect", () => {
        console.log("A user disconnected:", socket.id);
      });
    });
  }
}

module.exports = SocketService;
