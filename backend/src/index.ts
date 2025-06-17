import { config } from "dotenv";
import path from "path";

config({ path: path.resolve(__dirname, "../.env") });

import express from "express";
import mongoose from "mongoose";
import authRouter from "./routes/auth";
import contentRouter from "./routes/content";
import shareRouter from "./routes/recall";

const app = express();
const port = 3000;

app.use(express.json());

app.use("/api", authRouter);
app.use("/api", contentRouter);
app.use("/api/recall", shareRouter);

async function startServer() {
  try {
    const mongoUrl = process.env.MONGODB_CONNECTION_URL;

    if (!mongoUrl) {
      throw new Error("MongoDb env variable required");
    }

    console.log("connecting to MongoDb....");
    await mongoose.connect(mongoUrl);
    console.log("connected to MongoDb");

    app.listen(port, function () {
      console.log(`Server running on ${port}`);
    });
  } catch (e) {
    console.log(`Failed to start server: ${e}`);
    process.exit();
  }
}

startServer();
