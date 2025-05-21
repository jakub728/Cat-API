import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import catRouter from "./routes/catRouter.js";

const app = express();

//* Middleware
app.use(cors());
app.use(express.json());

//* Hiding API KEY
dotenv.config();

//* Routes
app.get("/", (req, res) => {
  res.json("Simple Animal App");
});

app.use("/cat", catRouter);

app.get("/", (req, res) => {
  res.json("Simple Animal App");
});

//* Global Error Handler
app.use((err, req, res, next) => {
  console.error("Error:", err.message || err);
  res.status(err.status || 500).json({
    error: err.message || "Something went wrong on the server.",
  });
});

const port = process.env.PORT || 3003;

app.listen(port, () => {
  console.log(`server is listening @ ${port}`);
});
