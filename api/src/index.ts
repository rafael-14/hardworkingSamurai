import path from "node:path";
import express from "express";
import mongoose from "mongoose";
import { router } from "./router";

const url = "mongodb://localhost:27017";

mongoose
  .connect(url)
  .then(() => {
    const app = express();
    const port = 3001;

    app.use(
      "/uploads",
      express.static(path.resolve(__dirname, "..", "uploads"))
    );
    app.use(express.json());
    app.use(router);

    app.listen(port, () => {
      console.log(`Server is running on http://localhost:${port}`);
    });
  })
  .catch((error) => {
    console.log("Erro ao Conectar no MongoDB");
    console.log(error);
  });
