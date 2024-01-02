import express from "express";
import { PORT, DB_URL } from "./config.js";
import mongoose from "mongoose";
import bookRouter from "./routers/BookRouter.js";

const app = express();
app.use(express.json());

app.use(
  cors({
    origin: "http://localhost:3000",
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type"],
  })
);

app.get("/", (req, res) => {
  console.log(req);
  return res.status(234).send("Well come to mern stack tutorial");
});

app.use("/books", bookRouter);

const connectToDatabase = async () => {
  try {
    await mongoose.connect(DB_URL);
    console.log("Connected to database");
  } catch (err) {
    console.error("Error connecting to the database", err);
    throw err;
  }
};

const startServer = (app, port) => {
  app.listen(port, () => {
    console.log(`Server running on port ${port}`);
  });
};

// Usage
connectToDatabase().then(() => startServer(app, PORT));
