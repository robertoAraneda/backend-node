import express from "express";
import jwt from "jsonwebtoken";

import config from "./config/configs.js";

const { Router } = express;
const router = Router();

router.use((req, res, next) => {
  const token = req.headers["access-token"];

  if (token) {
    jwt.verify(token, config.key, (err, decoded) => {
      if (err) {
        return res.json({ mensaje: "Token inválida" });
      } else {
        console.log("Time: ", Date.now());
        req.decoded = decoded;
        next();
      }
    });
  } else {
    res.send({
      mensaje: "Token no proveída.",
    });
  }
});

// middleware that is specific to this router
/* router.use(function timeLog(req, res, next) {
  console.log("Time: ", Date.now());
  next();
}); */
// define the home page route
router.get("/", function (req, res) {
  res.send("Birds home page");
});
// define the about route
router.get("/about", function (req, res) {
  res.send("About birds");
});

router.post("/auth", (req, res) => {
  if (req.body.user === "roberto" && req.body.password === "12345") {
    const payload = {
      check: true,
    };
    const token = jwt.sign(payload, config.key, {
      expiresIn: 1440,
    });
    res.json({
      mensaje: "Autenticación correcta",
      token: token,
    });
  } else {
    res.json({ mensaje: "Usuario o contraseña incorrectos" });
  }
});

export default router;
