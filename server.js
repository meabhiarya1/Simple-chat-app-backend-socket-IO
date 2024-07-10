const app = require("express")();

const server = require("http").createServer(app);
const cors = require("cors");
const io = require("socket.io")(server, {
  cors: {
    origin: "*",
  },
});
app.use(cors());
app.get("/getconnection", (req, res, next) => {
  res.status(200).json({ message: "connection established" });
});

const socketPort = process.env.SOCKET_PORT || 5000;

io.on("connection", (socket) => {
  console.log("What is Socket: ", socket);
  console.log("Socket is active to be connected");
  socket.on("chat", (payload) => {
    console.log("What is payload", payload);
    io.emit("chat", payload);
  });
});

// app.listen(`${port}`, () => console.log("Server is active..."));

server.listen(`${socketPort}`, () => console.log("Server is running..."));
