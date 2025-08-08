import express from "express";
import dotenv from "dotenv";
import dbConnection from "./src/config/dbConnection.js";
import router from "./src/Routes/userRoute.js";
import route from "./src/Routes/taskRoute.js";
import cors from "cors";
dotenv.config();

const app = express();
const PORT = process.env.PORT;

app.use(
  cors({
    origin: "*",
  })
);

dbConnection();

app.use(express.json());

app.get("/", (req, res) => {
  res.send("Hello from the server! This is the backend of task project");
});

app.use("/user", router);

app.use("/task", route);

app.listen(PORT, () => {
  console.log(`Server is running at http://localhost:${process.env.PORT}`);
});
