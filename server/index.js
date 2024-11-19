import express from "express";
const app = express();
const port = 5000;
import cors from "cors";
// import dotenv from "dotenv"
import { connectDb } from "./connection.js";
import routes from "./routes.js";
import cookieParser from "cookie-parser";
import { config } from "dotenv";
config({ path: "./ser" });


// dotenv.config();

connectDb();
app.use(
  cors({
    origin: ["http://localhost:5173"],
    credentials: true,
  })
);
app.use(cookieParser());
app.use(express.json());

app.use("/api", routes);

app.listen(port, () => console.log(`Listening on port ${port}`));
