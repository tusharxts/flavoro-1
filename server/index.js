const express = require("express");
const app = express();
const port = 5000;
const cors = require("cors");
require("dotenv").config();
const { connectDb } = require("./connection");
const routes = require("./routes");
const cookieParser = require("cookie-parser");

connectDb();
app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);
app.use(cookieParser());
app.use(express.json());

app.use("/api", routes);

app.listen(port, () => console.log(`Listening on port ${port}`));
