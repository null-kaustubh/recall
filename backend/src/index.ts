import { config } from "dotenv";
import path from "path";
import { job } from "./cron";

config({ path: path.resolve(__dirname, "../.env") });

import express from "express";
import mongoose from "mongoose";
import authRouter from "./routes/auth";
import contentRouter from "./routes/content";
import shareRouter from "./routes/share";
import cors from "cors";

const app = express();
const port = 3000;

const corsOptions = {
  origin: true,
  credentials: true,
};

app.use(express.json());
app.use(cors(corsOptions));

app.get("/", (req, res) => {
  res.status(200).json({
    status: "ok",
    message: "Server is running",
    timestamp: new Date().toISOString(),
  });
});

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

job.start();
startServer();
