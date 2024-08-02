require("dotenv").config();
const express = require("express");
const cors = require("cors");
const { ConnectMongoDb } = require("./connection/conn");
const postrouter = require("./router/postRouter");
const userRouter = require("./router/userRouter");
const cookieParser = require("cookie-parser");
const app = express();

// Ensure the database URL is correctly loaded from the environment variables
const dbUrl = process.env.DATABASE_URL;
ConnectMongoDb(dbUrl)
  .then(() => {
    console.log("Database Connected");
  })
  .catch((err) => {
    console.error("Database connection error:", err);
  });

const corsOptions = {
  origin: "http://localhost:3000", // Replace with your frontend URL
  credentials: true, // Allow cookies and credentials
};

app.use(cors(corsOptions));
app.use(express.json());
app.use(cookieParser());

app.use("/", postrouter);
app.use("/user", userRouter);

const PORT = process.env.PORT || 3001;

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
