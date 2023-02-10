import path from "node:path";
import http from "node:http";
import express from "express";
import mongoose from "mongoose";
import { router } from "./router";
import { Server } from "socket.io";

const url = "mongodb://localhost:27017";
const app = express();
const server = http.createServer(app);
export const io = new Server(server);

mongoose
  .connect(url)
  .then(() => {
    const port = 3001;

    //io.on("connect", () => console.log("Novo usuário conectado."));

    app.use((_req, res, next) => {
      res.setHeader("Access-Control-Allow-Origin", "*");
      res.setHeader("Access-Control-Allow-Methods", "*");
      res.setHeader("Access-Control-Allow-Headers", "*");
      next();
    });
    app.use(
      "/uploads",
      express.static(path.resolve(__dirname, "..", "uploads"))
    );
    app.use(express.json());
    app.use(router);

    server.listen(port, () => {
      console.log(`Server is running on http://localhost:${port}`);
    });
  })
  .catch((error) => {
    console.log("Erro ao Conectar no MongoDB");
    console.log(error);
  });
