module.exports = (http, app) => {
  const io = require("socket.io")(http);

  app.use(function (req, res, next) {
    res.io = io;
    next();
  });

  io.on("connection", (socket) => {
    console.log("a user connected");

    socket.on("disconnect", () => {
      console.log("user disconnected");
    });

    socket.on("chat message", (msg) => {
      console.log("message: " + msg);
      io.emit("chat message", msg);
    });
  });
};
