const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");

const app = express();

const http = require("http").createServer(app);
require("./sockets")(http, app);

var corsOptions = {
  origin: "http://localhost:3000",
};

app.use(cors(corsOptions));

// parse requests of content-type - application/json
app.use(bodyParser.json());

// parse requests of content-type - application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));

// simple route
app.get("/", (req, res) => {
  res.json({ message: "Hola mundo" });
});

//enviar archivo html a la vista (ruta completa)
app.get("/chat", (req, res) => {
  res.sendFile("/Users/robertoaraneda/Projects/elabnote/backend-node/index.html");
});

// routes
require("./routes/auth.routes")(app);
require("./routes/user.routes")(app);

/* const io = new socket.Server(server);

app.use(function (req, res, next) {
  res.io = io;
  next();
}); */

const db = require("./models");
const Role = db.role;

db.sequelize.sync({ force: true }).then(() => {
  console.log("Drop and Resync Db");
  initial();
});

//b.sequelize.sync();

function initial() {
  Role.create({
    id: 1,
    name: "user",
  });

  Role.create({
    id: 2,
    name: "moderator",
  });

  Role.create({
    id: 3,
    name: "admin",
  });
}

module.exports = http;
