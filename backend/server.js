import express from "express";
import cors from "cors";
import dotenv from "dotenv";

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

app.get("/cat", (req, res) => {
  async function fetchCats() {
    try {
      const response = await fetch(
        `https://api.thecatapi.com/v1/images/search?limit=10&breed_ids=beng&api_key=${process.env.KEY}`
      );

      if (response.ok) {
        const data = await response.json();

        res.status(200).json(data);
      } else {
        throw new Error("Could not fetch");
      }
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }
  fetchCats();
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
